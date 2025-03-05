
import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/signin",
    error: "/error/unauthorized",
  },
})

export const config = {
  matcher: ["/placeholder"],
  // matcher: ["/dashboard"],
};