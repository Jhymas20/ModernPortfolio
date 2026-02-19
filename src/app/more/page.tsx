'use client';

import { DesktopPageNav } from '@/components/desktop-page-nav';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FunPage() {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isIOSMobile, setIsIOSMobile] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  // Parallax effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Track mouse position for hero section
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isAppleMobileUa = /iPad|iPhone|iPod/i.test(userAgent);
    const isIpadDesktopMode =
      window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;
    const isIOS = isAppleMobileUa || isIpadDesktopMode;
    const mobileViewport = window.innerWidth < 768;
    setIsIOSMobile(isIOS && mobileViewport);
    setIsMobileViewport(mobileViewport);

    if (isIOS) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('more-hide-scrollbar');
    document.body.classList.add('more-hide-scrollbar');
    return () => {
      document.documentElement.classList.remove('more-hide-scrollbar');
      document.body.classList.remove('more-hide-scrollbar');
    };
  }, []);

  const heroSectionClass = `relative ${isIOSMobile ? 'h-[50vh] min-h-[360px]' : 'h-[46vh]'} sm:h-screen flex items-center justify-center overflow-hidden`;
  const aboutSectionClass = isIOSMobile
    ? 'relative min-h-[46vh] sm:min-h-screen flex items-start sm:items-center justify-center px-4 pt-16 pb-2 sm:py-20 bg-gradient-to-b from-white to-neutral-100 dark:from-black dark:to-neutral-900 overflow-hidden'
    : 'relative min-h-[54vh] sm:min-h-screen flex items-start sm:items-center justify-center px-4 py-2 sm:py-20 bg-gradient-to-b from-white to-neutral-100 dark:from-black dark:to-neutral-900 overflow-hidden';

  return (
    <div className="relative bg-white dark:bg-black overflow-x-hidden">
      <DesktopPageNav activePath="/more" />

      {/* Hero Section - Fixed Height */}
      <motion.section
        style={isIOSMobile ? undefined : { opacity: heroOpacity, scale: heroScale }}
        className={heroSectionClass}
      >
        {/* Mouse-Following Dot Pattern - Very Back - Light Mode */}
        <div
          className="absolute inset-x-0 bottom-0 top-5 pointer-events-none z-0 dark:hidden sm:inset-0"
          style={{
            backgroundImage: isMobileViewport
              ? 'radial-gradient(circle, rgb(255, 255, 255) 2.5px, transparent 2.5px)'
              : 'radial-gradient(circle, rgb(255, 116, 16) 2.5px, transparent 2.5px)',
            backgroundSize: '35px 35px',
            opacity: 0.78,
            maskImage: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          }}
        />
        {/* Mouse-Following Dot Pattern - Very Back - Dark Mode */}
        <div
          className="absolute inset-x-0 bottom-0 top-5 pointer-events-none z-0 hidden dark:block sm:inset-0"
          style={{
            backgroundImage: isMobileViewport
              ? 'radial-gradient(circle, rgb(255, 255, 255) 2.5px, transparent 2.5px)'
              : 'radial-gradient(circle, rgba(255, 132, 32, 0.98) 2.5px, transparent 2.5px)',
            backgroundSize: '35px 35px',
            opacity: 0.82,
            maskImage: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          }}
        />

        {/* Background Text */}
        <div
          className={`absolute inset-0 flex flex-col justify-center px-2 ${isIOSMobile ? 'pt-[10rem]' : 'pt-[7.5rem]'} sm:px-4 sm:pt-0 md:px-6 lg:px-8 select-none pointer-events-none overflow-hidden z-10`}
        >
          <h1 className="w-full text-[14vw] sm:text-[15vw] md:text-[13vw] lg:text-[12vw] xl:text-[11vw] 2xl:text-[10vw] font-black leading-[0.75] sm:leading-[0.78] md:leading-[0.8] tracking-[-0.08em] text-neutral-900 dark:text-white uppercase">
            FULL STACK
          </h1>
          <h1 className="w-full text-[14vw] sm:text-[15vw] md:text-[13vw] lg:text-[12vw] xl:text-[11vw] 2xl:text-[10vw] font-black leading-[0.75] sm:leading-[0.78] md:leading-[0.8] tracking-[-0.08em] text-neutral-900 dark:text-white uppercase">
            DEVELOPER
          </h1>
          <h1 className="w-full text-[14vw] sm:text-[15vw] md:text-[13vw] lg:text-[12vw] xl:text-[11vw] 2xl:text-[10vw] font-black leading-[0.75] sm:leading-[0.78] md:leading-[0.8] tracking-[-0.08em] text-neutral-900 dark:text-white uppercase">
            & CREATIVE
          </h1>
          <h1 className="w-full text-[14vw] sm:text-[15vw] md:text-[13vw] lg:text-[12vw] xl:text-[11vw] 2xl:text-[10vw] font-black leading-[0.75] sm:leading-[0.78] md:leading-[0.8] tracking-[-0.08em] text-neutral-900 dark:text-white uppercase">
            ENGINEER
          </h1>
        </div>

        {/* Descriptive Text - Right Side */}
        <div className="absolute right-4 top-[112px] text-right select-none pointer-events-none z-20 sm:top-[40%] sm:right-8 lg:right-12 xl:right-16">
          <p className="text-neutral-700 dark:text-white text-[11px] leading-[1.15] sm:text-sm md:text-base lg:text-lg xl:text-xl font-light tracking-wide">
            / WEB DEVELOPMENT
          </p>
          <p className="text-neutral-700 dark:text-white text-[11px] leading-[1.15] sm:text-sm md:text-base lg:text-lg xl:text-xl font-light tracking-wide">
            / UI/UX DESIGN
          </p>
          <p className="text-neutral-700 dark:text-white text-[11px] leading-[1.15] sm:text-sm md:text-base lg:text-lg xl:text-xl font-light tracking-wide">
            / FULL STACK
          </p>
        </div>

        {/* Person Image */}
        <div
          className={`absolute inset-0 flex items-center justify-center md:hidden ${isIOSMobile ? 'pt-[9rem]' : 'pt-[6.5rem]'} sm:pt-0 pointer-events-none z-15`}
        >
          <div
            className={`relative w-[42vw] sm:w-[65vw] md:w-[55vw] lg:w-[45vw] xl:w-[40vw] 2xl:w-[35vw] ${isIOSMobile ? 'h-[26vh]' : 'h-[30vh]'} sm:h-[60vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh]`}
          >
            <Image
              src="/sidewaysBlackWhite.webp"
              alt="Profile"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Top Left - Name/Brand */}
        <div className="absolute left-4 top-[78px] select-none pointer-events-none z-30 sm:top-[12%] md:left-8 lg:left-12 xl:left-16">
          <p className="text-[#e35400] dark:text-[#ff5a00]/90 text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-widest uppercase">
            Jordan Hymas &copy;
          </p>
        </div>

        {/* Top Right - Theme Switch Text */}
        <div className="absolute right-4 top-[78px] select-none pointer-events-none z-30 sm:top-[12%] md:right-8 lg:right-12 xl:right-16">
          <p className="text-neutral-700 dark:text-white text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-widest uppercase">
            Switch Light/Dark Theme
          </p>
        </div>
      </motion.section>

      {/* About Section */}
      <section className={aboutSectionClass}>
        {/* Dot Pattern Background */}
        <div className="absolute inset-0 opacity-40 dark:opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgb(0, 0, 0) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 0%, transparent 100%)',
          }} />
        </div>
        <div className="absolute inset-0 opacity-0 dark:opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgb(255, 255, 255) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 0%, transparent 100%)',
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-6xl md:text-8xl lg:text-9xl font-black text-neutral-900 dark:text-white mb-8"
              style={{ WebkitTextStroke: '1.5px #e35400' }}
            >
              WHO AM I?
            </h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl text-neutral-700 dark:text-neutral-300 font-light leading-relaxed"
            >
              I&apos;m an IT engineer and developer who builds real systems, not just apps. My background spans cybersecurity, networking, Linux administration, frontend/mobile development, and AI automation.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-3xl lg:text-4xl text-neutral-700 dark:text-neutral-300 font-light leading-relaxed mt-6"
            >
              I work hands-on with servers, infrastructure, and multi-site networks while also designing modern web and mobile experiences. I enjoy blending software, hardware, and automation to solve real-world problems.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl lg:text-4xl text-neutral-700 dark:text-neutral-300 font-light leading-relaxed mt-6"
            >
              When I&apos;m not coding or managing systems, I&apos;m usually experimenting in my homelab, building AI tools, or refining my custom interfaces.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        {/* Diagonal Line Pattern */}
        <div className="absolute inset-0 opacity-30 dark:opacity-0">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 2px, transparent 2px, transparent 40px)',
            maskImage: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, black 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, black 70%)',
          }} />
        </div>
        <div className="absolute inset-0 opacity-0 dark:opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgb(255, 255, 255) 0px, rgb(255, 255, 255) 2px, transparent 2px, transparent 40px)',
            maskImage: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, black 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, black 70%)',
          }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-6xl md:text-8xl font-black text-neutral-900 dark:text-white mb-16 text-center"
            style={{ WebkitTextStroke: '1.5px #e35400' }}
          >
            WHAT I DO
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'FULL-STACK + SYSTEMS ENGINEER', desc: 'I build complete systems, from frontend interfaces to backend logic to real infrastructure. Web apps, mobile apps, servers, networks, and automation pipelines.' },
              { title: 'CYBERSECURITY & NETWORKING', desc: 'Hands-on experience securing networks, managing firewalls, deploying UniFi environments, and supporting multi-site infrastructures. I focus on practical security, reliability, and performance.' },
              { title: 'LINUX & SERVER ADMINISTRATION', desc: 'Daily driver of Linux environments. VPS hosting, Nginx, SSH hardening, monitoring, backups, and deployment workflows. Comfortable managing servers both locally and in the cloud.' },
              { title: 'MOBILE APP + FRONTEND DEVELOPMENT', desc: 'Designing and building responsive web and mobile apps with React, Next.js, React Native, and modern UI frameworks. I care about clean UX, smooth interactions, and functional design.' },
              { title: 'AI AUTOMATION & LOCAL AI SYSTEMS', desc: 'Building AI-powered tools and automation pipelines using Python, APIs, and locally hosted models. I integrate voice, agents, and workflows to solve real-world problems, not just demos.' },
              { title: 'INFRASTRUCTURE PROBLEM SOLVER', desc: 'From troubleshooting networks and hardware to debugging code and deployments, I enjoy tackling complex technical challenges end-to-end and turning chaos into working systems.' },
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="group relative h-full"
              >
                {/* Outer glow - light shining out */}
                <div
                  className="pointer-events-none absolute inset-0 -m-[4px] rounded-3xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-25"
                  style={{
                    background: `linear-gradient(
                      90deg,
                      #6366f1,
                      #a855f7,
                      #ec4899,
                      #f97316,
                      #eab308,
                      #22c55e,
                      #06b6d4,
                      #6366f1
                    )`,
                    backgroundSize: '400% 100%',
                    animation: 'liquid-border 6s linear infinite',
                  }}
                />

                {/* Mid glow layer */}
                <div
                  className="pointer-events-none absolute inset-0 -m-[2px] rounded-3xl opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-40"
                  style={{
                    background: `linear-gradient(
                      90deg,
                      #6366f1,
                      #a855f7,
                      #ec4899,
                      #f97316,
                      #eab308,
                      #22c55e,
                      #06b6d4,
                      #6366f1
                    )`,
                    backgroundSize: '400% 100%',
                    animation: 'liquid-border 6s linear infinite',
                  }}
                />

                {/* Sharp border line */}
                <div
                  className="pointer-events-none absolute inset-0 -m-[1px] rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-70"
                  style={{
                    padding: '1px',
                    background: `linear-gradient(
                      90deg,
                      #6366f1,
                      #a855f7,
                      #ec4899,
                      #f97316,
                      #eab308,
                      #22c55e,
                      #06b6d4,
                      #6366f1
                    )`,
                    backgroundSize: '400% 100%',
                    animation: 'liquid-border 6s linear infinite',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col rounded-3xl bg-white dark:bg-neutral-800 p-8 shadow-xl">
                  <h3 className="text-3xl font-black text-neutral-900 dark:text-white mb-4">
                    {skill.title}
                  </h3>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes liquid-border {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </section>

      {/* Fun Facts */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-900 dark:to-black overflow-hidden">
        {/* Horizontal Lines */}
        <div className="absolute inset-0 opacity-30 dark:opacity-0">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 1px, transparent 1px, transparent 80px)',
          }} />
        </div>
        <div className="absolute inset-0 opacity-0 dark:opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgb(255, 255, 255) 0px, rgb(255, 255, 255) 1px, transparent 1px, transparent 80px)',
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-neutral-900 dark:text-white mb-16"
            style={{ WebkitTextStroke: '1.5px #e35400' }}
          >
            BEHIND THE CODE
          </motion.h2>

          <div className="space-y-12">
            {[
              { number: '01', fact: "I've built everything from production networks and Linux servers to web apps, mobile apps, and AI automation systems." },
              { number: '02', fact: 'Most of my projects start in a terminal before they ever reach a browser.' },
              { number: '03', fact: 'I enjoy connecting software, hardware, and infrastructure into complete working systems.' },
              { number: '04', fact: "If something breaks, I don't panic, I trace packets, read logs, and fix it." },
              { number: '05', fact: "Clean architecture matters to me, whether it's UI layouts or network diagrams." },
              { number: '06', fact: 'Late-night homelab sessions are where my best ideas usually come together.' },
            ].map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex items-start gap-8 group bg-gradient-to-r from-neutral-100 via-neutral-100 to-transparent dark:from-neutral-900 dark:via-neutral-900 dark:to-transparent py-4 -my-4"
              >
                <span className="text-6xl md:text-8xl font-black text-[#e35400] dark:text-[#ff5a00]/90 group-hover:text-[#ff5a00] transition-colors flex-shrink-0">
                  {item.number}
                </span>
                <p className="text-xl md:text-3xl text-neutral-700 dark:text-neutral-300 font-light pt-2">
                  {item.fact}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-56 bg-white dark:bg-black overflow-hidden">
        {/* Crossed Lines */}
        <div className="absolute inset-0 opacity-20 dark:opacity-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 1px, transparent 1px, transparent 100px),
              repeating-linear-gradient(-45deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 1px, transparent 1px, transparent 100px)
            `,
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, black 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, black 70%)',
          }} />
        </div>
        <div className="absolute inset-0 opacity-0 dark:opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgb(255, 255, 255) 0px, rgb(255, 255, 255) 1px, transparent 1px, transparent 100px),
              repeating-linear-gradient(-45deg, rgb(255, 255, 255) 0px, rgb(255, 255, 255) 1px, transparent 1px, transparent 100px)
            `,
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, black 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, black 70%)',
          }} />
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2
              className="text-7xl md:text-9xl lg:text-[12rem] font-black text-neutral-900 dark:text-white mb-8 leading-none"
              style={{ WebkitTextStroke: '1.5px #e35400' }}
            >
              LET&apos;S
              <br />
              WORK
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-3xl md:text-5xl text-neutral-600 dark:text-neutral-400 font-light mb-12"
            >
              TOGETHER
            </motion.p>

            {/* Creative Contact Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex justify-center"
            >
              <a
                href="/contact"
                className="group relative inline-block"
              >
                {/* Outer glow - light shining out */}
                <div
                  className="pointer-events-none absolute inset-0 -m-[6px] rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{
                    background: `linear-gradient(
                      90deg,
                      #6366f1,
                      #a855f7,
                      #ec4899,
                      #f97316,
                      #eab308,
                      #22c55e,
                      #06b6d4,
                      #6366f1
                    )`,
                    backgroundSize: '400% 100%',
                    animation: 'liquid-border 6s linear infinite',
                  }}
                />

                {/* Mid glow layer */}
                <div
                  className="pointer-events-none absolute inset-0 -m-[3px] rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60"
                  style={{
                    background: `linear-gradient(
                      90deg,
                      #6366f1,
                      #a855f7,
                      #ec4899,
                      #f97316,
                      #eab308,
                      #22c55e,
                      #06b6d4,
                      #6366f1
                    )`,
                    backgroundSize: '400% 100%',
                    animation: 'liquid-border 6s linear infinite',
                  }}
                />

                {/* Sharp border line */}
                <div
                  className="pointer-events-none absolute inset-0 -m-[2px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    padding: '2px',
                    background: `linear-gradient(
                      90deg,
                      #6366f1,
                      #a855f7,
                      #ec4899,
                      #f97316,
                      #eab308,
                      #22c55e,
                      #06b6d4,
                      #6366f1
                    )`,
                    backgroundSize: '400% 100%',
                    animation: 'liquid-border 6s linear infinite',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                  }}
                />

                {/* Button Content */}
                <div className="relative z-10 px-12 py-6 md:px-16 md:py-8 rounded-full bg-neutral-900 dark:bg-white transition-all duration-300 group-hover:scale-105 group-active:scale-95">
                  <span className="text-2xl md:text-4xl font-black text-white dark:text-neutral-900 tracking-tight uppercase">
                    Get In Touch
                  </span>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <style jsx>{`
          @keyframes liquid-border {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
