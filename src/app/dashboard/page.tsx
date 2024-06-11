"use client"

import { useState, useEffect, JSX, SVGProps } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table"

export default function Component() {
  const [links, setLinks] = useState<any>([])
  useEffect(() => {
    fetchLinks()
  }, [])
  const fetchLinks = async () => {
    try {
      const response = await fetch("YOUR_API_URL")
      const data = await response.json()
      setLinks(data)
    } catch (error) {
      console.error("Error fetching links:", error)
    }
  }
  const createLink = async (longUrl: string) => {
    try {
      const response = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      })
      const data = await response.json()
      setLinks([...links, data])
    } catch (error) {
      console.error("Error creating link:", error)
    }
  }
  const updateLink = async (id: string, updatedLink: string) => {
    try {
      const response = await fetch("YOUR_API_URL", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLink),
      })
      const data = await response.json()
      setLinks(links.map((link: any) => (link.id === id ? { ...link, ...data } : link)))
    } catch (error) {
      console.error("Error updating link:", error)
    }
  }
  const deleteLink = async (id: string) => {
    try {
      await fetch("YOUR_API_URL", {
        method: "DELETE",
      })
      setLinks(links.filter((link: any) => link.id !== id))
    } catch (error) {
      console.error("Error deleting link:", error)
    }
  }
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50"
            prefetch={false}
          >
            <LinkIcon className="h-6 w-6 fill-gray-900 dark:fill-gray-50" />
            <span>URL Shortener</span>
          </Link>
          <Button
            onClick={fetchLinks}
            variant="ghost"
            size="icon"
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <RefreshCwIcon className="h-6 w-6" />
            <span className="sr-only">Refresh links</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center space-y-8">
        <div className="max-w-3xl text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-gray-50">
            Manage your shortened links
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
            Create, update, and delete your shortened links with ease.
          </p>
        </div>
        <div className="w-full max-w-md">
          <form
            className="flex space-x-2"
          >
            <Input
              type="text"
              name="longUrl"
              placeholder="Enter your long URL"
              className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
            />
            <Button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              Shorten
            </Button>
          </form>
        </div>
        <div className="w-full max-w-5xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-500 dark:text-gray-400">Long URL</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400">Short URL</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link: any) => (
                <TableRow key={link.id} className="border-b border-gray-200 dark:border-gray-800">
                  <TableCell className="py-4 text-gray-900 dark:text-gray-50">{link.longUrl}</TableCell>
                  <TableCell className="py-4">
                    <Link
                      href="#"
                      target="_blank"
                      className="text-blue-500 hover:underline dark:text-blue-400"
                      prefetch={false}
                    >
                      {link.shortUrl}
                    </Link>
                  </TableCell>
                  <TableCell className="py-4 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <FilePenIcon className="h-5 w-5" />
                      <span className="sr-only">Edit link</span>
                    </Button>
                    <Button
                      onClick={() => deleteLink(link.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:text-red-400"
                    >
                      <TrashIcon className="h-5 w-5" />
                      <span className="sr-only">Delete link</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}

function FilePenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
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


function RefreshCwIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  )
}


function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}