import { cookies } from "next/headers";

interface AuthCheckProps {
    children: React.ReactNode;
}

export async function AuthCheck({ children }: AuthCheckProps) {
    // check for authToken cookie
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if (!authToken) return null; // anonymous => don't render child elements
    return children;  // authenticated => render child elements
}