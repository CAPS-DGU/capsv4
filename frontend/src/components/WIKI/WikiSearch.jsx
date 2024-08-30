import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const WikiSearch = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (query.trim()) {
            navigate(`/wiki/${query.trim().replace(/ /g, '+')}`);
        }
    };

    const handleRandom = async () => {
        const response = await axios.get('/api/wiki/random')
        const randomTitle = (response.data.data.title);
        navigate(`/wiki/${randomTitle}`); // 랜덤 페이지로 이동
    };

    return (
        <form onSubmit={handleSearch} className="max-w-md mx-auto mt-6 mb-6">
            <div className="flex">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="검색어를 입력하세요..."
                    className="flex-grow px-4 py-2 text-gray-700 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent rounded-l-md"
                />
                <button
                    type="submit"
                    className="h-full px-6 py-2 text-white bg-gray-600 rounded-r-none hover:bg-gray-700 focus:outline-none"
                >
                    검색
                </button>
                <button
                    type="button"
                    onClick={handleRandom}
                    className="h-full px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-r-md"
                >
                    랜덤
                </button>
            </div>
        </form>
    );
};

export default WikiSearch;
