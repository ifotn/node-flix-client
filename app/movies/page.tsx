import Link from "next/link";

import { Movie } from "@/types/movie";

// prevent re-rendering so vercel build can finish
export const dynamic = 'force-dynamic';

async function getMovies(): Promise<Movie[]> {
    // call api layer which calls server to get movie data
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/movies`);

    if (!res.ok) throw new Error('Failed to fetch Movies');
    
    const movies: Movie[] = await res.json();
    return movies;
}

export default async function Movies() {
    // try to fetch movie data from route / server api
    const movies = await getMovies();

    return (
        <main>
            <h1>Our Movies</h1> 
            <Link href="/movies/create" className="standardLink">Add a New Movie</Link>
            <ul>
                {movies.map((movie) => (
                    <li className="card" key={movie._id}>
                        <Link href={`/movies/${movie._id}`}>
                            {movie.title}
                        </Link>
                    </li>
                ))}    
            </ul>           
        </main>
    );
}