"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();

    type UserData = {
        _id?: string;
        username?: string;
        email?: string;
        isVerified?: boolean;
        isAdmin?: boolean;
    };

    const [data, setData] = useState<UserData>({});

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("sucesfuly logged out")
            router.push('/login')

        } catch (error: any) {
            console.log("caught error in profile/logout/route", error)
            toast.error(error.message)
        }

    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log("getUserDetails ", res.data)
        setData(res.data.data)

    }

    // useEffect(() => {
    //     const fetchUserDetails = async () => {
    //         try {
    //             const res = await axios.get('/api/users/me');
    //             console.log("getUserDetails ", res.data);
    //             setData(res.data.data);
    //         } catch (error) {
    //             console.error("Error fetching user details:", error);
    //         }
    //     };

    //     fetchUserDetails();
    // }, []);


    return (
        <>
            <div className="flex flex-col items-center mt-2">
                <Link href="/">Home Page</Link>
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-5xl m-3">{data.username}</h1>
                {/* <hr />
                <p>Email: {data.email} </p>
                <p>ID: {data._id}</p> */}
                <hr />
                <hr />
                <h2 className="bg-purple-900 mt-4 hover:bg-purple-700 text-white py-2 px-4 rounded">
                    {!data.username ? "-----" : <Link href={`/profile/${data.username}`}>Go to default profile page</Link>}
                </h2>

                <h2 className="bg-yellow-500 mt-4 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    <Link href="/resetpassword">Change password</Link></h2>

                <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={logout}
                >Log out</button>

                <button className="bg-green-300 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={getUserDetails}>  get username
                </button>

            </div>
        </>
    )
}