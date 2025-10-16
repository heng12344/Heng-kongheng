
import React from 'react';
import { Spinner } from './Spinner';

interface ImageDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
}

const ImagePlaceholder: React.FC<{ text: string }> = ({ text }) => (
  <div className="w-full h-full min-h-[200px] md:min-h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
    <p className="text-gray-500 dark:text-gray-400">{text}</p>
  </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, generatedImage, isLoading }) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4">រូបភាពដើម</h2>
        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg">
          {originalImage ? (
            <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
          ) : (
            <ImagePlaceholder text="សូមបញ្ចូលរូបភាពរបស់អ្នក" />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4">រូបភាពដែលបានបង្កើត</h2>
        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {isLoading ? <Spinner /> : 
            generatedImage ? (
              <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
            ) : (
              <ImagePlaceholder text="លទ្ធផលនឹងបង្ហាញនៅទីនេះ" />
            )
          }
        </div>
      </div>
    </div>
  );
};
