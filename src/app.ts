import express, { type Express, type Request, type Response } from "express";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./lib/auth.js";
import noteRoutes from './routes/notes.routes.js'

const app: Express = express();

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(`/api/v1/notes`, noteRoutes)

app.get("/api/health", (req: express.Request, res: express.Response) => {
  res.json({ status: "healthy", timestamp: new Date() });
});


// app.get("/api/protected-test", async (req: express.Request, res: express.Response) => {

//   const session = await auth.api.getSession({
//     headers: fromNodeHeaders(req.headers),
//   });
//   if (!session) {
//     return res.status(401).json({ error: "Unauthorized - Please sign in first" });
//   }
//   res.json({
//     message: "Success! You are authenticated.",
//     user: session.user,
//     session: session.session,
//   });
// });

// app.get("/", (req: Request, res: Response) => {
//   res.send("Running...");
// });

export default app;
