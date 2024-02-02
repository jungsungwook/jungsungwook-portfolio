import { getApiUrl } from "@/utils/getApiUrl";
import axios, { Method } from 'axios';
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import { ImageResize } from "quill-image-resize-module-ts";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(
    () => import('./quill-editor'),
    { ssr: false }
);

const EditFrame = (props: {
    type: string
}) => {
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const handleImageChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                setSelectedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [title, setTitle] = useState<any>('');
    const titleChange = (e: any) => {
        setTitle(e.target.value);
    }

    const [tagItem, setTagItem] = useState<any>('');
    const [tagList, setTagList] = useState<Array<String>>([]);

    const onKeyPress = (e: any) => {
        if (e.target.value.length !== 0 && e.key === 'Enter') {
            submitTagItem();
        }
    }

    const submitTagItem = () => {
        let updatedTagList = [...tagList];
        updatedTagList.push(tagItem);
        setTagList(updatedTagList);
        setTagItem('');
    }

    const deleteTagItem = (e: any) => {
        const deleteTagItem = e.target.parentElement.firstChild.innerText;
        const filteredTagList = tagList.filter(tagItem => tagItem !== deleteTagItem);
        setTagList(filteredTagList);
    }

    const submitButton = async (e: any) => {
        const html = contents;
        const tags = tagList;
        const _title = title;
        const formData = new FormData();
        formData.append('content', contents);
        formData.append('subject', title);
        formData.append('tags', tags.join());

        if (selectedImage) {
            formData.append('image', selectedImage);
        }
        try {
            const response = await axios.post(getApiUrl('/blog'), formData);
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    const quillInstance = useRef<ReactQuill>(null);
    const [contents, setContents] = useState("");
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.addEventListener('change', async () => {
            if (input.files !== null) {
                const file = input.files[0];
                try {
                    const formData = new FormData();
                    formData.append('file', file);
                    const url = getApiUrl(`/admin/blog/image`);
                    const method: Method = "POST";
                    const response = await axios({
                        url,
                        method,
                        data: formData,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    const IMG_URL = response.data.message;
                    const range = quillInstance.current?.getEditor().getSelection();
                    if (range !== null && range !== undefined) {
                        const editor = quillInstance.current?.getEditor();
                        editor?.insertEmbed(range.index, 'image', IMG_URL);
                        const imageIndex = range.index + 1;
                        editor?.setSelection(imageIndex, 0);
                    }
                } catch (error) {
                    console.log("err--->", error);
                }
            }
        });
    }

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image'],
                    [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    ['clean']
                ],
                handlers: {
                    image: imageHandler
                }
            },
        }),
        [],
    );

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote','code-block',
        'list', 'bullet', 'indent',
        'link','image',
        'align', 'color', 'background',
        'clean',
    ]

    useEffect(() => {
        console.log(contents)
    }, [contents])

    return (
        <>
            <div className="upload-form">
                <form className="image-form">
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                </form>

                {selectedImage && (
                    <div>
                        <h3>썸네일 미리보기</h3>
                        <img
                            src={selectedImage}
                            alt="미리보기"
                            style={{ maxWidth: '50%', marginTop: '10px' }}
                        />
                    </div>
                )}
            </div>
            <input
                placeholder="제목을 입력해주세요."
                className="edit-title-input"
                onChange={titleChange}
                value={title}
                id="title" type="text">
            </input>
            <div className="tag-box">
                {tagList.map((tagItem, index) => {
                    return (
                        <div className="tag-item" key={index}>
                            <span>{tagItem}</span>
                            <button
                                className="tag-button"
                                onClick={deleteTagItem}>X</button>
                        </div>
                    )
                })}
                <input
                    className="tag-input"
                    type="text"
                    placeholder='태그를 입력해주세요.'
                    tabIndex={2}
                    onChange={e => setTagItem(e.target.value)}
                    value={tagItem}
                    onKeyPress={onKeyPress}
                />
            </div>
            <QuillEditor
                forwardedRef={quillInstance}
                value={contents}
                onChange={setContents}
                modules={modules}
                theme="snow"
                placeholder="내용을 입력해주세요."
                formats={formats}
            ></QuillEditor>
            <button
                className="edit-submit-button"
                onClick={submitButton}
            >
                제출
            </button>
        </>
    );
}

export default EditFrame;