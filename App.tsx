import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { Footer } from './components/Footer';
import { generateImageFromImage } from './services/geminiService';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

// FIX: Implemented the main App component. The previous content was invalid, causing module and reference errors. This new component structures the application, manages state, and handles user interactions.
function App() {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImageFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setGeneratedImageUrl(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!originalImageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setGeneratedImageUrl(null);
    setError(null);

    try {
      const base64Data = await fileToBase64(originalImageFile);
      const generatedData = await generateImageFromImage(base64Data, originalImageFile.type);
      
      if (generatedData) {
        setGeneratedImageUrl(`data:image/png;base64,${generatedData}`);
      } else {
        setError("Could not generate image. The service returned no data.");
      }
    } catch (err: any) {
      setError(err.message || "An unknown error occurred during image generation.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg mb-8 text-gray-600 dark:text-gray-400">
            ផ្ទុក​រូបភាព​អគារ​របស់​អ្នក​ឡើង​ដើម្បី​បង្កើត​កំណែ​ប្រាកដនិយម​ថ្មី​ជាមួយ​នឹង​ភ្លើង​ភ្លៀង​ពេល​រសៀល។
          </p>
          <ImageUploader 
            onImageUpload={handleImageUpload} 
            onGenerate={handleGenerate} 
            isLoading={isLoading}
            hasImage={!!originalImageFile}
          />
          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-center">
              {error}
            </div>
          )}
          <ImageDisplay 
            originalImage={originalImageUrl} 
            generatedImage={generatedImageUrl} 
            isLoading={isLoading} 
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
