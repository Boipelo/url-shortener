import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Header from "@/components/header/page"
import Footer from "@/components/footer/page"
import { JSX, SVGProps } from "react"

export default function Home() {
  return (
    <>
    <Header />
      <div className="flex flex-col min-h-[100dvh] bg-gray-50 dark:bg-gray-900">
        <main className="flex-1 container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center space-y-8">
          <div className="max-w-3xl text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Shorten your links with ease</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
              Our URL shortener service helps you create clean, branded links that are easy to share.
            </p>
          </div>
          <div className="w-full max-w-md">
            <form className="flex space-x-2">
              <Input type="text" placeholder="Enter your long URL" className="flex-1" />
              <Button type="submit">Shorten</Button>
            </form>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm space-y-4">
              <LinkIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-semibold">Custom Domains</h3>
              <p className="text-gray-500 dark:text-gray-400">Brand your links with your own custom domain.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm space-y-4">
              <InfoIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-semibold">Analytics</h3>
              <p className="text-gray-500 dark:text-gray-400">Track your link performance with detailed analytics.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm space-y-4">
              <UsersIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-semibold">Team Collaboration</h3>
              <p className="text-gray-500 dark:text-gray-400">Invite your team to manage links together.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>

  )
}

function InfoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
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


function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
