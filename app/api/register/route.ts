import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+91 \d{10}$/;

const VALID_INTEREST_AREAS = [
  "AWS", "Web Dev", "AI/ML", "App Dev", "UI/UX",
  "DevOps", "Cyber Security", "Graphic Design", "Content", "Marketing",
];

function validatePayload(body: Record<string, string>) {
  const errors: Record<string, string> = {};

  // Section 1
  if (!body.fullName?.trim()) errors.fullName = "Full name is required.";
  if (!body.universityEmail?.trim() || !EMAIL_RE.test(body.universityEmail)) {
    errors.universityEmail = "A valid university email is required.";
  }
  if (!body.personalEmail?.trim() || !EMAIL_RE.test(body.personalEmail)) {
    errors.personalEmail = "A valid personal email is required.";
  }
  if (!body.phoneNumber?.trim() || !PHONE_RE.test(body.phoneNumber)) {
    errors.phoneNumber = "A valid phone number is required.";
  }
  // Section 2
  if (!body.rollNumber?.trim()) errors.rollNumber = "Roll number is required.";
  if (!body.course?.trim()) errors.course = "Course is required.";
  if (body.course === "B.Tech" && !body.branch?.trim()) errors.branch = "Branch is required.";
  if (!body.year?.trim()) errors.year = "Year is required.";

  // Section 3
  let interestAreas: string[] = [];
  try {
    interestAreas = JSON.parse(body.interestAreas || "[]");
  } catch {
    errors.interestAreas = "Interest areas were malformed.";
  }
  if (!Array.isArray(interestAreas) || interestAreas.length === 0) {
    errors.interestAreas = "Select at least one area of interest.";
  } else if (!interestAreas.every((a) => VALID_INTEREST_AREAS.includes(a))) {
    errors.interestAreas = "Interest areas contain an invalid value.";
  }

  // Section 4
  if (!body.whyJoin?.trim() || body.whyJoin.trim().length < 20) {
    errors.whyJoin = "Please write at least a couple of sentences.";
  }

  if (!body.usedAws) {
    errors.usedAws = "Required.";
  }

  let awsServices: string[] = [];
  if (body.usedAws === "Yes") {
    try {
      awsServices = JSON.parse(body.awsServices || "[]");
    } catch {
      errors.awsServices = "Services were malformed.";
    }
    if (!Array.isArray(awsServices) || awsServices.length === 0) {
      errors.awsServices = "Select at least one AWS service.";
    }
  }

  return { errors, interestAreas, awsServices };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract file
    const file = formData.get("resume") as File | null;
    
    // Extract body fields
    const body: Record<string, string> = {};
    for (const [key, value] of Array.from(formData.entries())) {
      if (typeof value === "string") {
        body[key] = value;
      }
    }

    if (!file) {
      return NextResponse.json({ error: "Validation failed.", fieldErrors: { resume: "A resume PDF is required." } }, { status: 400 });
    }

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      return NextResponse.json({ error: "Resume must be a PDF file." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Resume must be under 5MB." }, { status: 400 });
    }

    const { errors, interestAreas, awsServices } = validatePayload(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed.", fieldErrors: errors }, { status: 400 });
    }

    const {
      fullName, universityEmail, personalEmail, phoneNumber, rollNumber,
      course, branch, year,
      githubUrl, linkedinUrl, portfolioUrl,
      whyJoin, leadershipExperience,
      usedAws,
    } = body;

    // Upload resume to private Supabase Storage bucket if provided
    let storagePath = null;
    let originalFilename = null;

    if (file) {
      // Ensure private "resumes" bucket exists before upload
      try {
        const { data: buckets } = await supabaseAdmin.storage.listBuckets();
        const bucketExists = buckets?.some((b) => b.name === "resumes");
        if (!bucketExists) {
          const { error: createBucketError } = await supabaseAdmin.storage.createBucket("resumes", {
            public: false,
            fileSizeLimit: MAX_FILE_SIZE,
            allowedMimeTypes: ["application/pdf"],
          });
          if (createBucketError) {
            console.error("Failed to programmatically create resumes bucket:", createBucketError);
          }
        }
      } catch (err) {
        console.error("Error checking resumes bucket status:", err);
      }

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      storagePath = `${Date.now()}-${rollNumber.trim()}-${safeName}`;
      originalFilename = file.name;
      
      const fileBuffer = await file.arrayBuffer();

      const { error: uploadError } = await supabaseAdmin.storage
        .from("resumes")
        .upload(storagePath, fileBuffer, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (uploadError) {
        console.error("Resume upload failed:", uploadError);
        return NextResponse.json({ error: "Failed to upload resume. Please try again." }, { status: 500 });
      }
    }

    // Insert application row
    const { data, error: insertError } = await supabaseAdmin
      .from("sbg_applications")
      .insert({
        full_name: fullName.trim(),
        university_email: universityEmail.trim().toLowerCase(),
        personal_email: personalEmail.trim().toLowerCase(),
        phone_number: phoneNumber.trim(),
        roll_number: rollNumber.trim(),
        course: course.trim(),
        branch: course.trim() === "B.Tech" ? (branch?.trim() || null) : null,
        year: year.trim(),
        interest_areas: interestAreas,
        github_url: githubUrl?.trim() || null,
        linkedin_url: linkedinUrl?.trim() || null,
        portfolio_url: portfolioUrl?.trim() || null,
        why_join: whyJoin.trim(),
        leadership_experience: leadershipExperience?.trim() || null,
        used_aws: usedAws === "Yes",
        aws_services: usedAws === "Yes" ? awsServices : [],
        resume_path: storagePath,
        resume_filename: originalFilename,
      })
      .select("id, created_at")
      .single();

    if (insertError) {
      console.error("Insert failed:", insertError);
      // Best-effort cleanup of the uploaded file if the DB write failed
      if (storagePath) {
        await supabaseAdmin.storage.from("resumes").remove([storagePath]);
      }
      return NextResponse.json({ error: `DB Error: ${insertError.message || JSON.stringify(insertError)}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      submittedAt: data.created_at,
    }, { status: 201 });
    
  } catch (e) {
    console.error("Unexpected error in /api/register:", e);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
