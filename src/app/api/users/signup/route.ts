import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { sendEmail } from "@/helpers/mailer";



connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody
        //you can do your own validation here for extra, although it's handled in userSchema

        console.log(reqBody);

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log('new user (from api/signup/route.ts): ', savedUser)

        //SEND VERIFICATION EMAIL
        await sendEmail({ email, emailType: "VERIFY", userID: savedUser._id })

        const response = NextResponse.json({
            message: "new user created (from api/signup/route.ts)",
            success: true,
            savedUser,
        })

        const tokenData = { id: savedUser._id, savedUsername: savedUser.username }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1y" });

        response.cookies.set("token", token, {
            //httpOnly: true, //cookie can only be accessed by server
        })
        // Set the isNewUser cookie
        response.cookies.set("isNewUser", "true", {
            maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
        });

        return response;

    } catch (error: any) {
        console.log('error (from api/signup/route.ts): ', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}