import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, password } = reqBody;
        console.log(reqBody)

        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({ error: "USERR don't exist" }, { status: 400 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "WRONG! Password" }, { status: 400 });
        }

        //user exists so create token, encrypt it and set it to users cookies

        //A JWT is like a VIP badge, containing specific information about 
        // your access and secured with a unique signature.

        // cookie is like a hand stamp at an amusement park, storing information persistently, 
        // even between visits, and can have added security features like being invisible to others (HTTP-only)

        const tokenData = { id: user._id, username: user.username }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1m" });

        //JSON response obj created that is sent to client to inform of succesful login
        const response = NextResponse.json({
            message: "login success!!",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true, //cookie can only be accessed by server
        })
         // Set the isNewUser cookie
        response.cookies.set("isNewUser", "true", {
            maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: " caught errorr in api/users/login/route: " + error.message }, { status: 500 })

    }
}