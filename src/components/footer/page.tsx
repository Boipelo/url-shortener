import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-6 w-full shrink-0">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 URL Shortener.</p>
                <nav className="flex items-center space-x-4">
                    <Link href="/dashboard" className="text-sm hover:underline dark:text-gray-400">
                        Dashboard
                    </Link>
                    <Link href="/account" className="text-sm hover:underline dark:text-gray-400">
                        Account
                    </Link>
                    <Link href="/" className="text-sm hover:underline dark:text-gray-400">
                        Home
                    </Link>
                </nav>
            </div>
        </footer>
    );
} 