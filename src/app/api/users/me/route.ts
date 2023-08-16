import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        console.log('request data: ', request)
        const userID = await getDataFromToken(request);
        const user = await User.findOne({ _id: userID }).select("-password");
        return NextResponse.json({
            message: "user foundd",
            data: user,
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message })
        console.log("caught error in ME/route", error)
    }

}