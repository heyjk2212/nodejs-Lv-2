import express from "express";
import ReviewsRouter from "../routes/reviews.router.js";

const router = express.Router();
app.use(express.urlencoded({ extended: true }));
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", [ReviewsRouter, commentsrouter]);

app.listen(PORT, () => {
  console.log(PORT, `${PORT}포트로 서버가 열렸어요!`);
});

export default router;
