import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

// 6. 댓글 작성 API
router.post('/review/:reviewId/comments', async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { content, author, password } = req.body;
        if (!content || !author || !password) {
            return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
        }

        const commentsfind = await prisma.bookComments.findFirst({
            where: { reviewId: +reviewId }
        });

        if (!commentsfind) {
            return res.status(404).json({ message: "존재하지 않는 리뷰입니다." });
        }

        await prisma.bookComments.create({
            data: {
                reviewId: +reviewId,
                content: content,
                author: author,
                password: password
            }
        });

        return res.status(201).json({ message: "댓글을 등록했습니다." });
    } catch (error) {
        return res.status(500).json({ message: "서버 오류입니다." });
    }
});

// 7. 댓글 목록 조회 API
router.get('/review/:reviewId/comments', async (req, res) => {
    try {
        const { reviewId } = req.params;
        if (isNaN(+reviewId)) {
            return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
        }

        const comments = await prisma.bookComments.findMany({
            where: { reviewId: +reviewId },
            select: {
                reviewId: true,
                commentsId: true,
                content: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                createdAt: "desc"
            },
        });

        if (comments.length === 0) {
            return res.status(404).json({ message: "존재하지 않는 리뷰입니다." });
        }

        return res.status(200).json({ data: comments });
    } catch (error) {
        return res.status(500).json({ message: "서버 오류입니다." });
    }
});

// 8. 댓글 수정 API
router.put('/review/:reviewId/comments/:commentsId', async (req, res) => {
    try {
        const { reviewId, commentsId } = req.params;
        const { content, password } = req.body;

        if (!content) {
            return res.status(404).json({ message: "댓글 내용을 입력해주세요" });
        }

        const commentsfind = await prisma.bookComments.findFirst({
            where: { reviewId: +reviewId, commentsId: +commentsId }
        });

        if (!commentsfind) {
            return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
        } else if (commentsfind.password !== password) {
            return res.status(401).json({ message: "비밀번호가 틀립니다." });
        }

        await prisma.bookComments.update({
            where: { reviewId: +reviewId, commentsId: +commentsId },
            data: {
                content: content,
            }
        });

        return res.status(201).json({ message: "게시글이 수정됐습니다." });
    } catch (error) {
        return res.status(500).json({ message: "서버 오류입니다." });
    }
});

// 9. 댓글 삭제 API
router.delete('/review/:reviewId/comments/:commentsId', async (req, res) => {
    try {
        const { reviewId, commentsId } = req.params;
        const { password } = req.body;

        const commentsfind = await prisma.bookComments.findFirst({
            where: { reviewId: +reviewId, commentsId: +commentsId }
        });

        if (!commentsfind) {
            return res.status(404).json({ message: "댓글이 존재하지 않습니다." });
        } else if (commentsfind.password !== password) {
            return res.status(401).json({ message: "비밀번호가 틀립니다." });
        }

        await prisma.bookComments.delete({
            where: { reviewId: +reviewId, commentsId: +commentsId },
        });

        return res.status(201).json({ message: "게시글이 삭제됐습니다." });
    } catch (error) {
        return res.status(500).json({ message: "서버 오류입니다." });
    }
});

export default router;