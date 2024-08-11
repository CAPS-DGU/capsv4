import React, { useState } from 'react';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };
    const closeDropdown = () => {
        setDropdownOpen(null);
    };

    return (
        <nav className="bg-black p-4" onMouseLeave={closeDropdown}>
            <div className="container mx-auto">
                {/* Logo */}
                <div className="flex justify-center">
                    <a href="/" className="block">
                        <img src="/src/assets/new-club-logo-white-small.png" alt="Logo" className="h-12 mx-auto" />
                    </a>
                </div>

                {/* Menu Items for Desktop */}
                <div className="hidden md:flex justify-center space-x-6 mt-4">
                    <div className="relative">
                        <a href="#" className="text-white hover:text-gray-400" onMouseOver={() => toggleDropdown(0)}>
                            ABOUT
                        </a>
                        {dropdownOpen === 0 && (
                            <div className="absolute mt-1 py-1 w-40 bg-white rounded-lg shadow-xl z-50">
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">CAPS 소개</a>
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">CAPS 연혁</a>
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">CAPS 회칙</a>
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">CAPS 집행부 소개</a>
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">CAPS 홈페이지 정보</a>

                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <a href="#" className="text-white hover:text-gray-400" onMouseOver={() => toggleDropdown(1)}>
                            STUDY
                        </a>
                        {dropdownOpen === 1 && (
                            <div className="absolute mt-2 py-2 w-40 bg-white rounded-lg shadow-xl z-50">
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">스터디 목록</a>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <a href="#" className="text-white hover:text-gray-400" onMouseOver={() => toggleDropdown(2)}>
                            FORUM
                        </a>
                        {dropdownOpen === 2 && (
                            <div className="absolute mt-2 py-2 w-40 bg-white rounded-lg shadow-xl z-50">
                                <a href="/board" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">전체 글 보기</a>
                                <hr />
                                <a href="/board" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">자유게시판</a>
                                <a href="/board" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">공모전 및 대회</a>
                                <hr />
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">건의사항</a>
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">장부</a>
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">회의록</a>
                                <hr />
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">(구) 게시판</a>


                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <a href="#" className="text-white hover:text-gray-400" onMouseOver={() => toggleDropdown(3)}>
                            UTIL
                        </a>
                        {dropdownOpen === 3 && (
                            <div className="absolute mt-2 py-2 w-40 bg-white rounded-lg shadow-xl z-50">
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">CAPS 도서관</a>
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">CAPS 활동 랭킹</a>
                                <a href="#" className="block text-xs px-4 py-2 text-gray-800 hover:bg-gray-200">오늘의 학식</a>
                            </div>
                        )}
                    </div>
                    <div className="relative" onMouseOver={closeDropdown}>
                        <a href="#" className="text-white hover:text-gray-400" onMouseOver={closeDropdown} >
                            GALLERY
                        </a>

                    </div>
                    <div className="relative">
                        <a href="#" className="text-white hover:text-gray-400">
                            WIKI
                        </a>

                    </div>
                    <div className="relative">
                        <a href="/login" className="text-white hover:text-gray-400" >
                            LOGIN
                        </a>

                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex justify-center mt-4">
                    <button className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
