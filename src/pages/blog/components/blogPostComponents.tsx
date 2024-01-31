import React from 'react';
import { useRouter } from 'next/router';
import { timeConvertUtcToKst } from '@/utils/timezoneConvet';
import SanitizeHtml from '@/utils/sanitizeHtml';

const BlogPostComponent = ({
    card_type,
    item_id,
    title,
    content,
    thumbnail,
    created_at,
    updated_at,
    user_id,
    tags,
}: any) => {
    const router = useRouter();
    if (thumbnail == null) thumbnail = "/no-image.png"

    return (
        <div key={item_id} className="card-wrapper" onClick={() => {
            router.push(`/${card_type}/${item_id}`)
        }}>
            {
                thumbnail != null && thumbnail != "" && thumbnail != "null" && thumbnail != "undefined" && thumbnail != undefined ?
                    <div className="card-body-img">
                        <img src={thumbnail} />
                    </div> : <></>
            }
            <div className="card-body-text">
                <div className="card-body-text-title">{title}</div>
                <div className="card-body-text-content" dangerouslySetInnerHTML={{
                    __html: SanitizeHtml(content)
                }}>
                </div>
            </div>

            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="card-footer">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.5rem",
                        overflow: "overlay",
                        userSelect: "none",
                    }} className="card-footer-tag">
                    {
                        tags.map((tag: any, index: number) => {
                            return (
                                <div key={index} style={{
                                    borderRadius: "5px",
                                    backgroundColor: "#e5e5e5",
                                    border: "2px solid #e5e5e5",
                                }} className="tag">{tag}</div>
                            );
                        })
                    }
                </div>
                <div
                    style={{
                        // 오른쪽으로 텍스트 정렬
                        textAlign: "right",
                    }}
                    className="create-date">{timeConvertUtcToKst(created_at)}</div>
            </div>
        </div>
    );
};

export default BlogPostComponent;