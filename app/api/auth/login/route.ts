export async function POST(req: Request) {
    // parse username & password in request body
    const body = await req.json();
    
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'  // needed to receive cookie from api
    });

    // login fails
    if (!res.ok) {
        const errorText = await res.text();
        console.log(`Login error: ${errorText}`);
        return new Response(errorText, { status: res.status });
    }

    // login succeeds, pass cookie to client to it can be included in private api calls
    const setCookieHeader = res.headers.get('set-cookie');
    const responseHeaders = new Headers();

    if (setCookieHeader) responseHeaders.set('Set-Cookie', setCookieHeader);

    return Response.json({ success: true }, { headers: responseHeaders });
}