import { Movie } from "@/types/movie";
import EditMovieComponent from "@/app/components/editMovieForm";

export default async function EditMoviePage({ params }: { params: Promise<{ id: string }> }) {
    // get id from url param
    const { id } = await params;

    // fetch game from id
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/movies/${id}`);

    if (!res.ok) return (<h2>Movie Not Found</h2>);

    // populate movie from query result
    const movie: Movie = await res.json();

    return (
        <main>
            <EditMovieComponent movie={movie} />
        </main>
    );
}