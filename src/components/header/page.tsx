"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { JSX, SVGProps, useState, useEffect } from "react";

export default function Header() {

  // Used to change button functionality in the header. If user already logged-in then
  // use button that will redirect them to the dashboard.
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const authToken: string | null = localStorage.getItem('token');
    if (authToken) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50"
            prefetch={false}
          >
            <LinkIcon className="h-6 w-6 fill-gray-900 dark:fill-gray-50" />
            <span>URL Shortener</span>
          </Link>

          {!isLoggedIn && <Button
            variant={'outline'}
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Link
              href="/account"
            >
              My Account
            </Link>
          </Button>
          }

          {isLoggedIn &&
            <Button
              variant={'outline'}
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Link
                href="/dashboard"
              >
                Dashboard
              </Link>
            </Button>
          }

        </div>
      </header>
    </>
  );
}

function LinkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}