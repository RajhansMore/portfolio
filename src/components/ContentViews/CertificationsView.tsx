/**
 * CERTIFICATIONS CONTENT VIEW
 * Professional certifications with verification links
 */

'use client';

import React from 'react';
import { portfolioConfig } from '@/config/portfolio.config';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/UI/Animations';

interface CertificationsViewProps {
  onClose?: () => void;
}

export const CertificationsView: React.FC<CertificationsViewProps> = ({ onClose }) => {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 to-black rounded-lg p-8 overflow-y-auto">
      {/* Header */}
      <FadeIn direction="down" className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Certifications</h2>
      </FadeIn>

      {/* Certifications Grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioConfig.certifications.map((cert, index) => (
          <StaggerItem
            key={index}
            className="bg-slate-900/50 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
          >
            {/* Certification Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">🎖️</div>
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                {cert.issuedDate}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>

            {/* Issuer */}
            <p className="text-blue-400 font-semibold mb-4">{cert.issuer}</p>

            {/* Verification Link */}
            <a
              href={cert.verificationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              🔗 Verify Credential
              <span className="text-xs">↗</span>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>
      {/* Close Button */}
      {/* Back button now in PersistentUI */}
    </div>
  );
};

export default CertificationsView;
