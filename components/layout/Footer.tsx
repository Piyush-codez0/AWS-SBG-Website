"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Mail, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

const FOOTER_LINKS = [
  {
    heading: "Community",
    links: [
      { label: "About", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Team", href: "/team" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Learning Hub", href: "/learning-hub" },
      { label: "AWS Skill Builder", href: "https://skillbuilder.aws" },
      { label: "AWS Educate", href: "https://aws.amazon.com/education/awseducate/" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Discord", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Email Us", href: "mailto:awssbg@tulas.edu.in" },
    ],
  },
];

const MeetupIcon = ({ size = 24, className = "", ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M21.16 11.23c-1.35-1.92-3.13-2.61-4.81-2.07-1 .31-1.74 1.07-2.18 1.96a4.29 4.29 0 0 0-4.04-1.96c-1.63.15-2.85 1.15-3.4 2.45-.19-.4-.44-.76-.78-1.07-1.12-1.07-2.6-1.11-3.6-.1-1.03 1.03-1.07 2.62.1 3.73.54.51 1.25.75 1.95.73-1.03 1.05-1 2.7.07 3.76 1.05 1.03 2.72 1.02 3.78-.05.57-.57.88-1.32.93-2.1.84.58 1.83.74 2.7.53 1.1-.28 2.05-1 2.62-1.94 1.16 1.54 3.03 1.95 4.67 1.06 1.7-.93 2.37-3.04 1.99-4.93z"/>
  </svg>
);

const SOCIALS = [
  { icon: MeetupIcon, href: "https://www.meetup.com/aws-sbg-at-tulas-institute/", label: "Meetup" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:awssbg@tulas.edu.in", label: "Email" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    setErrorMessage("");
    
    const result = await subscribeToNewsletter(email);
    
    if (result.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong.");
    }
  };

  return (
    <footer className="relative border-t border-white/[0.05] bg-bg overflow-hidden">
      {/* Decorative gradient blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 pb-12 pt-16 md:pt-20">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-12">
          {/* Brand & Newsletter */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight text-text-primary transition-opacity hover:opacity-80"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white/[0.05] p-1.5 ring-1 ring-white/10">
                  <Image 
                    src="/logos/SBG_logo.png" 
                    alt="AWS SBG Logo" 
                    fill 
                    className="object-contain p-1"
                  />
                </div>
                AWS Student Builder Group
              </Link>
              <p className="max-w-[320px] text-[15px] leading-relaxed text-text-secondary">
                A student-led community at Tula&apos;s Institute dedicated to building, 
                learning, and deploying real-world applications on AWS.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="relative overflow-hidden flex flex-col gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 backdrop-blur-sm mt-2 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-300 group/card">
              {/* Top accent glow line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              
              <h4 className="text-sm font-medium text-text-primary flex items-center gap-2">
                <Sparkles size={14} className="text-accent animate-pulse" />
                Join our newsletter
              </h4>
              <p className="text-[13px] text-text-secondary leading-relaxed max-w-[320px]">
                Get updates on upcoming workshops, cloud events, and hackathons straight to your inbox.
              </p>
              {status === "success" ? (
                <div className="mt-2 flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400 border border-green-500/20">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  Thanks for subscribing!
                </div>
              ) : (
                <form className="mt-2 relative flex flex-col max-w-[360px]" onSubmit={handleSubscribe}>
                  <div className="relative flex flex-col sm:flex-row sm:items-center">
                    <div className="relative w-full">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading"}
                        placeholder="Enter your email address" 
                        className="w-full rounded-2xl sm:rounded-full border border-white/10 bg-white/[0.02] py-3 pl-10 pr-4 sm:pr-[115px] text-sm text-text-primary outline-none transition-all placeholder:text-muted focus:border-primary/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-primary/50 disabled:opacity-50"
                        required
                      />
                    </div>
                    <Button 
                      size="sm" 
                      disabled={status === "loading"}
                      className="mt-3 sm:mt-0 sm:absolute sm:right-1 sm:top-1 sm:bottom-1 sm:h-auto rounded-2xl sm:rounded-full bg-gradient-to-r from-primary to-accent text-white hover:brightness-110 shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all duration-200 shrink-0 group px-5 py-3 sm:py-1.5 font-medium disabled:opacity-70 w-full sm:w-auto justify-center border-none"
                    >
                      {status === "loading" ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </Button>
                  </div>
                  {status === "error" && (
                    <p className="mt-2 text-xs text-red-400 pl-2">{errorMessage}</p>
                  )}
                </form>
              )}
            </div>
          </div>
 
          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-10">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading}>
                <h4 className="font-display text-[15px] font-semibold text-text-primary">
                  {col.heading}
                </h4>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {col.links.map((link) => {
                    const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto");
                    return (
                      <li key={link.label}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex w-fit items-center gap-1.5 text-[14px] text-text-secondary transition-colors hover:text-primary-light"
                          >
                            {link.label}
                            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="group flex w-fit items-center gap-1.5 text-[14px] text-text-secondary transition-colors hover:text-primary-light"
                          >
                            {link.label}
                            <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/[0.05] pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.03] text-text-secondary transition-all duration-200 hover:bg-primary/20 hover:text-primary-light"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
          
          <div className="flex flex-col items-center gap-1.5 sm:items-end">
            <p className="text-[13px] text-muted">
              © {new Date().getFullYear()} AWS SBG, Tula&apos;s University. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
