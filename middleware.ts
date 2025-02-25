import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionClient } from "@/lib/server/appwrite";

// Define public routes
const publicRoutes = ["/", "/login", "/register", "/forgotpassword"];

async function getUserAndRole(request: NextRequest) {
  try {
    // Get the cookie store from Next.js
    const cookieStore = cookies();
    const sessionName = `a_session_${process.env.NEXT_PUBLIC_PROJECTID}`;
    
    if (!cookieStore.has(sessionName)) {
      console.log("No session cookie found");
      return { user: null, role: null };
    }
    
    // Create a client with the user's session
    const { account, databases } = await createSessionClient();
    
    // Get the user
    let user;
    try {
      user = await account.get();
      console.log("User fetched:", user.$id);
    } catch (error) {
      console.log("Failed to get user:", error);
      return { user: null, role: null };
    }
    
    // Get the user's profile
    let profile;
    try {
      const profileResponse = await databases.listDocuments(
        "UsersDB", // Replace with your actual DB ID
        "UserProfiles", // Replace with your actual collection ID
        [
          `equal("userId", "${user.$id}")`
        ]
      );
      
      profile = profileResponse.documents[0];
      console.log("Profile fetched:", profile?.role);
    } catch (error) {
      console.log("Failed to get profile:", error);
      return { user, role: null };
    }
    
    return { user, role: profile?.role || null };
  } catch (error) {
    console.error("Error in getUserAndRole:", error);
    return { user: null, role: null };
  }
}

export async function middleware(request: NextRequest) {
  console.log("Running middleware for:", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;
  
  try {
    const { user, role } = await getUserAndRole(request);
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAdminRoute = pathname.startsWith("/admin");
    const isModRoute = pathname.startsWith("/mod");
    const isDashboardRoute = pathname.startsWith("/dashboard");

    // Unauthenticated users
    if (!user) {
      console.log("User not authenticated");
      if (isPublicRoute) {
        return NextResponse.next();
      }
      if (isDashboardRoute || isAdminRoute || isModRoute) {
        console.log("Redirecting unauthenticated user to login");
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(redirectUrl);
      }
      return NextResponse.next();
    }

    // Authenticated users
    console.log("User authenticated with role:", role);
    if (isPublicRoute && pathname !== "/") {
      const dashboardPath =
        role === "student" ? "/dashboard" : role === "mod" ? "/mod" : "/admin";
      console.log("Redirecting from public route to:", dashboardPath);
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    if (pathname === "/") {
      const dashboardPath =
        role === "student" ? "/dashboard" : role === "mod" ? "/mod" : "/admin";
      console.log("Redirecting from root to:", dashboardPath);
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    if (isAdminRoute && role !== "admin") {
      console.log(
        "Non-admin tried to access admin route, redirecting to /dashboard"
      );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isModRoute && role !== "mod") {
      console.log("Non-mod tried to access mod route, redirecting to /dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isDashboardRoute && role !== "student") {
      const dashboardPath = role === "mod" ? "/mod" : "/admin";
      console.log(
        "Non-student tried to access dashboard, redirecting to:",
        dashboardPath
      );
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    console.log("Proceeding with request");
    return NextResponse.next();
  } catch (error) {
    // If an error occurs, log it and return next() to avoid blocking the request
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
