export async function POST(req: Request) {
    // parse username & password in request body
    const body = await req.json();
    
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    // register fails
    if (!res.ok) {
        const errorText = await res.text();
        console.log(`Register error: ${errorText}`);
        return new Response(errorText, { status: res.status });
    }

    return Response.json({ success: true });
}