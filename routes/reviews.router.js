import express from "express";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

// 리뷰 등록 API  [POST]
router.post("/reviews", async (req, res, next) => {
  try {
    // 클라이언트로부터 데이터를 받는다
    const { bookTitle, title, content, starRating, author, password } =
      req.body;

    // 받은 데이터 db에 저장한다
    const review = await prisma.bookReviews.create({
      data: {
        bookTitle,
        title,
        content,
        starRating,
        author,
        password,
      },
    });

    // 결과 리턴
    return res
      .status(201)
      .json({ message: "책 리뷰를 등록하였습니다.", data: review });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "죄송합니다. 서버에서 문제가 발생하였습니다." });
  }
});

// 리뷰 목록 조회 API  [GET]
router.get("/reviews", async (req, res, next) => {
  try {
    // db에서 불러온 데이터
    const reviews = await prisma.bookReviews.findMany({
      select: {
        reviewId: true,
        bookTitle: true,
        title: true,
        content: true,
        starRating: true,
        author: true,
        createdAt: true,
        updatedAt: true,
      },
      // 원하는 필드를 기준으로 정렬가능
      orderBy: {
        createdAt: "desc", // 내림차순 정렬(최신순)
      },
    });

    return res.status(200).json({ data: reviews });
  } catch (error) {}
});

// 리뷰 상세 조회 API  [GET]
router.get("/review/:reviewId", async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    if (!reviewId) {
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    const review = await prisma.bookReviews.findFirst({
      where: { reviewId: +reviewId },
      select: {
        reviewId: true,
        bookTitle: true,
        title: true,
        content: true,
        author: true,
        starRating: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({ data: review });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "죄송합니다. 서버에서 문제가 발생하였습니다." });
  }
});

// 리뷰 정보 수정 API  [PUT]
router.put("/review/:reviewId", async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    // 클라이언트에서 보낸 새로운 정보들
    const { bookTitle, title, content, starRating, password } = req.body;

    if (!reviewId) {
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    // 리뷰가 존재하는지 확인
    const review = await prisma.bookReviews.findUnique({
      where: { reviewId: +reviewId },
    });

    if (!review) {
      return res
        .status(404)
        .json({ errorMessage: "존재하지 않는 리뷰입니다." });
    } else if (review.password !== password) {
      return res.status(401).json({
        errorMessage: "비밀번호가 일치하지 않습니다.",
      });
    }

    // 수정된 정보 db에 업데이트하기
    await prisma.bookReviews.update({
      data: {
        bookTitle,
        title,
        content,
        starRating,
        password,
      },
      where: { reviewId: +reviewId, password: password },
    });

    return res
      .status(200)
      .json({ message: "책 리뷰를 수정하였습니다", data: review });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "죄송합니다. 서버에서 문제가 발생하였습니다." });
  }
});

// 리뷰 삭제 API  [DELETE]
router.delete("/review/:reviewId", async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const { password } = req.body;

    if (!reviewId) {
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    // 리뷰가 존재하는지 확인
    const review = await prisma.bookReviews.findUnique({
      where: { reviewId: +reviewId },
    });

    if (!review) {
      return res
        .status(404)
        .json({ errorMessage: "존재하지 않는 리뷰입니다." });
    } else if (review.password !== password) {
      return res.status(401).json({
        errorMessage: "비밀번호가 일치하지 않습니다.",
      });
    }

    await prisma.bookReviews.delete({
      where: { reviewId: +reviewId },
    });

    return res.status(200).json({ message: "책 리뷰를 삭제하였습니다" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ errorMessage: "죄송합니다. 서버에서 문제가 발생하였습니다." });
  }
});

export default router;
