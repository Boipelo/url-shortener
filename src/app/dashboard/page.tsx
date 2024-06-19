"use client"
import { useState, useEffect, JSX, SVGProps } from "react"
import { redirect } from 'next/navigation'
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { useRouter } from 'next/navigation'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../components/ui/alert"

let token: string | null;
let userID: string | null;

// Declared here to avoid "variable is used before it is assigned" error.
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
  userID = localStorage.getItem('profile');
}

export default function Dashboard() {
  const router = useRouter();

  // State management variables for UI updates
  const [links, setLinks] = useState<any[]>([]);
  const [empty, setEmpty] = useState<boolean>(true);
  const [updateError, setUpdateError] = useState<boolean>(false);
  const [newLink, setNewLink] = useState<string>('');
  const [updateOrigLink, setUpdateLink] = useState<string>('');

  useEffect(() => {
    token = localStorage.getItem('token');
    userID = localStorage.getItem('profile');

    if (!token) {
      redirect("/account");
    }

    fetchLinks();

    // If links array is empty set empty to true and hide data table in UI.
    if (links.length === 0) {
      setEmpty(false);
    } else { setEmpty(true); }
  }, []);

  // Retrieve all shortened links assigned to the users ID.
  const fetchLinks = async () => {
    try {
      await fetch("http://localhost:8001/api.php", {
        method: 'POST',
        body: JSON.stringify({ userID, action: "all" })
      })
        .then(async data => await data.json())
        .then(async res => {
          if (res.status === 200) {
            setLinks(res.data);
          }
        });
    } catch (error) {
      console.error("Error fetching links:", error)
    }
  }

  async function createLink(event: { preventDefault: () => void; }) {
    event.preventDefault();

    try {
      await fetch("http://localhost:8001/api.php", {
        method: "POST",
        body: JSON.stringify({ originalUrl: newLink, userID, action: "shorten" }),
      })
        .then(async data => await data.json())
        .then(async res => {
          if (res.status === 200) {
            await fetchLinks();
          }
        })
    } catch (error) {
      console.error("Error creating link:", error)
    }
    return false;
  }
  const updateLink = async (UrlID: string, updatedLink: string) => {
    if (updateOrigLink === '') {
      setUpdateError(true);
      setTimeout(() => {
        setUpdateError(false);
      }, 6000);
      return;
    }
    try {
      await fetch(`http://localhost:8001/api.php?shortUrl=${UrlID}`, {
        method: "PUT",
        body: JSON.stringify({ newUrl: updatedLink, action: "update" }),
      })
        .then(async data => await data.json())
        .then(async res => {
          if (res.status === 200) {
            setLinks(links.map((link: any) => (link.shortUrl === UrlID ? { ...link, ...res.data } : link)));
            setUpdateLink('');
            fetchLinks();
          }
        })

    } catch (error) {
      console.error("Error updating link:", error)
    }
  }
  const deleteLink = async (UrlID: string) => {
    try {
      await fetch(`http://localhost:8001/api.php?shortUrl=${UrlID}`, {
        method: "DELETE",
        body: JSON.stringify({action: "delete"})
      })
      setLinks(links.filter((link: any) => link.shortUrl !== UrlID))
    } catch (error) {
      console.error("Error deleting link:", error)
    }
  }

  // Clear local storage when user logs out and redirect them to the login page.
  function logout() {
    localStorage.clear();
    router.push("/account");
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
            <span>URL Shortener Dashboard</span>
          </Link>


          <Button
            onClick={logout}
            variant={'outline'}
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Log Out
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center space-y-8">
        <div className="max-w-3xl text-center space-y-4">
          {updateError && <Alert className="bg-black text-white">
            <AlertTitle>Your link was NOT updated!</AlertTitle>
            <AlertDescription>
              Make sure you provide a valid link before saving your changes.
            </AlertDescription>
          </Alert>}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-gray-50">
            Manage your shortened links.
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
            Create, update, and delete your shortened links.
          </p>
        </div>
        <div className="w-full max-w-md">
          <form onSubmit={createLink} className="flex space-x-2">
            <Input
              type="text"
              name="originalUrl"
              defaultValue={newLink}
              onChange={e => setNewLink(e.target.value)}
              required
              placeholder="Enter URL to shorten"
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
          {!empty &&
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-500 dark:text-gray-400">Original URL</TableHead>
                  <TableHead className="text-gray-500 dark:text-gray-400">Short URL</TableHead>
                  {/* <TableHead className="text-gray-500 dark:text-gray-400">Clicks</TableHead> */}
                  <TableHead className="text-gray-500 dark:text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link: any) => (
                  <TableRow key={link.id} className="border-b border-gray-200 dark:border-gray-800">
                    <TableCell className="py-4 text-gray-900 dark:text-gray-50">{link.originalUrl}</TableCell>
                    <TableCell className="py-4">
                      <Link
                        href={`http://localhost:8001/api.php?action=redirect&&shortUrl=${link.shortUrl}`}
                        target="_blank"
                        className="text-blue-500 hover:underline dark:text-blue-400"
                      >
                        {link.shortUrl}
                      </Link>
                    </TableCell>
                    {/* <TableCell className="py-4">
                      {link?.clicks}
                    </TableCell> */}
                    <TableCell className="py-4 flex items-center gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <FilePenIcon className="h-5 w-5" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Edit Link</SheetTitle>
                            <SheetDescription>
                              Make changes to your link.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="originalUrl" className="text-right">
                                Old URL
                              </Label>
                              <Input id="originalUrl" value={`${link.originalUrl}`} className="col-span-3" disabled />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                New URL
                              </Label>
                              <Input id="newUrl" value={updateOrigLink} onChange={e => setUpdateLink(e.target.value)} className="col-span-3" required />
                            </div>
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <Button onClick={() => updateLink(link.shortUrl, updateOrigLink)}>Save Changes</Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                      <Button
                        onClick={() => deleteLink(link.shortUrl)}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:text-red-400"
                      >
                        <TrashIcon className="h-5 w-5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          }
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