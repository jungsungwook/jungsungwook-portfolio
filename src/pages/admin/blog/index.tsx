import { set } from "animejs";
import axios, { Method } from "axios";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import BlogPostComponent from "../../blog/components/blogPostComponents";
import { getApiUrl } from "@/utils/getApiUrl";
import RealTimeChat from "@/components/realtime-chat";
import GuestBook from "@/components/guestbook";
import { useRouter } from 'next/router';

const AdminBlog = () => {
    const rotuer = useRouter();
    const tagInfo: any = {};
    const searchKeyword = useRef<any>(undefined);
    const currentTag = useRef<string>("전체 보기");
    const blogLoding = useRef<boolean>(false);
    const pageNumber = useRef<number>(1);
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
            header.style.backgroundColor = "transparent";
            header.style.boxShadow = "none";
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // 스크롤 위치에 따라 추가 데이터를 로드하는 로직
            const scrollPosition = window.innerHeight + window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight;
            // 90% 지점에 도달하면 추가 데이터를 로드한다.
            if (scrollPosition >= documentHeight * 0.9) {
                const isLoading = blogLoding.current;
                if (isLoading) return;
                pageNumber.current = pageNumber.current + 1;
                blogLoding.current = true;
                loadPage(pageNumber.current, currentTag.current, searchKeyword.current, false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
            tagInfo["전체 보기"] = allBlogCount;

            const tagList = [allTag];
            tags.forEach((tag) => {
                tagList.push(tag);
                tagInfo[tag.tag] = tag.tagCount;
            });
            setTagList(() => tagList);
            await loadPage(pageNumber.current, currentTag.current);
        };
        getTagList();
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
        searchKeyword.current = undefined;
        currentTag.current = selectTag;
        pageNumber.current = 1;
        const loadTagList = document.querySelectorAll(".blog-tag-list li");
        loadTagList.forEach((tag) => {
            const liTag = tag as HTMLLIElement;
            if (liTag.id === selectTag + "-tag") {
                liTag.style.fontWeight = "bold";
            } else {
                liTag.style.fontWeight = "normal";
            }
        });

        loadPage(pageNumber.current, selectTag);
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

    const loadPage = async (pageNumber: number, tag?: string, search?: string, isOW: boolean = true) => {
        if (tag === "전체 보기") tag = undefined;
        const maxPage = tag ? Math.ceil(tagInfo[tag] / 10) : Math.ceil(tagInfo["전체 보기"] / 10);
        if (pageNumber > maxPage) return;

        let url = getApiUrl(`/blog?page=${pageNumber}`);
        if (tag) url += `&tag=${tag}`;
        if (search) url += `&search=${search}`;

        const method: Method = "GET";
        const response = await axios({
            url,
            method,
        });
        const blogs = response.data.content;
        if (!blogs) return;
        isOW ? setBlog(blogs) : setBlog(prev => [...prev, ...blogs]);
        blogLoding.current = false;
    };

    const handleSearch = async () => {
        const searchInput = document.querySelector("#search-input") as HTMLInputElement;
        searchKeyword.current = searchInput.value;
        if (searchKeyword.current === "") searchKeyword.current = undefined;
        pageNumber.current = 1;
        blogLoding.current = true;
        await loadPage(pageNumber.current, selectTag, searchKeyword.current);
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
                    position: "fixed",
                    opacity: "0.3",
                    top: "85%",
                    right: "90%",
                    zIndex: 100,
                }}
                className="blog-write">
                <img
                    style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                    }}
                    src="/plus.png"
                    onClick={() => {
                        rotuer.push(`/admin/blog/new`)
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
                <div className="search-box" style={{
                    display: "flex",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    justifyContent: "center",
                    padding: "0 0 1% 0",
                }}>
                    <input type="text" id="search-input"
                        style={{
                            width: "50%",
                            height: "3rem",
                            borderRadius: "0.1rem",
                            border: "3px solid #c4c4c4",
                            paddingLeft: "1rem",
                            fontSize: "1rem",
                        }}
                        placeholder="태그를 선택한 뒤 검색어를 입력해주세요."
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                    <button
                        className="search-button"
                        style={{
                            width: "3%",
                            height: "auto",
                            borderRadius: "0.1rem",
                            border: "1px solid #6E6E6E",
                            backgroundColor: "#6E6E6E",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                            color: "white",
                            transition: "background-color 0.25s, color 0.25s, font-weight 0.25s",
                        }}
                        onClick={handleSearch}
                    >검색</button>
                </div>
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
                        alignItems: "flex-start",
                        flex: "70%",
                        paddingLeft: "0.5%",
                        marginBottom: "5rem",
                    }}>
                        {
                            blog.length === 0 ? <>
                                <div
                                    style={{
                                        paddingLeft: "41%",
                                        paddingTop: "20%"
                                    }}
                                >페이지 로딩 중입니다...(약 3-5초 소요)</div><div style={{
                                    paddingLeft: "41%",
                                }}>오래 걸릴 경우 새로고침 부탁드립니다.</div></> :
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
                        flex: "15%",
                        margin: "0 10px 0 0"
                    }}>
                        <RealTimeChat />
                        <GuestBook />
                    </div>
                </div>
            </div >
        </>
    );
}

export default AdminBlog;