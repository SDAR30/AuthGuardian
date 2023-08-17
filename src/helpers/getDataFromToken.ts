import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        // console.log('All cookies: ', request.cookies);
        const token = request.cookies.get('token')?.value || '';
        console.log('from getDataFromToken: token: ', token)
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log('decoding token: ', decodedToken)

        return decodedToken.id;

    } catch (error: any) {
        throw new Error(error.message)
    }
}