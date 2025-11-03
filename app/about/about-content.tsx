'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SkillBadge from '@/components/SkillBadge';
import Timeline from '@/components/Timeline';
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
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg">
              <span className="text-4xl font-bold text-white">
                {siteConfig.author.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
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
              With a strong foundation in both frontend and backend technologies, I enjoy building scalable,
              performant applications that users love to interact with.
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
              border: '1px solid',
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