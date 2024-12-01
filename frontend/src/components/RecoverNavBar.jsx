import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 관리
    const [profileName, setProfileName] = useState('');  // 프로필 이름 관리
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        // localStorage에서 로그인 상태 확인
        const token = localStorage.getItem('accessToken');
        const name = localStorage.getItem('profilename');

        if (token && name) {
            setIsLoggedIn(true);
            setProfileName(name);
        } else {
            setIsLoggedIn(false); // 토큰이 없으면 로그인 상태를 false로 설정
        }
    }, [location]);  // location을 의존성 배열에 추가
    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };
    const Logout = () => {
        localStorage.clear();
        setIsLoggedIn(false); // 로그인 상태를 false로 업데이트
        window.location.reload(); // 페이지를 새로고침
    };
    const closeDropdown = () => {
        setDropdownOpen(null);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleMobileDropdown = (index) => {
        setMobileDropdownOpen(mobileDropdownOpen === index ? null : index);
    };
    const login = () => {
        navigate('/login', { state: { from: location } });

    }
    return (
        <nav className="p-4 bg-black" >
            <div className="container mx-auto">
                {/* Logo */}
                <div className="flex justify-center">
                    <a href="/" className="block">
                        <img src="/new-club-logo-white-small.png" alt="Logo" className="h-12 mx-auto" />
                    </a>
                </div>

                {/* Menu Items for Desktop */}
                <div className="justify-center hidden mt-4 space-x-6 md:flex" >
                    <div className="relative">
                        <a href="/intro" className="text-white hover:text-gray-400" onMouseEnter={() => toggleDropdown(0)}>
                            ABOUT
                        </a>
                        {dropdownOpen === 0 && (
                            <div className="absolute z-50 w-40 py-1 mt-1 bg-white rounded-lg shadow-xl">
                                <a href="/intro" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 소개</a>
                                <a href="/history" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 연혁</a>
                                <a href="/rule" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 회칙</a>
                                <a href="/executive" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 집행부 소개</a>
                                <a href="/homepage" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 홈페이지 정보</a>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <a href="/study" className="text-white hover:text-gray-400" onMouseEnter={() => toggleDropdown(1)}>
                            STUDY
                        </a>
                        {dropdownOpen === 1 && (
                            <div className="absolute z-50 w-40 py-2 mt-2 bg-white rounded-lg shadow-xl" >
                                <a href="/study" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">스터디 목록</a>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <a href="/board" className="text-white hover:text-gray-400" onMouseEnter={() => toggleDropdown(2)}>
                            FORUM
                        </a>
                        {dropdownOpen === 2 && (
                            <div className="absolute z-50 w-40 py-2 mt-2 bg-white rounded-lg shadow-xl" >
                                <a href="/board" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">전체 글 보기</a>
                                <hr />
                                <a href="/board/1" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">자유게시판</a>
                                <a href="/board/2" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">공모전 및 대회</a>
                                <hr />
                                <a href="/board/3" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">건의사항</a>
                                <a href="/board/4" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">장부</a>
                                <a href="/board/5" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">회의록</a>
                                <hr />
                                <a href="/board/6" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">(구) 게시판</a>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <a href="/library" className="text-white hover:text-gray-400" onMouseEnter={() => toggleDropdown(3)}>
                            UTIL
                        </a>
                        {dropdownOpen === 3 && (
                            <div className="absolute z-50 w-40 py-2 mt-2 bg-white rounded-lg shadow-xl">
                                <a href="/library" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 도서관</a>
                                <a href="/ranking" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 활동 랭킹</a>
                                <a href="#" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">오늘의 학식</a>

                            </div>
                        )}
                    </div>

                    <div className="relative" onMouseEnter={closeDropdown}>
                        <a href="/event" className="text-white hover:text-gray-400" onMouseEnter={closeDropdown} >
                            EVENT
                        </a>
                    </div><div className="relative" onMouseEnter={closeDropdown}>
                        <a href="/gallery" className="text-white hover:text-gray-400" onMouseEnter={closeDropdown} >
                            GALLERY
                        </a>
                    </div>
                    <div className="relative">
                        <a href="/wiki" className="text-white hover:text-gray-400">
                            WIKI
                        </a>
                    </div>

                    {/*로그인*/}
                    <div className="relative">
                        {isLoggedIn ? (
                            <a href="/mypage" className="text-white hover:text-gray-400" onMouseEnter={() => toggleDropdown(4)}>
                                {profileName}님 환영합니다!

                            </a>) : (
                            <a href='#' onClick={login} className="text-white hover:text-gray-400" >
                                LOGIN
                            </a>
                        )}
                        {dropdownOpen === 4 && (
                            <div className="absolute z-50 w-40 py-2 mt-2 bg-white rounded-lg shadow-xl">
                                <a href="#" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200" onClick={Logout}>LOGOUT</a>

                            </div>
                        )
                        }


                    </div>
                </div>


                {/* Mobile Menu Button */}
                <div className="flex justify-center mt-4 md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Items */}
                {mobileMenuOpen && (
                    <div className="flex flex-col items-center mt-4 space-y-2 md:hidden">
                        <div className="relative">
                            <button onClick={() => toggleMobileDropdown(0)} className="text-white hover:text-gray-400">ABOUT</button>
                            {mobileDropdownOpen === 0 && (
                                <div className="absolute z-50 w-40 py-1 mt-2 bg-white rounded-lg shadow-xl">
                                    <a href="/intro" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 소개</a>
                                    <a href="#" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 연혁</a>
                                    <a href="#" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 회칙</a>
                                    <a href="#" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 집행부 소개</a>
                                    <a href="#" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 홈페이지 정보</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button onClick={() => toggleMobileDropdown(1)} className="text-white hover:text-gray-400">STUDY</button>
                            {mobileDropdownOpen === 1 && (
                                <div className="absolute z-50 w-40 py-2 mt-2 bg-white rounded-lg shadow-xl">
                                    <a href="#" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">스터디 목록</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button onClick={() => toggleMobileDropdown(2)} className="text-white hover:text-gray-400">FORUM</button>
                            {mobileDropdownOpen === 2 && (
                                <div className="absolute z-50 w-40 py-2 mt-2 bg-white rounded-lg shadow-xl">
                                    <a href="/board" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">전체 글 보기</a>
                                    <hr />
                                    <a href="/board/1" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">자유게시판</a>
                                    <a href="/board/2" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">공모전 및 대회</a>
                                    <hr />
                                    <a href="/board/3" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">건의사항</a>
                                    <a href="/board/4" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">장부</a>
                                    <a href="/board/5" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">회의록</a>
                                    <hr />
                                    <a href="/board/6" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">(구) 게시판</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <a href="#" className="text-white hover:text-gray-400" onClick={() => toggleMobileDropdown(3)}>
                                UTIL
                            </a>
                            {mobileDropdownOpen === 3 && (
                                <div className="absolute z-50 w-40 py-2 mt-2 bg-white rounded-lg shadow-xl">
                                    <a href="#" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 도서관</a>
                                    <a href="#" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">CAPS 활동 랭킹</a>
                                    <a href="#" className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200">오늘의 학식</a>
                                </div>
                            )}
                        </div>
                        {/* Other mobile menu items... */}
                        <div className="relative" onMouseEnter={closeDropdown}>
                            <a href="#" className="text-white hover:text-gray-400">
                                EVENT
                            </a>
                        </div>
                        <div className="relative" onMouseEnter={closeDropdown}>
                            <a href="#" className="text-white hover:text-gray-400">
                                GALLERY
                            </a>
                        </div>
                        <div className="relative">
                            <a href="#" className="text-white hover:text-gray-400">
                                WIKI
                            </a>
                        </div>
                        <div className="relative">
                            {isLoggedIn ? (
                                <a href="/mypage" className="text-white hover:text-gray-400">
                                    {profileName}님 환영합니다!
                                </a>
                            ) : (
                                <a href="/login" className="text-white hover:text-gray-400">
                                    LOGIN
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
