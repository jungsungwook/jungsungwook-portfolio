import React from 'react';
import { useRouter } from 'next/router';

const BlogPostComponent = ({
    card_type,
    item_id,
    title,
    content,
    img_url,
    created_at,
    updated_at,
    user_id,
}:any) => {
    const rotuer = useRouter();

    return (
        <div key={item_id} className="card-wrapper" onClick={() => {
            rotuer.push(`/${card_type}/${item_id}`)
        }}>
            {
                img_url != null && img_url != "" && img_url != "null" && img_url != "undefined" && img_url != undefined ?
                <div className="card-body-img">
                    <img src={img_url}/>
                </div> : <></>
            }
            <div className="card-body-text">
                <div className="card-body-text-title">{title}</div>
                <div className="card-body-text-content">{content}</div>
            </div>

            <div className="card-footer">
            <div className="username">{user_id}</div>
            <div className="create-date">{created_at}</div>
        </div>
    </div>
    );
};

export default BlogPostComponent;