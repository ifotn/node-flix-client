'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = async () => {
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/logout`);

        if (res.ok) { 
            router.push('/'); // redirect to home
        }
        else {
            console.log('Logout failed');
        }
    }

    return (
        <nav className="bg-gray-900 text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center">
           <h1 className="text-xl font-bold mb-2 md:mb-0">COMP2068 Movie Library</h1>
           <ul className="flex flex-col md:flex-row md:space-x-4">
               <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
               <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
               <li><Link href="/movies" className="hover:text-gray-300">Movies</Link></li>
               <li><Link href="/register" className="hover:text-gray-300">Register</Link></li>
               <li><Link href="/login" className="hover:text-gray-300">Login</Link></li>
               <li>
                <a className="hover:text-gray-300 navLink" onClick={handleLogout}>Logout</a>
               </li>
           </ul>
       </nav>
    );
}