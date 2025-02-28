import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./utils/db.js";
import authRoutes from "./routers/user.router.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`App is listening on PORT : ${process.env.PORT}`);
  connectDb();
});

app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Some went wrong" } = err;
  res.status(statusCode).json({ message });
});
