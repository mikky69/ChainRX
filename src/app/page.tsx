"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Link component
const Link = dynamic(() => import('next/link'), { ssr: true });

import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
const Home = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
    </main>
  );
};

export default Home;
