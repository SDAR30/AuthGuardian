import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({message: "loggg out succesfful", success: true})
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        })
        return response;
        
    } catch (error: any) {
        console.log("caught error in logout/route.ts", error)
        return NextResponse.json({ erorr: error.message }, { status: 500 })

    }
}