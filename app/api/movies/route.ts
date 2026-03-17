// route.ts: standard Next.js file name for file used to call external api GET (all) & POST

// GET: /api/games => fetch all movies from server api
export async function GET() {
    // use the js fetch lib to call our server api & get a response
    // this connects React client app to Express server app
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/movies`);
    return Response.json(await res.json());
}

// POST: /api/games => submit new movie to db
export async function POST(req: Request) {
    // parse request body
    const body = await req.json();

    // call server api
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/movies`, {
        'method': 'POST',
        'headers': { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    // api post failure
    if (!res.ok) {
        const errorText: string = await res.text();
        return new Response( errorText, { status: res.status });
    }
    // success
    return Response.json({ success: true });
};