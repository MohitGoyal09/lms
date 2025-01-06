import React from "react";
import { Heart, Github, Twitter } from "lucide-react"; // Import icons from lucide-react

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#232323] text-gray-200 py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
               
                <div>
                    <h3 className="text-lg font-bold text-white">Artificial GuruJi</h3>
                </div>

                
                <div className="flex items-center space-x-4">
                    {/* Social links */}
                    <a
                        href="https://twitter.com/ByteMohit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                    >
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a
                        href="https://github.com/MohitGoyal09"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400 transition-colors"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                </div>

                
                <div className="text-center">
                    <p className="text-sm">© {currentYear} Mohit. All rights reserved.</p>
                    <p className="text-sm flex items-center justify-center gap-1">
                        Made with <Heart className="w-4 h-4 text-red-500" /> by Mohit
                    </p>
                    <p className="text-sm flex items-center justify-center gap-1">
                        Built with
                        <span className="font-bold">Next.js</span> and
                        <span className="font-bold">Shadcn</span>
                    </p>
                </div>

                
                <a 
                    href="#top" 
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                    Back to top
                </a>
            </div>
        </footer>
    );
};

export default Footer;
