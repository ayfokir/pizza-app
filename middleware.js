import { NextResponse } from 'next/server';

export function middleware(request) {
  // Getting cookies from the request using the `RequestCookies` API
  const token = request.cookies.get("customer");

  console.log("see token >>>>>>>>>>>>>>>>>>>>>>>>>>>:", token);

  if (!token) {
    // Redirect the user to the login page
    const loginUrl = new URL("/super-admin-restaurant-login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Updated config to match the `/dashboard` route
export const config = {
  matcher: ['/dashboard/:path*'], // Apply middleware to `/dashboard` and its subpaths
};
