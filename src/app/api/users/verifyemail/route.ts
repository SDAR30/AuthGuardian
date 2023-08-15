import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log('token in verifyemail: ', token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ error: "INVALID TOKENN " }, { status: 400 })
        }
        console.log('verified user: ', user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "email verified succesfully", success: true })

    } catch (error: any) {
        console.log("caught error in api/verifyemail/route: ", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}