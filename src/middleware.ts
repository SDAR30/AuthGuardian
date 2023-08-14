import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
    const path = request.nextUrl.pathname;
    const isPublicPaths = path === '/login' || path === '/signup';
    //either token exists, or get '';
    const token = request.cookies.get('token')?.value || '';
    if(isPublicPaths && token){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if(!isPublicPaths && !token){ // if not logged in, start at login
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }


}
 
// See "Matching Paths" below to learn more. match to run middleware
export const config = {
  matcher: ['/', '/profile','/login','/signup',],
}