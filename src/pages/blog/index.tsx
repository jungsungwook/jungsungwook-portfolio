import { isLoginState } from "@/states/is-login";
import { set } from "animejs";
import axios, { Method } from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import BlogPostComponent from "./components/blogPostComponents";
import { getApiUrl } from "@/utils/getApiUrl";

const BlogIndex = () => {
    const [selectTag, setSelectTag] = useState<string>("전체 보기");
    const [tagList, setTagList] = useState<Array<{
        tag: string,
        tagCount: number
    }>>([]);
    const [blog, setBlog] = useState<Array<{
        id: number,
        subject: string,
        content: string,
        tags: string[],
        createdAt: string,
        updatedAt: string,
        thumbnail: string,
    }>>([]);

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
        };
    }, []);

    useEffect(() => {
        const getTagList = async () => {
            const { tags, allBlogCount }: {
                tags: Array<{
                    tag: string,
                    tagCount: number
                }>,
                allBlogCount: number,
            } = await loadTagList();
            if (!tags) return;
            const allTag = {
                tag: "전체 보기",
                tagCount: allBlogCount,
            };
            const tagList = [allTag];
            tags.forEach((tag) => {
                tagList.push(tag);
            });
            setTagList(tagList);
        };
        const getBlogList = async () => {
            const url = getApiUrl("/blog");

            const method: Method = "GET";
            const response = await axios({
                url,
                method,
            });
            const blogs = response.data.content;
            if (!blogs) return;
            setBlog(blogs);
        };
        getTagList();
        getBlogList();
    }, []);

    useEffect(() => {
        if (tagList.length === 0) return;
        const createTagList = (tagList: Array<{
            tag: string,
            tagCount: number
        }>) => {
            return tagList.map((tag) => {
                const li = document.createElement("li");
                li.innerText = `${tag.tag} (${tag.tagCount})`
                li.addEventListener("click", () => {
                    setSelectTag(tag.tag);
                });
                li.id = tag.tag + "-tag";
                return li;
            });
        };
        const tagListElement = createTagList(tagList);
        const tagListContainer = document.querySelector(".blog-tag-list");
        if (!tagListContainer) return;
        tagListContainer.innerHTML = "";
        tagListElement.forEach((element) => {
            tagListContainer.appendChild(element);
        });

        const loadTagList = document.querySelectorAll(".blog-tag-list li");
        const allSelectTag = loadTagList[0] as HTMLLIElement;
        if (allSelectTag.id === selectTag + "-tag") {
            allSelectTag.style.fontWeight = "bold";
        }

    }, [tagList]);

    useEffect(() => {
        const loadTagList = document.querySelectorAll(".blog-tag-list li");
        loadTagList.forEach((tag) => {
            const liTag = tag as HTMLLIElement;
            if (liTag.id === selectTag + "-tag") {
                liTag.style.fontWeight = "bold";
            } else {
                liTag.style.fontWeight = "normal";
            }
        });

        const getBlogList = async (tag?: string) => {
            const url = tag ? getApiUrl(`/blog?tag=${tag}`) : getApiUrl("/blog");

            const method: Method = "GET";
            const response = await axios({
                url,
                method,
            });
            const blogs = response.data.content;
            if (!blogs) return;
            setBlog(blogs);
        };
        if (selectTag === "전체 보기") {
            getBlogList();
        } else {
            getBlogList(selectTag);
        }

    }, [selectTag]);

    const loadTagList = async () => {
        const url = getApiUrl("/blog/tag-list");
        const method: Method = "GET";
        const response = await axios({
            url,
            method,
        });
        const { tags, allBlogCount } = response.data.content;
        return { tags, allBlogCount };
    };

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    opacity: "0.3",
                    top: "85%",
                    left: "90%",
                    zIndex: 100,
                }}
                className="scroll-up">
                <img
                    style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                    }}
                    src="/scroll-up.png"
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}
                />
            </div>
            <div
                style={{
                }}
            >
                <div style={{
                    display: "flex",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    justifyContent: "center",
                    padding: "5% 0 3% 0",
                }}>이것저것 블로그</div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <div style={{
                        flex: "15%"
                    }}>
                        <div
                            style={{
                                marginBottom: "1rem",
                                fontWeight: "bold",
                                textAlign: "right",
                            }}
                        >
                            태그 목록
                        </div>
                        <div
                            style={{
                                width: "100%",
                                height: "1px",
                                backgroundColor: "black",
                                // 굵기
                                opacity: "0.3",
                            }}
                        ></div>
                        <ul className="blog-tag-list" style={{
                            listStyle: "none",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                        }}>
                            <li style={{ fontWeight: "bold" }} onClick={() => { setSelectTag("전체 보기") }}>전체 보기 (0)</li>
                        </ul>
                    </div>
                    <div className="blog-list" style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flex: "70%",
                        paddingLeft: "0.5%",
                        marginBottom: "5rem",
                    }}>
                        {
                            blog.length === 0 ?
                                <div
                                    style={{
                                        paddingLeft: "41%",
                                        paddingTop: "20%"
                                    }}
                                >게시글이 없습니다.</div> :
                                blog.map((b) => {
                                    return BlogPostComponent({
                                        card_type: "blog",
                                        item_id: b.id,
                                        title: b.subject,
                                        content: b.content,
                                        created_at: b.createdAt,
                                        updated_at: b.updatedAt,
                                        img_url: b.thumbnail,
                                        tags: b.tags,
                                    });
                                })
                        }
                    </div>
                    <div style={{
                        flex: "15%"
                    }}>검색
                    </div>
                </div>
            </div >
        </>
    );
}

export default BlogIndex;