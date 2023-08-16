"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({ username: "", password: "" })
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false);


    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user);
            console.log('login successss: ', response.data)
            toast.success("Login Succs")
            router.push('/');


        } catch (error: any) {
            console.log('login failed. caught in app/login/page:', error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }

    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white text-2xl">{loading ? "Processing" : "Log in"}</h1>
            <hr />

            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
            />

            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />

            <button
                onClick={onLogin}
                className="p-2 border border-grapy-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >Log in</button>
            <Link href="/signup">Signup instead</Link>

        </div>
    )
}