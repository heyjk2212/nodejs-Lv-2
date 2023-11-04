import express from 'express';
import { prisma } from '../utils/prisma/index.js';



const router = express.Router();

// 6. 댓글 작성 API
//     - 댓글 내용, 작성자명, 비밀번호를 **request**에서 전달받기
//     - 댓글 내용을 비워둔 채 API를 호출하면 “댓글 내용을 입력해주세요” 메시지 반환하기
router.post('/review/:reviewId/comments', async (req, res) => {
    const { reviewId } = req.params;
    const { content, author, password } = req.body;
    if (!content || !author || !password) {
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
    }
    const commentsfind = await prisma.bookComments.findFirst({
        where: { reviewId: +reviewId }
    })
    if (!commentsfind) {
        return res.status(404).json({ message: "존재하지 않는 리뷰입니다." })
    }
    await prisma.bookComments.create({
        data: {
            reviewId: +reviewId,
            content: content,
            author: author,
            password: password
        }
    })
    return res.status(201).json({ message: "댓글을 등록했습니다." });
})

// 7. 댓글 목록 조회 API
//     - 조회하는 리뷰에 작성된 모든 댓글을 목록 형식으로 조회하기
//     - 작성 날짜 기준으로 내림차순(최신순) 정렬하기

router.get('/review/:reviewId/comments', async (req, res) => {
    const { reviewId } = req.params;
    if (isNaN(+reviewId)) {
        return res.status(400).json({ message: "데이터형식이 올바르지않습니다." });
    }
    const comments = await prisma.bookComments.findMany({ // 없으면 빈배열을 줌
        where: { reviewId: +reviewId },
        select: {
            reviewId: true,
            commentsId: true,
            content: true,
            createdAt: true,
            updatedAt: true
        }
    })
    if (comments.length === 0) {
        return res.status(404).json({ message: "존재하지 않는 리뷰입니다." })
    }
    return res.status(200).json({ data: comments });
})

// 8. 댓글 수정 API
//     - 댓글 내용, 비밀번호를 **request**에서 전달받기
//     - 댓글 내용을 비워둔 채 API를 호출하면 “댓글 내용을 입력해주세요” 메시지 반환하기
router.put('/review/:reviewId/comments/:commentsId', async (req, res) => {
    const { reviewId, commentsId } = req.params;
    const { content, password } = req.body;

    const commentsfind = await prisma.bookComments.findFirst({
        where: { reviewId: +reviewId, commentsId: +commentsId }
    })

    if (!content) {
        return res.status(404).json({ message: "댓글 내용을 입력해주세요" })
    }
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
    })

    return res.status(201).json({ message: "게시글이 수정됐습니다." })

})


// 9. 댓글 삭제 API
//     - 비밀번호를 비교하여, 동일할 때만 댓글이 **삭제**되게 하기
router.delete('/review/:reviewId/comments/:commentsId', async (req, res) => {
    const { reviewId, commentsId } = req.params;
    const { password } = req.body;

    const commentsfind = await prisma.bookComments.findFirst({
        where: { reviewId: +reviewId, commentsId: +commentsId }
    })

    if (!commentsfind) {
        return res.status(404).json({ message: "댓글이 존재하지 않습니다." });
    } else if (commentsfind.password !== password) {
        return res.status(401).json({ message: "비밀번호가 틀립니다." });
    }
    await prisma.bookComments.delete({
        where: { reviewId: +reviewId, commentsId: +commentsId },
    })
    return res.status(201).json({ message: "게시글이 삭제됐습니다." })
});

export default router;