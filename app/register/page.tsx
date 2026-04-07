'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    // router for redirecting after success
    const router = useRouter();

    // state vars
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [responseError, setResponseError] = useState<string>('');

    // state level err dict
    const [errors, setErrors] = useState<Record<string, string>>({});

    // form val
    const validate = (): boolean => {
        // fn level error dict
        const newErrors: Record<string, string> = {};

        if (!username.trim()) newErrors.username = 'Username required';
        if (password.trim().length < 8) newErrors.password = 'Password must be min 8 characters';
        if (password !== confirm) newErrors.confirm = 'Passwords do not match';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) return true; // no val errors
        return false; // at least 1 val error
    }

    // submit attempt
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }
        else {
            // call api to try to register new user
            const res: Response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                setResponseError('Registration Error');
            }
            else {
                // ok => login
                router.push('/login');
            }        
        }
    }

    return (
        <main>
            <h1>Register</h1>
            {responseError && <h2 className="error">{responseError}</h2>}
            <form onSubmit={handleSubmit}>
                <fieldset><label htmlFor="username">Username: *</label>
                    <input type="email" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {errors.username && <span className="error">{errors.username}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password: *</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                     {errors.password && <span className="error">{errors.password}</span>}
                </fieldset>
                <fieldset>
                    <label htmlFor="confirm">Confirm Password: *</label>
                    <input type="password" id="confirm" name="confirm"  value={confirm} onChange={(e) => setConfirm(e.target.value)}/>
                     {errors.confirm && <span className="error">{errors.confirm}</span>}
                </fieldset>
                <button>Register</button>
            </form>
        </main>
    )
}