import express from "express";
import ReviewsRouter from "../routes/reviews.router.js";
import commentsrouter from "../routes/comments.router.js";

const router = express.Router();
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", [ReviewsRouter, commentsrouter]);

app.listen(PORT, () => {
  console.log(PORT, `${PORT}포트로 서버가 열렸어요!`);
});

export default router;
