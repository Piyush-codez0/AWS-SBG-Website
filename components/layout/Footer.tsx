"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

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

const SOCIALS = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:awssbg@tulas.edu.in", label: "Email" },
];

export function Footer() {
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
            <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 backdrop-blur-sm">
              <h4 className="text-sm font-medium text-text-primary">Join our newsletter</h4>
              <p className="text-[13px] text-text-secondary">Get updates on upcoming workshops and hackathons.</p>
              <form className="mt-1 flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-muted focus:border-primary/50 focus:bg-black/40"
                  required
                />
                <Button size="sm" className="bg-white text-black hover:bg-white/90 shrink-0">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-10">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading} className={col.heading === "Connect" ? "hidden sm:block" : ""}>
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
