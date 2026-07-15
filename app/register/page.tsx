"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LightRays from "@/components/ui/LightRays";

/* ============================================================
   AWS BUILDERS CLUB — Membership Application
   Same theme as the main site: violet/purple accent, deep
   violet-black background, Fraunces + JetBrains Mono + Work Sans.
   Framed as a 5-stage deploy pipeline instead of a plain form.
============================================================ */

const COURSES = ["B.Tech", "B.Sc", "BCA", "MCA", "BBA", "MBA", "Other"];
const BRANCHES = ["CSE", "AI/ML", "Data Science", "Cyber Security", "Other"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const AWS_SERVICES = [
  // Compute
  "EC2",
  "Lambda",
  "Elastic Beanstalk",
  "Lightsail",
  "Batch",
  "App Runner",
  "ECS",
  "EKS",
  "Fargate",

  // Storage
  "S3",
  "EBS",
  "EFS",
  "FSx",
  "Storage Gateway",
  "Backup",

  // Databases
  "RDS",
  "Aurora",
  "DynamoDB",
  "ElastiCache",
  "Redshift",
  "DocumentDB",
  "Neptune",
  "Keyspaces",
  "Timestream",

  // Networking & CDN
  "VPC",
  "Route 53",
  "CloudFront",
  "Global Accelerator",
  "API Gateway",
  "Direct Connect",
  "Transit Gateway",
  "Elastic Load Balancer (ELB)",

  // Security & Identity
  "IAM",
  "Cognito",
  "KMS",
  "Secrets Manager",
  "Certificate Manager (ACM)",
  "WAF",
  "Shield",
  "GuardDuty",
  "Inspector",
  "Security Hub",
  "Macie",

  // Monitoring & Management
  "CloudWatch",
  "CloudTrail",
  "Systems Manager",
  "AWS Config",
  "Trusted Advisor",
  "Organizations",

  // Messaging & Integration
  "SQS",
  "SNS",
  "EventBridge",
  "MQ",
  "Step Functions",

  // Developer Tools
  "CodeCommit",
  "CodeBuild",
  "CodeDeploy",
  "CodePipeline",
  "CloudFormation",
  "CDK",

  // Analytics
  "Athena",
  "Glue",
  "EMR",
  "Kinesis",
  "QuickSight",
  "Lake Formation",
  "OpenSearch",

  // AI / ML
  "SageMaker",
  "Bedrock",
  "Rekognition",
  "Comprehend",
  "Textract",
  "Polly",
  "Transcribe",
  "Translate",
  "Lex",

  // Application Integration
  "Amplify",
  "AppSync",

  // IoT
  "IoT Core",

  // Migration & Transfer
  "DataSync",
  "Migration Hub",
  "Database Migration Service (DMS)",

  // Cost Management
  "Cost Explorer",
  "Budgets",

  // Other
  "SES",
  "Pinpoint"
];

const INTEREST_AREAS = [
  "AWS", "Web Dev", "AI/ML", "App Dev", "UI/UX",
  "DevOps", "Cyber Security", "Graphic Design", "Content", "Marketing",
];

const STAGES = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Academic Details" },
  { id: 3, label: "Technical Profile" },
  { id: 4, label: "Questions" },
  { id: 5, label: "Resume" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+91 \d{10}$/;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const initialForm = {
  fullName: "", universityEmail: "", personalEmail: "", phoneNumber: "", rollNumber: "",
  course: "", branch: "", branchOther: "", year: "",
  interestAreas: [] as string[], githubUrl: "", linkedinUrl: "", portfolioUrl: "",
  whyJoin: "", leadershipExperience: "",
  usedAws: "", awsServices: [] as string[],
};

export default function RegisterPage() {
  const [stage, setStage] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resume, setResume] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [awsSearch, setAwsSearch] = useState("");
  const [showAwsDropdown, setShowAwsDropdown] = useState(false);

  const update = (key: string, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) {
      setErrors((e) => {
        const newErrors = { ...e };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const toggleInterest = (area: string) => {
    setForm((f) => {
      const has = f.interestAreas.includes(area);
      return {
        ...f,
        interestAreas: has ? f.interestAreas.filter((a) => a !== area) : [...f.interestAreas, area],
      };
    });
    if (errors.interestAreas) {
      setErrors((e) => {
        const newErrors = { ...e };
        delete newErrors.interestAreas;
        return newErrors;
      });
    }
  };

  function validateStage(n: number) {
    const e: Record<string, string> = {};
    if (n === 1) {
      if (!form.fullName.trim()) e.fullName = "Required.";
      if (!EMAIL_RE.test(form.universityEmail)) e.universityEmail = "Enter a valid email.";
      if (!EMAIL_RE.test(form.personalEmail)) e.personalEmail = "Enter a valid email.";
      if (!PHONE_RE.test(form.phoneNumber)) e.phoneNumber = "Enter a valid phone number.";
    }
    if (n === 2) {
      if (!form.rollNumber.trim()) e.rollNumber = "Required.";
      if (!form.course) e.course = "Required.";
      if (form.course === "B.Tech" && !form.branch) e.branch = "Required.";
      if (form.course === "B.Tech" && form.branch === "Other" && !form.branchOther.trim()) e.branchOther = "Please specify your branch.";
      if (!form.year) e.year = "Required.";
    }
    if (n === 3) {
      if (form.interestAreas.length === 0) e.interestAreas = "Select at least one area.";
      if (form.githubUrl && !/^https?:\/\/.+/.test(form.githubUrl)) e.githubUrl = "Include https://";
      if (form.linkedinUrl && !/^https?:\/\/.+/.test(form.linkedinUrl)) e.linkedinUrl = "Include https://";
      if (form.portfolioUrl && !/^https?:\/\/.+/.test(form.portfolioUrl)) e.portfolioUrl = "Include https://";
    }
    if (n === 4) {
      if (!form.whyJoin.trim() || form.whyJoin.trim().length < 20) e.whyJoin = "A couple of sentences, please.";
      if (!form.usedAws) e.usedAws = "Required.";
      if (form.usedAws === "Yes" && form.awsServices.length === 0) e.awsServices = "Select at least one service.";
    }
    if (n === 5) {
      if (!resume) e.resume = "A resume PDF is required.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // Sync stage with URL hash for browser back/forward history support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#step-(\d)$/);
      const targetStage = match ? parseInt(match[1], 10) : 1;

      if (targetStage >= 1 && targetStage <= STAGES.length) {
        setStage(targetStage);
      } else {
        setStage(1);
      }
    };

    // On initial mount, if they loaded with a hash, reset it to start clean at step 1
    if (window.location.hash && window.location.hash !== "#step-1") {
      window.location.hash = "";
    }

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const goNext = () => {
    if (validateStage(stage)) {
      const next = Math.min(stage + 1, STAGES.length);
      window.location.hash = `step-${next}`;
    }
  };
  const goBack = () => {
    const prev = Math.max(stage - 1, 1);
    if (prev === 1) {
      window.location.hash = "";
    } else {
      window.location.hash = `step-${prev}`;
    }
  };

  function handleFile(file: File | undefined | null) {
    if (!file) return;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setErrors((e) => ({ ...e, resume: "Only PDF files are accepted." }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((e) => ({ ...e, resume: "File must be under 5MB." }));
      return;
    }
    setErrors((e) => {
      const newErrors = { ...e };
      delete newErrors.resume;
      return newErrors;
    });
    setResume(file);
  }

  async function handleSubmit() {
    if (!validateStage(5)) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const fd = new FormData();
      fd.append("fullName", form.fullName.trim());
      fd.append("universityEmail", form.universityEmail.trim());
      fd.append("personalEmail", form.personalEmail.trim());
      fd.append("phoneNumber", form.phoneNumber.trim());
      fd.append("rollNumber", form.rollNumber.trim());
      fd.append("course", form.course);
      fd.append("branch", form.branch === "Other" ? form.branchOther.trim() : form.branch);
      fd.append("year", form.year);
      fd.append("interestAreas", JSON.stringify(form.interestAreas));
      fd.append("githubUrl", form.githubUrl.trim());
      fd.append("linkedinUrl", form.linkedinUrl.trim());
      fd.append("portfolioUrl", form.portfolioUrl.trim());
      fd.append("whyJoin", form.whyJoin.trim());
      fd.append("leadershipExperience", form.leadershipExperience.trim());
      fd.append("usedAws", form.usedAws);
      if (form.usedAws === "Yes") {
        fd.append("awsServices", JSON.stringify(form.awsServices));
      }
      if (resume) {
        fd.append("resume", resume);
      }

      const res = await fetch(`/api/register`, { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }
      setResult(data);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) return <SuccessScreen result={result} />;

  return (
    <div className="relative min-h-screen bg-grid bg-noise bg-bg w-full overflow-x-hidden text-[#efecf5] font-sans">
      {/* Ambient Purple Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] opacity-60" />
      <div className="pointer-events-none absolute -left-[20%] top-[30%] h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px] opacity-50" />
      <div className="pointer-events-none absolute -right-[20%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] opacity-50" />
 
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: "hidden", opacity: 0.35 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#A855F7"
          raysSpeed={0.8}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.1}
          distortion={0.05}
          saturation={1.4}
        />
      </div>
      <ThemeStyles />
 
      <main className="w-full max-w-[820px] mx-auto px-6 sm:px-8 md:px-12 pt-[100px] md:pt-[140px] pb-[60px] md:pb-[100px] relative z-10 box-border">
        <div className="intro mb-8 md:mb-12">
          <div className="eyebrow">Application · 2026 Cohort</div>
          <h1>Deploy your<br /><em>application.</em></h1>
          <p className="sub">Five stages, about 6 minutes. We'll reach out to shortlisted applicants for an interview.</p>
        </div>

        <Stepper stage={stage} />

        <div className="form-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {stage === 1 && (
            <Stage title="Personal Information" note="stage 01 / 05">
              <Field label="Full Name" error={errors.fullName} required>
                <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your shubh name" />
              </Field>
              <Row>
                <Field label="University Email" error={errors.universityEmail} required>
                  <input type="email" value={form.universityEmail} onChange={(e) => update("universityEmail", e.target.value)} placeholder="you@tulas.edu.in" />
                </Field>
                <Field label="Personal Email" error={errors.personalEmail} required>
                  <input type="email" value={form.personalEmail} onChange={(e) => update("personalEmail", e.target.value)} placeholder="you@gmail.com" />
                </Field>
              </Row>
              <Row>
                <Field label="Phone Number" error={errors.phoneNumber} required>
                  <input type="tel" value={form.phoneNumber} onChange={(e) => {
                    let raw = e.target.value;
                    if (raw.startsWith('+91 ')) raw = raw.substring(4);
                    else if (raw.startsWith('+91')) raw = raw.substring(3);
                    let digits = raw.replace(/\D/g, '').substring(0, 10);
                    update("phoneNumber", digits.length > 0 ? "+91 " + digits : "");
                  }} placeholder="+91 XXXXXXXXXX" />
                </Field>
                <div />
              </Row>
            </Stage>
          )}

          {stage === 2 && (
            <Stage title="Academic Details" note="stage 02 / 05">
              <Row>
                <Field label="Course" error={errors.course} required>
                  <CustomSelect
                    value={form.course}
                    onChange={(val) => {
                      update("course", val);
                      if (val !== "B.Tech") {
                        update("branch", "");
                        update("branchOther", "");
                      }
                    }}
                    options={COURSES}
                    placeholder="Select course"
                  />
                </Field>
                {form.course === "B.Tech" && (
                  <Field label="Branch" error={errors.branch} required>
                    <CustomSelect
                      value={form.branch}
                      onChange={(val) => {
                        update("branch", val);
                        if (val !== "Other") {
                          update("branchOther", "");
                        }
                      }}
                      options={BRANCHES}
                      placeholder="Select branch"
                    />
                  </Field>
                )}
              </Row>
              {form.course === "B.Tech" && form.branch === "Other" && (
                <Row>
                  <Field label="Specify Branch" error={errors.branchOther} required>
                    <input value={form.branchOther} onChange={(e) => update("branchOther", e.target.value)} placeholder="e.g. Biotechnology" />
                  </Field>
                  <div />
                </Row>
              )}
              <Row>
                <Field label="Roll Number" error={errors.rollNumber} required>
                  <input value={form.rollNumber} onChange={(e) => update("rollNumber", e.target.value.replace(/\D/g, ''))} placeholder="2201234567" />
                </Field>
                <Field label="Year" error={errors.year} required>
                  <CustomSelect
                    value={form.year}
                    onChange={(val) => update("year", val)}
                    options={YEARS}
                    placeholder="Select year"
                  />
                </Field>
              </Row>
            </Stage>
          )}

          {stage === 3 && (
            <Stage title="Technical Profile" note="stage 03 / 05">
              <Field label="Areas of Interest" error={errors.interestAreas} hint="Select all that apply" required>
                <div className="checkbox-grid">
                  {INTEREST_AREAS.map((area) => (
                    <label key={area} className={`chip ${form.interestAreas.includes(area) ? "chip-active" : ""}`}>
                      <input
                        type="checkbox"
                        checked={form.interestAreas.includes(area)}
                        onChange={() => toggleInterest(area)}
                      />
                      <span className="chip-dot" />
                      {area}
                    </label>
                  ))}
                </div>
              </Field>
              <Row>
                <Field label="GitHub" error={errors.githubUrl}>
                  <input value={form.githubUrl} onChange={(e) => update("githubUrl", e.target.value)} placeholder="https://github.com/username" />
                </Field>
                <Field label="LinkedIn" error={errors.linkedinUrl}>
                  <input value={form.linkedinUrl} onChange={(e) => update("linkedinUrl", e.target.value)} placeholder="https://linkedin.com/in/username" />
                </Field>
              </Row>
              <Field label="Portfolio" hint="Optional" error={errors.portfolioUrl}>
                <input value={form.portfolioUrl} onChange={(e) => update("portfolioUrl", e.target.value)} placeholder="https://yourportfolio.com" />
              </Field>
            </Stage>
          )}

          {stage === 4 && (
            <Stage title="Application Questions" note="stage 04 / 05">
              <Field label="Why do you want to join(in brief)?" error={errors.whyJoin} required>
                <textarea rows={4} value={form.whyJoin} onChange={(e) => update("whyJoin", e.target.value)} placeholder="Tell us what draws you to the club..." />
              </Field>

              <Field label="Have you used any AWS services before?" error={errors.usedAws} required>
                <CustomSelect
                  value={form.usedAws}
                  onChange={(val) => update("usedAws", val)}
                  options={["Yes", "No"]}
                  placeholder="Select option"
                />
              </Field>

              {form.usedAws === "Yes" && (
                <Field label="Which AWS services have you used?" error={errors.awsServices} required>
                  <div style={{ position: "relative" }}>
                    {form.awsServices.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                        {form.awsServices.map((svc) => (
                          <div key={svc} style={{ background: "var(--accent)", color: "#000", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                            {svc}
                            <button type="button" onClick={() => update("awsServices", form.awsServices.filter(s => s !== svc))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>×</button>
                          </div>
                        ))}
                      </div>
                    )}
                    <input 
                      value={awsSearch} 
                      onChange={(e) => { setAwsSearch(e.target.value); setShowAwsDropdown(true); }}
                      onFocus={() => setShowAwsDropdown(true)}
                      onBlur={() => setTimeout(() => setShowAwsDropdown(false), 200)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const matches = AWS_SERVICES.filter(s => 
                            s.toLowerCase().includes(awsSearch.toLowerCase()) && 
                            !form.awsServices.includes(s)
                          );
                          if (matches.length > 0) {
                            const firstMatch = matches[0];
                            update("awsServices", [...form.awsServices, firstMatch]);
                            setAwsSearch("");
                            setShowAwsDropdown(false);
                          }
                        }
                      }}
                      placeholder="Search AWS services..." 
                    />
                    {showAwsDropdown && awsSearch && (
                      <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "var(--surface)", border: "1px solid var(--line)", zIndex: 10, maxHeight: "150px", overflowY: "auto" }}>
                        {AWS_SERVICES.filter(s => s.toLowerCase().includes(awsSearch.toLowerCase()) && !form.awsServices.includes(s)).map(svc => (
                          <div 
                            key={svc} 
                            onMouseDown={() => { update("awsServices", [...form.awsServices, svc]); setAwsSearch(""); setShowAwsDropdown(false); }}
                            style={{ padding: "8px 12px", cursor: "pointer", borderBottom: "1px solid var(--line)" }}
                          >
                            {svc}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Field>
              )}

              <Field label="Previous leadership experience?" hint="Optional">
                <textarea rows={3} value={form.leadershipExperience} onChange={(e) => update("leadershipExperience", e.target.value)} placeholder="Clubs, teams, projects you've led" />
              </Field>
            </Stage>
          )}

          {stage === 5 && (
            <Stage title="Resume Upload" note="stage 05 / 05">
              <Field label="Resume" error={errors.resume} hint="PDF only · Max 5MB" required>
                <div
                  className={`dropzone ${dragActive ? "dropzone-active" : ""} ${resume ? "dropzone-filled" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    handleFile(e.dataTransfer.files?.[0]);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />
                  {resume ? (
                    <>
                      <span className="mono dz-file">{resume.name}</span>
                      <span className="mono dz-size">{(resume.size / 1024 / 1024).toFixed(2)} MB</span>
                      <button type="button" className="dz-remove" onClick={(e) => { e.stopPropagation(); setResume(null); }}>
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="dz-title">Drop your resume here, or click to browse</span>
                      <span className="mono dz-hint">application/pdf · max 5MB</span>
                    </>
                  )}
                </div>
              </Field>
            </Stage>
          )}
            </motion.div>
          </AnimatePresence>

          {submitError && <div className="submit-error mono">✕ {submitError}</div>}

          <div className="stage-actions">
            {stage > 1 ? (
              <button className="btn-secondary" onClick={goBack} disabled={submitting}>← Back</button>
            ) : <span />}
            {stage < STAGES.length ? (
              <button className="btn-primary" onClick={goNext}>Continue →</button>
            ) : (
              <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Deploying…" : "Deploy Application →"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- Subcomponents ---------------- */

function Stepper({ stage }: { stage: number }) {
  return (
    <div className="stepper mono">
      {STAGES.map((s, i) => (
        <React.Fragment key={s.id}>
          <div className={`step ${stage === s.id ? "step-active" : ""} ${stage > s.id ? "step-done" : ""}`}>
            <span className="step-num">{stage > s.id ? "✓" : String(s.id).padStart(2, "0")}</span>
            <span className="step-label">{s.label}</span>
          </div>
          {i < STAGES.length - 1 && <div className={`step-line ${stage > s.id ? "step-line-done" : ""}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function Stage({ title, note, children }: { title: string, note: string, children: React.ReactNode }) {
  return (
    <div>
      <div className="stage-head">
        <h2>{title}</h2>
        <span className="mono stage-note">{note}</span>
      </div>
      <div className="stage-body">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="field-row">{children}</div>;
}

function Field({ label, hint, error, required, children }: { label: string, hint?: string, error?: string, required?: boolean, children: React.ReactNode }) {
  return (
    <div className="field">
      <label className="field-label">
        {label} {required && <span style={{ color: "var(--danger)", marginLeft: "2px" }}>*</span>} {hint && <span className="field-hint">— {hint}</span>}
      </label>
      {children}
      {error && <span className="field-error mono">{error}</span>}
    </div>
  );
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="custom-select-container">
      <button
        type="button"
        className="custom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? "text-muted" : ""}>{value || placeholder}</span>
        <span className={`arrow ${isOpen ? "arrow-up" : ""}`}></span>
      </button>
      {isOpen && (
        <div className="custom-select-options">
          {options.map((opt) => (
            <div
              key={opt}
              className={`custom-select-option ${value === opt ? "selected" : ""}`}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SuccessScreen({ result }: { result: any }) {
  const shortId = result.id ? result.id.slice(0, 8) : "unknown";
  return (
    <div className="relative min-h-screen bg-grid bg-noise bg-bg w-full overflow-x-hidden text-[#efecf5] font-sans flex items-center">
      {/* Ambient Purple Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] opacity-60" />
      <div className="pointer-events-none absolute -left-[20%] top-[30%] h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px] opacity-50" />
      <div className="pointer-events-none absolute -right-[20%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] opacity-50" />

      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: "hidden", opacity: 0.35 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#A855F7"
          raysSpeed={0.8}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.1}
          distortion={0.05}
          saturation={1.4}
        />
      </div>
      <ThemeStyles />
      <div className="w-full max-w-[820px] mx-auto px-6 sm:px-8 md:px-12 pt-[100px] md:pt-[140px] pb-[60px] md:pb-[100px] relative z-10 box-border">
        <div className="eyebrow">Deployment Successful</div>
        <h1 className="success-title">Application <em>received.</em></h1>
        <div className="receipt mono">
          <div className="receipt-row"><span>status</span><span className="ok">201 deployed</span></div>
          <div className="receipt-row"><span>receipt_id</span><span>{shortId}</span></div>
          <div className="receipt-row"><span>submitted_at</span><span>{new Date(result.submittedAt).toLocaleString()}</span></div>
        </div>
        <p className="success-sub">We'll review applications after the deadline and reach out by email to shortlisted candidates for an interview.</p>
        <a href="/" className="btn-primary">Back to homepage →</a>
      </div>
    </div>
  );
}

/* ---------------- Theme (matches main site tokens) ---------------- */

function ThemeStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500;600&family=Work+Sans:wght@400;500;600;700&display=swap');

      :root{
        --bg:#0e0b13;
        --bg-raised:#15111c;
        --surface:#1a1524;
        --line:#2b2438;
        --line-bright:#423a54;
        --paper:#efecf5;
        --ink:#a79cbd;
        --muted:#6b6280;
        --accent:#8b5cf6;
        --amber:#c084fc;
        --danger:#f87171;
        --success:#4ade80;
      }
      *{box-sizing:border-box;}
      .mono{font-family:'JetBrains Mono',monospace;}
      a{color:inherit;text-decoration:none;}
      button{font-family:inherit;cursor:pointer;}
 
      /* INTRO */
      .eyebrow{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);display:inline-flex;align-items:center;gap:8px;margin-bottom:24px;}
      .eyebrow::before{content:'';width:16px;height:1px;background:var(--accent);}
      .intro h1{font-family:'Fraunces',serif;font-weight:600;font-size:clamp(30px,5vw,52px);line-height:1.02;margin:0 0 24px;}
      .intro h1 em{font-style:italic;color:var(--accent);font-weight:500;}
      .intro .sub{color:var(--ink);font-size:14px;max-width:480px;}
      @media(min-width:768px){ .intro .sub{font-size:15.5px;} }

      /* STEPPER */
      .stepper{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;}
      @media(min-width:768px){ .stepper{justify-content:flex-start;margin-bottom:40px;} }
      .step{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted);flex-shrink:0;}
      .step-num{width:28px;height:28px;border:1px solid var(--line-bright);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;}
      .step-active .step-num{border-color:var(--accent);color:var(--accent);background:rgba(139,92,246,0.1);}
      .step-active .step-label{color:var(--paper);}
      .step-done .step-num{background:var(--accent);border-color:var(--accent);color:#0e0b13;}
      .step-done{color:var(--ink);}
      .step-label{display:none;}
      .step-line{flex:1;height:1px;background:var(--line);margin:0 4px;min-width:12px;}
      .step-line-done{background:var(--accent);}
      @media(min-width:700px){ .step-label{display:inline;} .step-line{min-width:24px;margin:0 8px;} }

      /* FORM CARD */
      .form-card{border:1px solid rgba(255, 255, 255, 0.08);background:rgba(26, 21, 36, 0.6);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);padding:32px 28px;border-radius:12px;box-shadow:0 24px 48px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);}
      @media(min-width:768px){ .form-card{padding:48px 40px;} }
      .stage-head{display:flex;flex-direction:column;gap:4px;margin-bottom:28px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.08);}
      @media(min-width:768px){ .stage-head{flex-direction:row;justify-content:space-between;align-items:baseline;margin-bottom:28px;padding-bottom:18px;} }
      .stage-head h2{font-family:'Fraunces',serif;font-weight:600;font-size:18px;margin:0;}
      @media(min-width:768px){ .stage-head h2{font-size:22px;} }
      .stage-note{font-size:11px;color:var(--muted);}
      .stage-body{display:flex;flex-direction:column;gap:22px;}

      .field-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
      @media(max-width:600px){.field-row{grid-template-columns:1fr; gap:16px;}}
      .field{display:flex;flex-direction:column;gap:8px;}
      .field-label{font-family:'JetBrains Mono',monospace;font-size:11.5px;color:var(--ink);text-transform:uppercase;letter-spacing:0.04em;}
      .field-hint{color:var(--muted);text-transform:none;letter-spacing:0;}
      .field-error{font-size:11.5px;color:var(--danger);}

      .form-card input[type="text"], .form-card input[type="email"], .form-card input[type="tel"], .form-card input:not([type]), .form-card select, .form-card textarea{
        background:rgba(14, 11, 19, 0.5);border:1px solid var(--line-bright);color:var(--paper);
        padding:12px 14px;font-family:'Work Sans',sans-serif;font-size:16px;width:100%;
        border-radius:6px;transition:all 0.2s ease;
      }
      @media(min-width:768px){ 
        .form-card input[type="text"], .form-card input[type="email"], .form-card input[type="tel"], .form-card input:not([type]), .form-card select, .form-card textarea{
          font-size:14px;
        } 
      }
      .form-card input:focus, .form-card select:focus, .form-card textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(139, 92, 246, 0.15);background:rgba(14, 11, 19, 0.8);}
      .form-card input::placeholder, .form-card textarea::placeholder{
        color:var(--muted);
        font-size:inherit;
        font-family:inherit;
      }
      .text-muted {
        color:var(--muted) !important;
      }
      .form-card input:-webkit-autofill,
      .form-card input:-webkit-autofill:hover, 
      .form-card input:-webkit-autofill:focus, 
      .form-card input:-webkit-autofill:active{
          -webkit-box-shadow: 0 0 0 30px var(--bg) inset !important;
          -webkit-text-fill-color: var(--paper) !important;
          transition: background-color 5000s ease-in-out 0s;
      }
      .form-card textarea{resize:vertical;}
      .form-card select{appearance:none;background-image:linear-gradient(45deg, transparent 50%, var(--ink) 50%), linear-gradient(135deg, var(--ink) 50%, transparent 50%);background-position:calc(100% - 18px) center, calc(100% - 13px) center;background-size:5px 5px, 5px 5px;background-repeat:no-repeat;}

      /* CUSTOM SELECT */
      .custom-select-container {
        position: relative;
        width: 100%;
      }
      .custom-select-trigger {
        background: rgba(14, 11, 19, 0.5);
        border: 1px solid var(--line-bright);
        color: var(--paper);
        padding: 12px 14px;
        font-family: 'Work Sans', sans-serif;
        font-size: 16px;
        width: 100%;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        transition: all 0.2s ease;
      }
      @media(min-width: 768px) {
        .custom-select-trigger {
          font-size: 14px;
        }
      }
      .custom-select-trigger:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
        background: rgba(14, 11, 19, 0.8);
      }
      .custom-select-trigger .arrow {
        border: solid var(--ink);
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3.5px;
        transform: rotate(45deg);
        transition: transform 0.2s ease;
        margin-right: 4px;
      }
      .custom-select-trigger .arrow.arrow-up {
        transform: rotate(-135deg);
      }
      .custom-select-options {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        background: var(--surface);
        border: 1px solid var(--line-bright);
        border-radius: 6px;
        z-index: 50;
        max-height: 220px;
        overflow-y: auto;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(8px);
      }
      .custom-select-option {
        padding: 11px 14px;
        font-size: 14px;
        color: var(--paper);
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .custom-select-option:hover {
        background: rgba(255, 255, 255, 0.08);
        color: var(--accent);
      }
      .custom-select-option.selected {
        background: rgba(139, 92, 246, 0.2);
        color: var(--accent);
        font-weight: 500;
      }

      /* CHECKBOX CHIPS */
      .checkbox-grid{display:flex;flex-wrap:wrap;gap:8px;}
      @media(min-width:768px){ .checkbox-grid{gap:10px;} }
      .chip{display:flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid var(--line-bright);font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--ink);cursor:pointer;transition:all 0.2s cubic-bezier(0.16, 1, 0.3, 1);border-radius:20px;background:rgba(255,255,255,0.02);user-select:none;position:relative;}
      @media(min-width:768px){ .chip{padding:9px 16px;font-size:12.5px;} }
      .chip input{position:absolute;opacity:0;width:0;height:0;}
      .chip:hover{border-color:var(--ink);background:rgba(255,255,255,0.05);color:var(--paper);}
      .chip-active{border-color:var(--accent);color:var(--paper);background:rgba(139,92,246,0.12);box-shadow:0 0 16px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.05);}
      .chip-dot {width:6px;height:6px;border-radius:50%;background:var(--muted);transition:all 0.25s ease;flex-shrink:0;}
      .chip-active .chip-dot {background:var(--accent);box-shadow:0 0 8px var(--accent);transform:scale(1.2);}

      /* DROPZONE */
      .dropzone{border:1.5px dashed var(--line-bright);padding:28px 16px;text-align:center;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:8px;border-radius:8px;}
      @media(min-width:768px){ .dropzone{padding:36px 20px;} }
      .dropzone-active{border-color:var(--accent);background:rgba(139,92,246,0.06);}
      .dropzone-filled{border-style:solid;border-color:var(--accent);}
      .dz-title{color:var(--ink);font-size:14px;}
      .dz-hint{color:var(--muted);font-size:11px;}
      .dz-file{color:var(--paper);font-size:13.5px;word-break:break-all;}
      .dz-size{color:var(--muted);font-size:11.5px;}
      .dz-remove{background:none;border:1px solid var(--line-bright);color:var(--ink);font-family:'JetBrains Mono',monospace;font-size:11px;padding:6px 12px;margin-top:6px;}
      .dz-remove:hover{border-color:var(--danger);color:var(--danger);}

      /* ACTIONS */
      .stage-actions{display:flex;flex-direction:column-reverse;gap:12px;margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);}
      @media(min-width:600px){ .stage-actions{flex-direction:row;justify-content:space-between;align-items:center;margin-top:32px;padding-top:24px;} }
      .btn-primary{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:13.5px;padding:14px 22px;background:var(--accent);color:#0e0b13;border:1px solid var(--accent);display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;border-radius:6px;box-shadow:0 0 20px rgba(139,92,246,0.3);width:100%;}
      @media(min-width:600px){ .btn-primary{width:auto;} }
      .btn-primary:hover{background:transparent;color:var(--accent);box-shadow:0 0 30px rgba(139,92,246,0.5);}
      .btn-primary:disabled{opacity:0.6;cursor:not-allowed;}
      .btn-secondary{display:none;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:13.5px;padding:14px 22px;background:transparent;border:1px solid var(--line-bright);color:var(--paper);transition:all .2s;border-radius:6px;width:100%;text-align:center;}
      @media(min-width:600px){ .btn-secondary{display:inline-block;width:auto;} }
      .btn-secondary:hover{border-color:var(--accent);color:var(--accent);}

      .submit-error{margin-top:20px;padding:12px 16px;border:1px solid var(--danger);color:var(--danger);font-size:12.5px;}

      /* SUCCESS */
      .success-title{font-family:'Fraunces',serif;font-weight:600;font-size:clamp(32px,5vw,50px);margin:0 0 24px;}
      @media(min-width:768px){ .success-title{margin:0 0 32px;} }
      .success-title em{font-style:italic;color:var(--accent);font-weight:500;}
      .receipt{border:1px solid var(--line);background:var(--surface);padding:16px 20px;margin-bottom:24px;max-width:420px;word-break:break-all;}
      @media(min-width:768px){ .receipt{padding:20px 24px;} }
      .receipt-row{display:flex;flex-direction:column;gap:4px;font-size:13px;padding:8px 0;border-bottom:1px solid var(--line);}
      @media(min-width:480px){ .receipt-row{flex-direction:row;justify-content:space-between;} }
      .receipt-row:last-child{border-bottom:none;}
      .receipt-row span:first-child{color:var(--muted);}
      .receipt-row .ok{color:var(--success);}
      .success-sub{color:var(--ink);font-size:15px;max-width:460px;margin-bottom:32px;line-height:1.6;}
    `}</style>
  );
}
