"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ResetPasswordPage() {
    const [user, setUser] = useState({ email: "" })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mailSent, setMailSent] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


    const onResetPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword", user);
            setMailSent(true);
            console.log("reset password email sent")
        } catch (error: any) {
            console.log('error caught in app/resetpassword: ',error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (emailRegex.test(user.email)) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl sm:text-6xl text-center font-bold">Reset Password</h1>
            <hr className="w-2/3 sm:w-1/3 my-8 border-gray-300" />

            {mailSent ? (
                <div className="mt-4 text-3xl">Mail sent successfully.</div>
            ) : (
                <div className="w-5/6 sm:w-1/2">
                    <label htmlFor="email" className="text-lg mb-2">
                        Email
                    </label>
                    <input
                        className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-black"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Enter your email"
                    />

                    <button
                        onClick={onResetPassword}
                        className="w-full p-4 font-bold rounded-lg bg-green-500 hover:bg-green-600 text-white focus:outline-none"
                        disabled={buttonDisabled || loading}
                    >
                        {loading ? "Sending.." : "Send reset code"}
                    </button>

                    <div className="mt-4 text-center">
                        Remember your password? <Link href="/login">Visit Login page</Link>
                    </div>
                </div>
            )}
        </div>
    );
}