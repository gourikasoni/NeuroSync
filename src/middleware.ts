import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher([
  "/dashboard",
  "/journal",
  "/profile",
]);

export default clerkMiddleware(async (auth, req) => {
  console.log("🛡 Middleware triggered on:", req.nextUrl.pathname);

  if (isProtected(req)) {
    console.log("🔒 Protected route hit:", req.nextUrl.pathname);
     auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',  // skip static and Next internals
    '/(api|trpc)(.*)',         // include API routes
  ],
};
