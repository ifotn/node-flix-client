import Link from "next/link";

export default function Movies() {
    return (
        <main>
            <h1>Our Movies</h1> 
            <Link href="/movies/create" className="standardLink">Add a New Movie</Link>           
        </main>
    );
}