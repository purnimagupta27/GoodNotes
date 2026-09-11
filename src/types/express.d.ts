import type { auth } from "../lib/auth.js";

declare global {
  namespace Express {
    interface Request {
      user?: Awaited<ReturnType<typeof auth.api.getSession>>["user"];
    }
  }
}