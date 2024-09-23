import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BoardList from "../components/BoardList/List"; // 게시물 목록 컴포넌트
import SearchForm from "../components/BoardList/Search"; // 검색 폼 컴포넌트
import axios from "axios";

const board_list = [
  "전체 게시판",      // 0
  "공지사항",         // 1
  "자유게시판",           // 2
  "건의사항",         // 3
  "자료실",           // 4
  "공모전 및 대회",    // 5
  null,               // 6 - 비어 있는 인덱스 (필요 시 추가)
  null,               // 7 - 비어 있는 인덱스 (필요 시 추가)
  null,               // 8 - 비어 있는 인덱스 (필요 시 추가)
  null,               // 9 - 비어 있는 인덱스 (필요 시 추가)
  "회의록",           // 10
  "장부",             // 11
  "전시회 회의록 (구)", // 12
];

const BoardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || 0; // 카테고리 값이 없으면 0 (전체 게시판)
  const search = searchParams.get("search") || ""; // 검색어 값

  // 검색 핸들러 (해당 카테고리 내에서만 검색)
  const handleSearch = (searchQuery) => {
    navigate(`/board/?category=${category}&search=${searchQuery}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = { category };

        if (search) {
          params.search = search;
        }

        const response = await axios.get(`/api/board`, { params });
        setPosts(response.data.data); // 게시물 목록 저장
      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchPosts();
  }, [category, search]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl m-4 text-gray-500 text-center">
          {board_list[parseInt(category)] || "알 수 없는 카테고리"}
        </h1>

        {loading ? (
          <p>로딩 중...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">게시물이 없습니다.</p>
        ) : (
          <BoardList posts={posts} /> // 게시물 목록
        )}

        {/* 검색 기능을 하단으로 이동 */}
        <SearchForm onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default BoardPage;
