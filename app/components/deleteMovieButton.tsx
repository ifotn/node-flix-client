'use client';
import { useRouter } from "next/navigation";

export default function DeleteMovieButton({ id }: { id: string }) {
    const router = useRouter();

    const handleDelete = async() => {
        if (!confirm('Are you sure you want to delete this movie?')) return;
        
        // call api delete
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/movies/${id}`, {
            method: 'DELETE'
        })

        if (!res.ok) alert('Failed to delete movie');
        else {
            // success, refresh movie list
            router.push('/movies');
        }
    }

    return (
        <button className="deleteButton" onClick={handleDelete}>Delete</button>
    );
}