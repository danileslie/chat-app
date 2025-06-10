import e from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import dbConnection from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();
const port = process.env.PORT;
const __dirname = path.resolve();

// for letting backend and frontend interact
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// for data extraction
app.use(e.json({ limit: "10mb" }));
app.use(e.urlencoded({ extended: true, limit: "10mb" }));
// to get jwt
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// serving api and application in same place
if (process.env.NODE_ENV === "production") {
  app.use(e.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
  dbConnection();
});
