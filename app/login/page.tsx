'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/appContext";

export default function Login() {
    const router = useRouter();

    // access global var setters
    const { setAppUsername, setIsAuthenticated } = useAppContext();

    // state vars
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [responseError, setResponseError] = useState<string>('');

    const validate = (): boolean => {
        if (!username || !password) {
            setResponseError('Invalid Login');
            return false;
        }
        return true;
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        // call api to try and login
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            setResponseError('Invalid Login');
            return;
        }

        // set global vars after login ok
        setAppUsername(username);
        setIsAuthenticated(true);
        router.push('/movies');
    }

    return (
        <main>
            <h1>Login</h1>
            {responseError && <span className="error">{responseError}</span>}
            <form onSubmit={handleSubmit}>
                <fieldset><label htmlFor="username">Username: *</label>
                    <input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password: *</label>
                    <input type="password" id="password" name="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
                <button>Login</button>
            </form>
        </main>
    )
}