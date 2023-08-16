import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const user = await User.findOne({ email });

        if(!user){
            return NextResponse.json({ error: "No user with THAT email" }, { status: 400 })
        }

        await sendEmail({email, emailType: "RESET", userID: user._id});

        return NextResponse.json({
            message: 'reset-password email started for ' + user.username,
            success: true,
            user
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        console.log('Error in (api/users/resetpassword)', error)
    }

}