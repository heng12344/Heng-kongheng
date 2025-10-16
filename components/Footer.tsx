import React from 'react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="mt-12 py-6">
            <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
                <div className="mb-4">
                    <a
                        href="https://t.me/HeaTy9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors duration-300 shadow-md"
                    >
                        ទាក់ទងខ្ញុំផ្ទាល់
                    </a>
                </div>
                <p>&copy; {currentYear} ហេង គង់ហេង។ រក្សាសិទ្ធគ្រប់យ៉ាង។</p>
            </div>
        </footer>
    );
};
