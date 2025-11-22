'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownToLine, Download, Eye, File } from 'lucide-react';
import Image from 'next/image';

export function Resume() {
  // Resume details
  const resumeDetails = {
    title: "Jordan Hymas Resume",
    description: 'Full Stack Developer • AI Specialist',
    fileType: 'PDF',
    lastUpdated: 'November 2025',
    fileSize: '0.5 MB',
    previewImageSrc: '/resume_giraud_preview.png',
    downloadUrl: '/Jordan_Hymas_Resume_2025.pdf',
  };

  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = resumeDetails.downloadUrl;
    link.download = resumeDetails.downloadUrl.split('/').pop() || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto w-full font-sans">
      <motion.div
        onClick={handleDownload}
        className="group cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100/50 p-0 shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800/50 dark:shadow-none dark:hover:bg-neutral-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Details area */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {resumeDetails.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {resumeDetails.description}
              </p>
              <div className="mt-2 flex text-xs text-neutral-500 dark:text-neutral-500">
                <span>{resumeDetails.fileType}</span>
                <span className="mx-2">•</span>
                <span>Updated {resumeDetails.lastUpdated}</span>
                <span className="mx-2">•</span>
                <span>{resumeDetails.fileSize}</span>
              </div>
            </div>

            {/* Download indicator */}
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-white group-hover:bg-cyan-600 dark:group-hover:bg-cyan-400"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Download className="h-5 w-5" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Resume;
