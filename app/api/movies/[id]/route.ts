// api routes for /api/movies/{id}: GET (one), PUT, DELETE

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    // get id from url param
    const { id } = await params;

    // call GET (one) in server api
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/movies/${id}`);

    if (!res.ok) throw new Error('Failed to fetch movie');

    // return movie data
    return Response.json(await res.json());
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    // get id from url param
    const { id } = await params;

    // call GET (one) in server api
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/movies/${id}`, {
        method: 'DELETE'
    });

    if (!res.ok) throw new Error('Failed to delete movie');

    // return success response, there is no movie data
    return new Response(null, { status: 204 });
}