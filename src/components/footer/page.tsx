import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-6 w-full shrink-0">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 URL Shortener. All rights reserved.</p>
                <nav className="flex items-center space-x-4">
                    <Link href="#" className="text-sm hover:underline dark:text-gray-400" prefetch={false}>
                        Privacy
                    </Link>
                    <Link href="#" className="text-sm hover:underline dark:text-gray-400" prefetch={false}>
                        Terms
                    </Link>
                    <Link href="#" className="text-sm hover:underline dark:text-gray-400" prefetch={false}>
                        Contact
                    </Link>
                </nav>
            </div>
        </footer>
    );
} 