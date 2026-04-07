import { Movie } from "@/types/movie";
import DeleteMovieButton from "@/app/components/deleteMovieButton";
import Link from "next/link";
import { AuthCheck } from "@/app/components/authCheck";

// call api layer which calls server
async function getMovie(id: string): Promise<Movie> {
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/movies/${id}`);

    if (!res.ok) throw new Error('Failed to fetch movie');

    return res.json();
}

export default async function MovieDetails({ params }: { params: Promise<{ id: string }> }) {
    // fetch id param from url
    const { id } = await params;

    // try to get movie data based on id value
    const movie = await getMovie(id);

    return (
        <main>
            <article className="card">
                <h1>{movie.title}</h1>
                <p>{movie.year}</p>
                <p>{movie.genre}</p>
                <p>{movie.rating}/10</p>
                <p>{movie.duration} Minutes</p>
                <AuthCheck>
                    <Link className="linkButton" href={`/movies/edit/${movie._id}`}>Edit</Link>
                    <DeleteMovieButton id={movie._id} />
                </AuthCheck>                 
            </article>
        </main>
    )
}