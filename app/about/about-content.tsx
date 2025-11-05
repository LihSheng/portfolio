'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SkillBadge from '@/components/SkillBadge';
import Timeline from '@/components/Timeline';
import { ProfilePicture } from '@/components/ProfilePicture';
import { siteConfig } from '@/lib/site-config';
import type { SkillCategory, ExperienceData, TimelineItem } from '@/types';

// Import data
import skillsData from '@/content/data/skills.json';
import experienceData from '@/content/data/experience.json';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const skills = skillsData as SkillCategory;
  const experience = experienceData as ExperienceData;

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Transform work experience to timeline items
  const workTimelineItems: TimelineItem[] = experience.work.map(work => ({
    date: work.current ? `${work.startDate} - Present` : `${work.startDate} - ${work.endDate}`,
    title: work.title,
    organization: work.company,
    description: work.description,
    type: 'work' as const,
    technologies: work.technologies,
    achievements: work.achievements,
  }));

  // Transform education to timeline items
  const educationTimelineItems: TimelineItem[] = experience.education.map(edu => ({
    date: `${edu.startDate} - ${edu.endDate}`,
    title: edu.degree,
    organization: edu.institution,
    description: edu.description,
    type: 'education' as const,
    achievements: edu.achievements,
  }));

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            className="relative w-32 h-32 mx-auto mb-8"
            variants={fadeInUp}
          >
            <ProfilePicture
              size="medium"
              priority={false}
              animate={false}
              className="border-4 border-white dark:border-gray-800 shadow-lg"
              showFallback={true}
              ariaLabel={`Medium-sized profile picture of ${siteConfig.author.name} on the about page`}
              includeScreenReaderText={true}
              screenReaderText={`This is ${siteConfig.author.name}'s profile picture on the about page, showing a professional headshot of the developer.`}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  // Could trigger a modal or larger view
                  console.log('Profile picture activated via keyboard');
                }
              }}
              onError={(error) => {
                console.error('About page profile picture failed to load:', error);
              }}
            />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            variants={fadeInUp}
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            About Me
          </motion.h1>

          <motion.div
            className="max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: isDarkMode ? 'white' : 'rgb(75, 85, 99)' }}
            >
              {siteConfig.author.bio}
            </p>

            <p
              className="leading-relaxed"
              style={{ color: isDarkMode ? 'white' : 'rgb(75, 85, 99)' }}
            >
              I'm passionate about creating exceptional digital experiences that solve real-world problems.
              With expertise in API development, test-driven development, and agile methodologies, I focus on
              delivering clean, scalable code that drives innovation and enhances user experience. My experience
              spans across modern web technologies including TypeScript, React, Next.js, and Laravel.
            </p>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            Skills & Technologies
          </h2>

          <div className="space-y-8">
            {Object.entries(skills).map(([category, categorySkills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + categoryIndex * 0.1 }}
              >
                <h3
                  className="text-xl font-semibold mb-4 capitalize"
                  style={{ color: isDarkMode ? 'white' : 'rgb(31, 41, 55)' }}
                >
                  {category} Development
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill, index) => (
                    <SkillBadge
                      key={skill.name}
                      skill={skill}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AI Tools & Productivity Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            AI Tools & Productivity
          </h2>

          <div className="max-w-3xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: isDarkMode ? 'white' : 'rgb(75, 85, 99)' }}
              >
                I'm passionate about leveraging AI tools and automation to enhance productivity and streamline development workflows.
                I actively explore and integrate cutting-edge AI technologies to solve complex problems and improve efficiency.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="p-6 rounded-xl border"
                style={{
                  backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                  borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">K</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      Kiro IDE
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
                    >
                      AI-Powered Development
                    </p>
                  </div>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
                >
                  Using Kiro as my primary development environment to accelerate coding with AI assistance,
                  automated code generation, and intelligent debugging. Leveraging MCP (Model Context Protocol)
                  for enhanced AI integrations and workflow automation.
                </p>
              </motion.div>

              <motion.div
                className="p-6 rounded-xl border"
                style={{
                  backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                  borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">n8n</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      n8n Automation
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
                    >
                      Workflow Automation
                    </p>
                  </div>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
                >
                  Building automated workflows with n8n to streamline repetitive tasks, integrate APIs,
                  and create efficient data pipelines. Connecting various services and tools to create
                  seamless automation solutions for development and business processes.
                </p>
              </motion.div>

              <motion.div
                className="p-6 rounded-xl border"
                style={{
                  backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                  borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">AI</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      AI Integration
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
                    >
                      Modern AI Tools
                    </p>
                  </div>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
                >
                  Actively exploring and implementing AI tools like ChatGPT, Claude, and GitHub Copilot
                  to enhance code quality, accelerate development, and solve complex technical challenges.
                  Staying current with the latest AI developments in software engineering.
                </p>
              </motion.div>

              <motion.div
                className="p-6 rounded-xl border"
                style={{
                  backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                  borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">⚡</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      Productivity Focus
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
                    >
                      Efficiency & Innovation
                    </p>
                  </div>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
                >
                  Continuously optimizing development workflows through automation, AI-assisted coding,
                  and smart tooling. Focused on reducing manual tasks and increasing development velocity
                  while maintaining high code quality and best practices.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <p
                className="text-sm italic"
                style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
              >
                "Embracing AI not to replace human creativity, but to amplify it and focus on solving more complex, meaningful problems."
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            Experience & Education
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Timeline
              items={workTimelineItems}
              title="Work Experience"
            />

            <Timeline
              items={educationTimelineItems}
              title="Education & Certifications"
            />
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(249, 250, 251)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
            >
              Let's Work Together
            </h2>

            <p
              className="mb-6 max-w-md mx-auto"
              style={{ color: isDarkMode ? 'white' : 'rgb(75, 85, 99)' }}
            >
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can bring your ideas to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="
                  inline-flex items-center justify-center px-6 py-3
                  bg-blue-600 hover:bg-blue-700 text-white font-medium
                  rounded-lg transition-colors
                "
              >
                Get In Touch
              </a>

              <a
                href={`mailto:${siteConfig.author.email}`}
                className="
                  inline-flex items-center justify-center px-6 py-3
                  border font-medium rounded-lg transition-colors
                "
                style={{
                  color: isDarkMode ? 'white' : 'rgb(55, 65, 81)',
                  borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (isDarkMode) {
                    e.currentTarget.style.backgroundColor = 'rgb(229, 231, 235)';
                    e.currentTarget.style.color = 'black';
                  } else {
                    e.currentTarget.style.backgroundColor = 'rgb(249, 250, 251)';
                    e.currentTarget.style.color = 'rgb(17, 24, 39)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = isDarkMode ? 'white' : 'rgb(55, 65, 81)';
                }}
              >
                Send Email
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}