export async function GET(req: Request) {
    // get cookie w/jwt so we can remove
    const cookieHeader: string = req.headers.get('cookie') || '';

    // call api to log user out
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/users/logout`, {
        headers: { 'Cookie': cookieHeader }
    });

    if (!res.ok) throw new Error('Logout Failed');

    const data = await res.json();
    const response = Response.json(data);
    response.headers.set('Set-Cookie', 'authToken=; Path=/; Max-Age=0');  // this expires cookie
    return response;
}