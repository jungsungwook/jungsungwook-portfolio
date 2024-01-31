import { useEffect, useRef, useState } from "react";
import ReplyBox from "./reply-box";

const CommentBox = ({ id, content, createdAt, createdBy, isReply, parentId, childComments }: any, isClick: any, setIsClick: any) => {

    return (
        <>
            <div id={`comment-${id}`} className="comment" onClick={() => {
                setIsClick({ id: id });
            }}>
                <div className="content">{content}</div>
                <div className="comment-info">
                    <span className="comment-author">{createdBy}</span>
                    <span className="comment-timestamp">{createdAt}</span>
                </div>
            </div>
            {
                childComments.length == 0 ? "" :
                    childComments.map((c: any) => {
                        return ReplyBox(c);
                    })
            }
        </>
    );
}

export default CommentBox;