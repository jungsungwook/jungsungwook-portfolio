const ReplyBox = ({ id, content, createdAt, createdBy, isReply, parentId }: any) => {
    return (
        <div className="reply">
            <div className="content">{content}</div>
            <div className="reply-info">
                <div className="reply-author">{createdBy}</div>
                <div className="reply-timestamp">{createdAt}</div>
            </div>
        </div>
    )
}

export default ReplyBox;