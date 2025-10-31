'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          {/* Greeting */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-muted-foreground font-medium"
          >
            Hi, I'm Lih Sheng
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {siteConfig.author.name}
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            variants={fadeInUp}
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Full-stack developer specializing in{' '}
            <span className="text-foreground font-semibold">modern web technologies</span>.
            Building scalable applications with React, Next.js, and TypeScript.
          </motion.h2>

          {/* Bio */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {siteConfig.author.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 min-w-[160px] shadow-lg"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200 min-w-[160px]"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={fadeInUp}
            className="pt-12 hidden sm:block"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}