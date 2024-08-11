import React, { useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const TextEditor = ({ onSubmit }) => {
    const [category, setCategory] = useState('general');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const editorRef = React.createRef();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const editorInstance = editorRef.current.getInstance();
        const content = editorInstance.getMarkdown();

        const formData = new FormData();
        formData.append('category', category);
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl justify-center flex flex-col space-y-4 p-4 bg-gray-100 rounded-md shadow-md">
            {/* 카테고리 선택 */}
            <div>
                <label className="block text-sm font-medium text-gray-700">분류</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    <option value="general">자유게시판</option>
                    <option value="news">공모전 및 대회</option>
                    <option value="sports">건의사항</option>
                    <option value="entertainment">장부</option>
                    <option value="table">회의록</option>
                </select>
            </div>

            {/* 제목 입력 */}
            <div>
                <label className="block text-sm font-medium text-gray-700">제목</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="제목을 입력하세요"
                />
            </div>

            {/* 내용 입력 (Toast UI Editor) */}
            <div>
                <label className="block text-sm font-medium text-gray-700">내용</label>
                <Editor
                    ref={editorRef}
                    initialEditType="markdown"
                    previewStyle="vertical"
                    height="400px"
                    initialValue="내용을 입력하세요"
                    useCommandShortcut={true}
                />
            </div>


            {/* 등록 버튼 */}
            <button
                type="submit"
                className="self-end mt-4 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
                등록
            </button>
        </form>
    );
};

export default TextEditor;
