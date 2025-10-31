'use client';

import { motion } from 'framer-motion';
import SkillBadge from '@/components/SkillBadge';
import Timeline from '@/components/Timeline';
import { siteConfig } from '@/lib/site-config';
import type { SkillCategory, ExperienceData } from '@/types';

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
  const skills = skillsData as SkillCategory;
  const experience = experienceData as ExperienceData;

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
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            variants={fadeInUp}
          >
            About Me
          </motion.h1>
          
          <motion.div 
            className="max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {siteConfig.author.bio}
            </p>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
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
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 capitalize">
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Experience & Education
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Timeline
              items={experience.work}
              title="Work Experience"
            />
            
            <Timeline
              items={experience.education}
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
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Let's Work Together
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
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
                  border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                  hover:bg-gray-50 dark:hover:bg-gray-700 font-medium
                  rounded-lg transition-colors
                "
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