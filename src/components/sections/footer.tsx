"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { fadeInUp, fadeInLeft, staggerContainer, smoothReveal } from "@/lib/animations";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Programs", href: "#programs" },
        { name: "Curriculum", href: "#curriculum" },
        { name: "Success", href: "#success" },
      ],
    },
    {
      title: "Programs",
      links: [
        { name: "Java Full Stack", href: "#" },
        { name: "Data Analytics", href: "#" },
        { name: "Cloud Computing", href: "#" },
        { name: "Ethical Hacking", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/phoneticedu/",
      label: "Instagram",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/company/phoneticedu/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-secondary relative overflow-hidden pt-24 pb-12 text-white">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.02]"></div>
      <motion.div
        className="bg-primary/5 absolute top-0 left-1/4 h-[600px] w-[600px] -translate-y-1/2 rounded-full blur-[120px]"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="bg-primary/3 absolute right-1/4 bottom-0 h-[500px] w-[500px] translate-y-1/2 rounded-full blur-[100px]"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            className="flex flex-col justify-center"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="font-display mb-8 text-5xl leading-[0.95] font-extrabold tracking-tight md:text-7xl"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span className="inline-block" variants={smoothReveal}>
                Your career
              </motion.span>
              <br />
              <motion.span className="text-primary inline-block italic" variants={smoothReveal}>
                deserves
              </motion.span>
              <br />
              <motion.span className="inline-block" variants={smoothReveal}>
                motion.
              </motion.span>
            </motion.h2>
            <motion.p
              className="mb-10 max-w-md text-lg leading-relaxed text-slate-400 md:text-xl"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Join thousands of students who transformed their careers with PHONETIC&apos;s
              revolutionary approach to education.
            </motion.p>

            <motion.a
              href="https://www.phoneticedu.com/"
              className="group bg-primary hover:shadow-primary/40 inline-flex w-fit items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 hover:shadow-2xl"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Journey
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {footerLinks.map((section) => (
              <motion.div key={section.title} variants={fadeInUp}>
                <h3 className="mb-6 text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={
                          link.name === "About" ||
                          link.name === "Programs" ||
                          link.name === "Curriculum" ||
                          link.name === "Success"
                            ? link.href
                            : "https://www.phoneticedu.com/"
                        }
                        className="hover:text-primary text-[15px] font-medium text-slate-300 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mb-12 h-px w-full bg-white/5"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
        />

        <motion.div
          className="flex flex-col items-center justify-between gap-8 md:flex-row"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="flex flex-col items-center gap-4 md:items-start"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden">
                <div className="relative h-full w-full">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/2897df09-0070-4f38-8117-82d9d8b58194/WhatsApp-Image-2026-01-15-at-17.25.12-1768478648732.jpeg?width=128&height=128&resize=contain"
                    alt="PHONETIC Logo"
                    fill
                    sizes="40px"
                    className="object-contain invert grayscale brightness-200 mix-blend-screen"
                  />
                </div>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                PHONETIC
              </span>
            </div>
            <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
              © {currentYear} ACADEMY EDU TECHNOLOGY. ALL RIGHTS RESERVED.
            </p>
          </motion.div>

          <motion.div className="flex items-center gap-4" variants={fadeInUp}>
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="hover:text-primary hover:border-primary/50 hover:bg-primary/5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
