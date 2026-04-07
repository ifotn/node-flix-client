'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";
import { useAppContext } from "../context/appContext";

export default function EditMovieComponent({ movie }: { movie: Movie }) {
    // auth check from global context
    const { isAuthenticated } = useAppContext();

    // router for redirect
    const router = useRouter();

    // state vars for form inputs
    const [title, setTitle] = useState<string>(movie.title || '');
    const [year, setYear] = useState<string>(movie.year?.toString() || '');
    const [genre, setGenre] = useState<string>(movie.genre || '');
    const [rating, setRating] = useState<string>(movie.rating?.toString() || '');
    const [duration, setDuration] = useState<string>(movie.duration?.toString() || '');

    // state var key/val dictionary of validation errors in form
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        // check title
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!year.trim()) newErrors.year = 'Year is required';
        if (!rating.trim()) newErrors.rating = 'Rating is required';

        if (parseInt(rating) < 0 || parseInt(rating) > 10) newErrors.rating = 'Rating must be from 0-10';

        setErrors(newErrors);

        // are there any errors in our dictionary?
        if (Object.keys(newErrors).length === 0) {
            return true;
        }

        return false;
    };

    // form submission handler
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        // disable default form behaviour (i.e. submit to server)
        e.preventDefault();

        if (!validate()) {
            return;  // stop and don't submit, validation errors already displayed
        }

        // submit form data to api 
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/movies/${movie._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title, year, genre, rating, duration
            })
        });

        if (!res.ok) alert('Failed to save movie');
        else {
            // refresh movie list
            router.push('/movies');
        }      
    }

    // hide form for anon users
    if (!isAuthenticated) return (<main><h1 className="error">Unauthorized</h1></main>);

    // show form for authenticated users
    return (
        <main>
            <h1>Movie Details</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="">Title: *</label>
                    <input name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors.title && <span className="error">{errors.title}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="">Year: *</label>
                    <input name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)} type="number" />
                    {errors.year && <span className="error">{errors.year}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="">Genre: </label>
                     <input name="genre" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </fieldset>
                <fieldset>
                    <label htmlFor="">Rating /10:</label>
                    <input name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} type="number" />
                    {errors.rating && <span className="error">{errors.rating}</span>}
                 </fieldset>              
                <fieldset>
                    <label htmlFor="">Duration (mins)</label>
                     <input name="duration" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} type="number" />
                </fieldset>
                <button>Save</button>
            </form>
        </main>
    )
}