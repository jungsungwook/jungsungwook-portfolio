import { getApiUrl } from "@/utils/getApiUrl";
import axios, { Method } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SanitizeHtml from "@/utils/sanitizeHtml";
import { useRecoilState } from "recoil";
import { isLoginState } from "@/states/is-login";
import CommentBox from "@/components/comment-box";
import { getCookie } from "cookies-next";

const BlogIdIndex = () => {
    const [loadComment, setLoadComment] = useState<boolean>(false);
    const [isClick, setIsClick] = useState<{ isClick: boolean, id: number }>();
    const [isLogin, setIsLoginState] = useRecoilState(isLoginState);
    const router = useRouter();
    const { id } = router.query;
    const [thumbnailImage, setThumbnailImage] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [prev, setPrev] = useState<{ count: number, id: number, subject: string }>();
    const [next, setNext] = useState<{ count: number, id: number, subject: string }>();
    const [commentCount, setCommentCount] = useState<string>("0");
    const [comment, setComment] = useState<Array<{
        id: Number,
        content: string,
        isReply: number,
        parentId: number,
        createdAt: string,
        createdBy: string,
        childComments: Array<{
            id: Number,
            content: string,
            isReply: number,
            parentId: number,
            createdAt: string,
            createdBy: string
        }>
    }>>([]);

    const getBlogComment = async () => {
        try {
            const method: Method = "GET";
            const response: any = await axios({
                url: getApiUrl(`/blog/${id}/comment`),
                method,
            });
            const comments = response.data.content;
            setCommentCount(comments.length.toString());
            if (!comments) return;
            const result: Array<{
                id: Number,
                content: string,
                isReply: number,
                parentId: number,
                createdAt: string,
                createdBy: string,
                childComments: Array<{
                    id: Number,
                    content: string,
                    isReply: number,
                    parentId: number,
                    createdAt: string,
                    createdBy: string
                }>
            }> = [];
            comments.forEach((comment: {
                id: Number,
                content: string,
                isReply: number,
                parentId: number,
                createdAt: string,
                createdBy: string
            }) => {
                if (!comment.isReply) {
                    result.push({
                        id: comment.id,
                        content: comment.content,
                        isReply: comment.isReply,
                        parentId: comment.parentId,
                        createdAt: comment.createdAt,
                        createdBy: comment.createdBy,
                        childComments: []
                    });
                } else {
                    const parentComment = result.find(parent => parent.id === comment.parentId);
                    if (parentComment) {
                        parentComment.childComments.push({
                            id: comment.id,
                            content: comment.content,
                            isReply: comment.isReply,
                            parentId: comment.parentId,
                            createdAt: comment.createdAt,
                            createdBy: comment.createdBy
                        });
                    }
                }
            });
            setComment(result);
        } catch (e: any) {
            const response = e.response;
            if (response.status != 500) {
                alert(response.data.message);
            }
        }
    };

    useEffect(() => {
        const alreadyEditComment = document.getElementById(`form-${isClick?.id}`);
        if (alreadyEditComment) {
            alreadyEditComment.parentNode?.removeChild(alreadyEditComment);
            return;
        }
        const editComment = document.createElement('div');
        editComment.className = `comment-form`;
        editComment.id = `form-${isClick?.id}`;
        editComment.style.lineHeight = '30px';
        editComment.style.marginBottom = '10px';

        const editSpan = document.createElement('span');
        editSpan.textContent = "답글 작성";
        editSpan.style.fontWeight = "bold";
        const editText = document.createElement('textarea');
        editText.placeholder = `${isLogin ? '' : '로그인 후 작성 가능합니다.'}`;
        editText.id = `replyInput-${isClick?.id}`;
        editText.rows = 4;
        editText.cols = 50;
        editText.required = true;
        const containerDiv = document.createElement("div");
        containerDiv.className = "comment-submit-button-container"

        const submitButton = document.createElement("button");
        submitButton.disabled = !isLogin;
        submitButton.type = "submit";
        submitButton.textContent = "작성";
        submitButton.onclick = async () => {
            try {
                const textarea = document.getElementById(`replyInput-${isClick?.id}`) as HTMLTextAreaElement;
                if (!textarea) return;
                if (textarea.value == "") return;
                const method: Method = "POST";
                const response: any = await axios({
                    url: getApiUrl(`/blog/${id}/comment`),
                    method,
                    data: {
                        content: textarea?.value,
                        isReply: 1,
                        parentId: `${isClick?.id}`
                    },
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`,
                    },
                });
                alert("정상 처리 되었습니다.")
                setLoadComment((prev) => !prev);
                textarea.value = "";
            } catch (e: any) {
                const response = e.response;
                if (response.status != 500) {
                    alert(response.data.message);
                }
            }
        };

        containerDiv.appendChild(submitButton);

        editComment.appendChild(editSpan);
        editComment.appendChild(editText);
        editComment.appendChild(containerDiv);

        const targetComment = document.getElementById(`comment-${isClick?.id}`);
        targetComment?.parentNode?.insertBefore(editComment, targetComment.nextSibling);

    }, [isClick]);

    useEffect(() => {
        const header = document.querySelector(".main_header") as HTMLDivElement;
        if (!header) return;
        const headerHeight = header.clientHeight;
        const scrollEvent = () => {
            const scrollY = window.scrollY;
            if (scrollY > headerHeight) {
                header.style.backgroundColor = "white";
                header.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
                header.style.transition = 'background-color 0.5s, box-shadow 0.5s';
            } else {
                header.style.backgroundColor = "transparent";
                header.style.boxShadow = "none";
            }
        };
        window.addEventListener("scroll", scrollEvent);
        return () => {
            window.removeEventListener("scroll", scrollEvent);
            header.style.backgroundColor = "transparent";
            header.style.boxShadow = "none";
        };
    }, []);

    useEffect(() => {
        if (!id) return;
        const getBlog = async () => {
            try {
                const method: Method = "GET";
                const response = await axios({
                    url: getApiUrl(`/blog/${id}`),
                    method,
                });
                const blog = response.data.content;
                if (!blog) return;
                setThumbnailImage(blog.thumbnail ? blog.thumbnail : "/white-back.jpg");
                setTitle(blog.subject);
                setContent(blog.content);
            } catch (e: any) {
                const response = e.response;
                if (response.status != 500) {
                    alert(response.data.message);
                    router.back();
                }
            }
        };
        getBlog();
        getBlogComment();

        const getBlogNext = async () => {
            try {
                const method: Method = "GET";
                const response = await axios({
                    url: getApiUrl(`/blog/${id}/next`),
                    method,
                });
                setNext(response.data.content);
            } catch (e) {

            }
        };
        getBlogNext();

        const getBlogPrev = async () => {
            try {
                const method: Method = "GET";
                const response = await axios({
                    url: getApiUrl(`/blog/${id}/prev`),
                    method,
                });
                setPrev(response.data.content);
            } catch (e) {

            }
        };
        getBlogPrev();
    }, [id]);

    useEffect(() => {
        getBlogComment();
    }, [loadComment]);

    const moveNextPage = () => {
        router.replace(`/blog/${next?.id}`)
    }

    const movePrevPage = () => {
        router.replace(`/blog/${prev?.id}`)
    }

    const handleComment = async () => {
        try {
            const textarea = document.getElementById('commentInput') as HTMLTextAreaElement;
            if (!textarea) return;
            if (textarea.value == "") return;
            const method: Method = "POST";
            const response: any = await axios({
                url: getApiUrl(`/blog/${id}/comment`),
                method,
                data: {
                    content: textarea?.value,
                    isReply: 0
                },
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                },
            });
            alert("정상 처리 되었습니다.")
            setLoadComment((prev) => !prev);
            textarea.value = "";
        } catch (e: any) {
            const response = e.response;
            if (response.status != 500) {
                alert(response.data.message);
            }
        }
    }

    return (
        <>
            <div className="blog-container">
                <div className="thumbnail-header">
                    <img src={thumbnailImage}></img>
                    <h1>{title}</h1>
                </div>
                <div className="blog-contents" dangerouslySetInnerHTML={{
                    __html: SanitizeHtml(content)
                }}>
                </div>
                <div style={{
                    background: "#8f8f8f",
                    height: '0.1px',
                    marginLeft: '20%',
                    marginRight: '20%'
                }}></div>
                <div style={{
                    display: 'flex',
                    marginLeft: '20%',
                    marginRight: '20%',
                    marginTop: '20px',
                    cursor: 'pointer',
                    width: 'fit-content',
                    height: 'fit-content',
                    alignItems: 'center',
                }} onClick={() => router.push('/blog')}>
                    <img src="/List-icon.png" width={20}></img>
                    <span style={{ paddingLeft: '10px' }}>목록으로</span>
                </div>
                <div className="blog-recommand-container">
                    <div className={`blog-prev ${prev?.count ? '' : 'hidden'}`} onClick={movePrevPage}>
                        <img
                            style={{
                                width: "50px",
                                height: "50px",
                                transform: "rotate(-90deg)",
                            }}
                            src="/scroll-up.png"
                        />
                        <div className="blog-prev-text">
                            <span>
                                이전 포스트
                            </span>
                            <h3>
                                {prev?.subject}
                            </h3>
                        </div>
                    </div>
                    <div className={`blog-next ${next?.count ? '' : 'hidden'}`} onClick={moveNextPage}>
                        <div className="blog-next-text">
                            <span>
                                다음 포스트
                            </span>
                            <h3>
                                {next?.subject}
                            </h3>
                        </div>
                        <img
                            style={{
                                width: "50px",
                                height: "50px",
                                transform: "rotate(90deg)",
                            }}
                            src="/scroll-up.png"
                        />
                    </div>
                </div>
                <div style={{
                    background: "#8f8f8f",
                    height: '0.1px',
                    marginLeft: '20%',
                    marginRight: '20%'
                }}></div>
                <div className="blog-comment-container">
                    <div className="comment-form">
                        <h3>댓글 ({commentCount})</h3>
                        <textarea placeholder={`${isLogin ? '' : '로그인 후 작성 가능합니다.'}`} id="commentInput" rows={4} cols={50} required></textarea>
                        <div className="comment-submit-button-container">
                            <button onClick={handleComment} disabled={isLogin ? undefined : true} type="submit">작성</button>
                        </div>
                    </div>
                    <div className="comment-list">
                        {
                            comment ?
                                comment.map((c) => {
                                    return CommentBox(c, { isClick }, setIsClick);
                                }) : '댓글이 없습니다.'
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogIdIndex;