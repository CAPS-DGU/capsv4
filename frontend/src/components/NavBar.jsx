import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [profileName, setProfileName] = useState(""); // 프로필 이름 관리
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // 프로필 드롭다운 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("profilename");

    if (token && name) {
      setIsLoggedIn(true);
      setProfileName(name);
    }
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen); // 프로필 클릭 시 드롭다운 토글
  };

  const handleLogout = () => {
    // 로그아웃 처리: 토큰 제거 및 로그인 상태 초기화
    localStorage.removeItem("accessToken");
    localStorage.removeItem("profilename");
    setIsLoggedIn(false);
    setProfileName("");
    setIsProfileDropdownOpen(false); // 드롭다운 닫기
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <nav className="p-4 bg-black">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <a href="/" className="block">
            <img
              src="/src/assets/new-club-logo-white-small.png"
              alt="Logo"
              className="h-12 mx-auto"
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="justify-center hidden mt-4 space-x-6 md:flex">
          <div className="relative">
            <a
              href="#"
              className="text-white hover:text-gray-400"
              onMouseEnter={() => toggleDropdown(0)}
              onClick={(e) => e.preventDefault()}  // 페이지 새로고침 방지
            >
              ABOUT
            </a>
            {dropdownOpen === 0 && (
              <div className="absolute z-50 w-40 py-1 mt-1 bg-white rounded-lg shadow-xl">
                <a
                  href="/intro"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  CAPS 소개
                </a>
                <a
                  href="/history"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  CAPS 연혁
                </a>
                <a
                  href="/rule"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  CAPS 회칙
                </a>
                <a
                  href="/executive"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  CAPS 집행부 소개
                </a>
                <a
                  href="/homepage"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  CAPS 홈페이지 정보
                </a>
              </div>
            )}
          </div>

          {/* Forum Section */}
          <div className="relative">
            <a
              href="#"
              className="text-white hover:text-gray-400"
              onMouseEnter={() => toggleDropdown(1)}
              onClick={(e) => e.preventDefault()}  // 페이지 새로고침 방지
            >
              FORUM
            </a>
            {dropdownOpen === 1 && (
              <div
                className="absolute z-50 w-40 py-2 mt-2 bg-white rounded-lg shadow-xl"
                onMouseLeave={closeDropdown}
              >
                <a
                  href="/board/"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  전체 글 보기
                </a>
                <hr />
                <a
                  href="/board/?category=1"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  공지사항
                </a>
                <a
                  href="/board/?category=2"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  자유게시판
                </a>
                <a
                  href="/board/?category=5"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  공모전 및 대회
                </a>
                <a
                  href="/board/?category=3"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  건의사항
                </a>
                <a
                  href="/board/?category=4"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  자료실
                </a>
                <a
                  href="/board/?category=10"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  회의록
                </a>
                <a
                  href="/board/?category=11"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  장부
                </a>
                <hr />
                <a
                  href="/board/?category=12"
                  className="block px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                >
                  전시회 회의록 (구)
                </a>
              </div>
            )}
          </div>

          {/* 기타 메뉴 */}
          <div className="relative" onMouseEnter={closeDropdown}>
            <a href="/event" className="text-white hover:text-gray-400">
              EVENT
            </a>
          </div>
          <div className="relative" onMouseEnter={closeDropdown}>
            <a href="/gallery" className="text-white hover:text-gray-400">
              GALLERY
            </a>
          </div>
          <div className="relative">
            <a href="/wiki" className="text-white hover:text-gray-400">
              WIKI
            </a>
          </div>

          {/* 프로필 및 로그인/로그아웃 */}
          <div className="relative">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="text-white hover:text-gray-400"
                >
                  {profileName}님 환영합니다!
                </button>

                {/* 프로필 드롭다운 */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className="text-white hover:text-gray-400">
                LOGIN
              </a>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex justify-center mt-4 md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="flex flex-col items-center mt-4 space-y-2 md:hidden">
            {/* 모바일 메뉴 */}
            <div className="relative">
              <a href="/board/" className="block text-white hover:text-gray-400">
                전체 글 보기
              </a>
              <a href="/board/?category=1" className="block text-white hover:text-gray-400">
                공지사항
              </a>
              <a href="/board/?category=2" className="block text-white hover:text-gray-400">
                자유게시판
              </a>
              <a href="/board/?category=3" className="block text-white hover:text-gray-400">
                공모전 및 대회
              </a>
              <a href="/board/?category=4" className="block text-white hover:text-gray-400">
                건의사항
              </a>
              <a href="/board/?category=5" className="block text-white hover:text-gray-400">
                장부
              </a>
              <a href="/board/?category=6" className="block text-white hover:text-gray-400">
                회의록
              </a>
              <a href="/board/?category=7" className="block text-white hover:text-gray-400">
                (구) 게시판
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
