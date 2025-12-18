'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EntryAnimation } from '@/components/EntryAnimation/EntryAnimation';
import { NeuralNetwork } from '@/components/NeuralNetwork/NeuralNetwork';
import { PersistentUI } from '@/components/UI/PersistentUI';
import { ContactModal } from '@/components/UI/ContactModal';
import { SkillsView } from '@/components/ContentViews/SkillsView';
import { ProjectsView } from '@/components/ContentViews/ProjectsView';
import { ExperienceView } from '@/components/ContentViews/ExperienceView';
import { ResumeView } from '@/components/ContentViews/ResumeView';
import { CertificationsView } from '@/components/ContentViews/CertificationsView';
import { ExtracurricularsView } from '@/components/ContentViews/ExtracurricularsView';
import { InterestsView } from '@/components/ContentViews/InterestsView';
import { EducationView } from '@/components/ContentViews/EducationView';
import { AboutView } from '@/components/ContentViews/AboutView';
import { Background3D } from '@/components/UI/Background3D';
import { ThemeSwitcher } from '@/components/UI/ThemeSwitcher';

type ViewType =
  | 'entry'
  | 'network'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'resume'
  | 'certifications'
  | 'extracurriculars'
  | 'interests'
  | 'education'
  | 'about';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('entry');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [networkExpanded, setNetworkExpanded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleEntryComplete = () => {
    setCurrentView('network');
  };

  const handleNodeClick = (nodeId: string) => {
    if (nodeId === 'expand') {
      setNetworkExpanded(true);
    } else {
      setCurrentView(nodeId as ViewType);
    }
  };

  const handleViewClose = () => {
    setCurrentView('network');
  };

  const handleAboutClick = () => {
    setCurrentView('about');
  };

  const renderView = () => {
    const commonProps = { onClose: handleViewClose };

    switch (currentView) {
      case 'entry':
        return <EntryAnimation onComplete={handleEntryComplete} />;
      case 'skills':
        return <SkillsView {...commonProps} />;
      case 'projects':
        return <ProjectsView {...commonProps} />;
      case 'experience':
        return <ExperienceView {...commonProps} />;
      case 'resume':
        return <ResumeView {...commonProps} />;
      case 'certifications':
        return <CertificationsView {...commonProps} />;
      case 'extracurriculars':
        return <ExtracurricularsView {...commonProps} />;
      case 'interests':
        return <InterestsView {...commonProps} />;
      case 'education':
        return <EducationView {...commonProps} />;
      case 'about':
        return <AboutView {...commonProps} />;
      case 'network':
      default:
        return (
          <NeuralNetwork
            onNodeClick={handleNodeClick}
            width={dimensions.width}
            height={dimensions.height}
            expandMode={networkExpanded}
          />
        );
    }
  };

  return (
    <div className="w-screen h-[100dvh] bg-gradient-to-br from-slate-950 to-black overflow-hidden relative">
      <Background3D
        visible={currentView === 'network' || isContactOpen}
        opacity={isContactOpen ? 0.3 : 1}
      />

      <div
        ref={containerRef}
        className={`w-full h-full p-4 md:p-8 relative z-10 transition-opacity duration-500 ${isContactOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentView !== 'entry' && (
        <>
          <PersistentUI
            onContactClick={() => setIsContactOpen(true)}
            onBackClick={currentView !== 'network' ? handleViewClose : undefined}
            onAboutClick={handleAboutClick}
          />
          <ThemeSwitcher />
        </>
      )}

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
