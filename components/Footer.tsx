import React from "react";
import { Heart, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-background w-full">
      <div className="mx-auto w-full px-6 py-16 sm:py-20 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.svg"
                alt="logo"
                width={36}
                height={36}
                className="dark:filter dark:brightness-0 dark:invert"
              />
              <span className="text-xl font-bold tracking-tight">
                Artificial GuruJi
              </span>
            </div>
            <p className="text-sm leading-6 text-muted-foreground max-w-xs">
              Your AI-powered content creation companion. Transform your ideas
              into engaging content.
            </p>
            <div className="flex space-x-5">
              <a
                href="https://twitter.com/ByteMohit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Follow on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/MohitGoyal09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Follow on Github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@artificialguruji.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Contact via email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="sm:ml-auto">
            <h3 className="text-sm font-semibold leading-6">Product</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:ml-auto">
            <h3 className="text-sm font-semibold leading-6">Company</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:ml-auto">
            <h3 className="text-sm font-semibold leading-6">Legal</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Artificial GuruJi. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              Made with{" "}
              <Heart className="h-4 w-4 text-red-500 hover:scale-110 transition-transform" />{" "}
              by Mohit
            </p>
            <p className="text-sm text-muted-foreground">
              Built with{" "}
              <span className="font-medium hover:text-primary transition-colors">
                Next.js
              </span>{" "}
              &{" "}
              <span className="font-medium hover:text-primary transition-colors">
                Shadcn
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
