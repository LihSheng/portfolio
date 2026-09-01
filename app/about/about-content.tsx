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
              className="leading-relaxed mb-4"
              style={{ color: isDarkMode ? 'white' : 'rgb(75, 85, 99)' }}
            >
              I work best in environments where software needs to be dependable, maintainable, and aligned with real
              operational needs. That usually means turning business requirements into clear technical solutions,
              collaborating closely with stakeholders, and improving systems in ways that make delivery smoother for
              both users and development teams.
            </p>

            <p
              className="leading-relaxed"
              style={{ color: isDarkMode ? 'white' : 'rgb(75, 85, 99)' }}
            >
              Alongside my day-to-day product work, I build and experiment with agentic AI systems, workflow
              automation, retrieval, and tool integrations. I am especially interested in how orchestration, context,
              evaluation, and strong engineering guardrails can turn AI from a standalone demo into a dependable part
              of real software and operational workflows.
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

        {/* AI & Automation Section */}
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
            AI, Automation & Agent Engineering
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
                My recent work goes beyond prompt-based AI usage into agent engineering: designing runtimes,
                orchestration, tool boundaries, retrieval, evaluation, and automation workflows that can be tested and
                governed like normal software. I focus on practical integrations where agents act through controlled
                tools and authorized APIs instead of bypassing application rules.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div
                className="p-5 rounded-xl border"
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
                    <span className="text-white font-bold text-sm">ADK</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      Agent Engineering & Orchestration
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
                    >
                      Google ADK · Agent Runtimes · Multi-Agent Flows
                    </p>
                  </div>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
                >
                  Building agent runtimes and orchestration patterns for tool-using, stateful, and multi-step agents.
                  This includes routing requests to specialized agents, managing context and sessions, and separating
                  reusable runtime capabilities from domain-specific agent logic.
                </p>
              </motion.div>

              <motion.div
                className="p-5 rounded-xl border"
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
                    <span className="text-white font-bold text-sm">MCP</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      MCP, WebMCP & Tool Integration
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
                    >
                      Structured Tools · Context · Authorized APIs
                    </p>
                  </div>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
                >
                  Exploring MCP and WebMCP-style integrations to expose well-defined tools and page or application
                  context to agents. I prefer constrained interfaces that preserve existing permissions and business
                  rules rather than giving agents unrestricted access to underlying systems.
                </p>
              </motion.div>

              <motion.div
                className="p-5 rounded-xl border"
                style={{
                  backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                  borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">RAG</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      Retrieval, Context & Evaluation
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
                    >
                      RAG · Memory · Evals · Observability
                    </p>
                  </div>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
                >
                  Designing retrieval and context layers with semantic data, bounded memory, grounding checks, and
                  citation-aware responses. I also use targeted evals, regression checks, and observability to measure
                  agent behavior instead of relying only on manual prompt testing.
                </p>
              </motion.div>

              <motion.div
                className="p-5 rounded-xl border"
                style={{
                  backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                  borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">n8n</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      Workflow Automation & AI-Assisted Delivery
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
                    >
                      n8n · Coding Agents · CI Guardrails
                    </p>
                  </div>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
                >
                  Automating scheduled and event-driven workflows with n8n while using coding agents for implementation
                  and review. I pair automation with explicit context, scoped instructions, static checks, tests, and
                  verification gates so faster delivery does not come at the expense of code quality.
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
                "I treat agents as software systems: give them clear tools and context, then verify what they do."
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
              title="Education"
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
