import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request) {
//   return NextResponse.redirect(new URL('/', request.url))

    let cookie = request.cookies.get('user_token');

    var isLogin = cookie ?? 0;

    if(isLogin == 0 && request.nextUrl.pathname.startsWith('/profile')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(isLogin != 0 && request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if(isLogin != 0 && request.nextUrl.pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
}

// export const config = {
//   matcher: ['/profile', '/login', '/register'],
// }