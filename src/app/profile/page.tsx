"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false)

    const logout = async () => {
        try {
            setLoading(true);
            await axios.get("/api/users/logout");
            toast.success("sucesfuly logged out")
            router.push('/login')

        } catch (error: any) {
            console.log("caught error in profile/logout/route", error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/users/me');
            return response

        } catch (error) {
            console.log("error in fetchUSER")
        }
    }

    const userProfile = async () => {
        try {

            const response: any = await fetchUser();

            if (response.data.success) {
                toast.success("Redirecting....")
            }
            const userId = response.data.user._id;

            router.push(`/profile/${userId}`)

        } catch (error: any) {
            console.log("error in userProfile", error)
        }
    }

    const getUser = async () => {
        try {
            const response: any = await fetchUser();
            const userId = response.data.user._id;

            setData(userId)

        } catch (error: any) {
            console.log("error in getUSER", error)
        }
    }

    const handleVerify = async () => {
        try {
            const response: any = await fetchUser();
            setVerified(response.data.user.isVerified);
            const { email, _id } = await response.data.user;
            const emailType = "VERIFY";
            const userID = _id;
            toast.loading('verifying email...')
            const emailSender = await axios.post('/api/users/sendEmail', { email, emailType, userID })
            console.log("handleVerify: email sender: ", emailSender)
            toast.dismiss();
            toast.success('EMAIL VERIIFEDD SUCESFULLY');
            setVerified(true);

        } catch (error: any) {
            console.log("error in handleVerify: ", error)
        }

    }


    // const getUserDetails = async () => {
    //     const res = await axios.get('/api/users/me');
    //     console.log("getUserDetails ", res.data)
    //     setData(res.data.data)

    // }

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
                <p className='text-sm ml-[5.55rem] mt-2'>{
                    verified ? (
                        <p className='text-green-500'>Verified</p>
                    ) : (
                        <button onClick={handleVerify}>Click here to Verify</button>
                    )
                }</p>
                <hr />
                <div className='mt-10 flex flex-col text-white justify-center items-center'>
                    <p className='text'>User Details: {data ? `${data}` : "null"}</p>
                    <button disabled={data ? true : false} className=' disabled:opacity-50 text-sm w-[150px] mt-3 bg-orange-500 text-black rounded-full px-4 py-2' onClick={getUser}>Get User Details</button>
                </div>

                <div className='mt-5'>
                    <button onClick={userProfile} className='text-sm mt-3 bg-orange-500 text-black rounded-full px-2 py-2'>Go to my profile</button>
                </div>

                <h2 className="bg-yellow-500 mt-4 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    <Link href="/resetpassword">Change password</Link></h2>

                <button className='text-xl mt-3 bg-orange-500 text-black rounded-full px-4 py-2' onClick={logout}>{loading ? "loading..." : "Logout"}</button>

            </div>
        </>
    )
}