import React from 'react';
import { useRouter } from 'next/router';
import { timeConvertUtcToKst } from '@/utils/timezoneConvet';

const BlogPostComponent = ({
    card_type,
    item_id,
    title,
    content,
    thumbnamil,
    created_at,
    updated_at,
    user_id,
}: any) => {
    const rotuer = useRouter();
    if (thumbnamil == null) thumbnamil = "/no-image.png"

    return (
        <div key={item_id} className="card-wrapper" onClick={() => {
            rotuer.push(`/${card_type}/${item_id}`)
        }}>
            {
                thumbnamil != null && thumbnamil != "" && thumbnamil != "null" && thumbnamil != "undefined" && thumbnamil != undefined ?
                    <div className="card-body-img">
                        <img src={thumbnamil} />
                    </div> : <></>
            }
            <div className="card-body-text">
                <div className="card-body-text-title">{title}</div>
                <div className="card-body-text-content">{content}</div>
            </div>

            <div className="card-footer">
                <div className="username">{user_id}</div>
                <div className="create-date">{timeConvertUtcToKst(created_at)}</div>
            </div>
        </div>
    );
};

export default BlogPostComponent;