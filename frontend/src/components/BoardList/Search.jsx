import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const SearchForm = ({ onSearch }) => {
    const [category, setCategory] = useState('all');
    const [query, setQuery] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(category, query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex text-xs items-center justify-start p-4 bg-gray-100 rounded-md shadow-md">
            {/* 카테고리 선택 */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
                <option value="all">제목+내용</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="comment">댓글</option>
                <option value="writer">작성자</option>
            </select>

            {/* 검색 인풋 필드 */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="ml-4 p-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            {/* 검색 버튼 */}
            <button
                type="submit"
                className="ml-4 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
                검색
            </button>

            {/* 글쓰기 버튼 */}
            <Link
                type="button"
                className="ml-auto p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                to='/write'>
                글쓰기
            </Link>
        </form >
    );
};

export default SearchForm;
