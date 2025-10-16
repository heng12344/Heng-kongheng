import React from 'react';
import { ThemeToggle } from './ThemeToggle';

const Logo: React.FC = () => (
    <img 
        src="https://storage.googleapis.com/aistudio-project-marketplace-app-assets/1721517740263-logo"
        alt="Heng Kong Heng Graphic Design & Architecture Logo" 
        className="h-12"
    />
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <Logo />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">សូមស្វាគមន៍មកកាន់ App ហេង គង់ហេង</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};