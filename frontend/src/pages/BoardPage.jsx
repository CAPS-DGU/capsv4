import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BoardList from "../components/BoardList/List"; // 게시물 목록 컴포넌트
import axios from "axios";

const board_list = [
  "전체 게시판",
  "공지사항",
  "자유 게시판",
  "건의사항",
  "장부",
  "공모전 및 대회",
  "회의록",
  "(구)게시판",
];

const BoardPage = () => {
  const location = useLocation(); // 쿼리 파라미터에서 category 값을 가져옴
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || 0; // 카테고리 값이 없으면 0 (전체 게시판)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/board`, {
          params: { category }, // 쿼리 파라미터의 카테고리 값으로 필터링
        });

        setPosts(response.data.data); // 게시물 목록 저장
      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl m-4 text-gray-500 text-center">
          {board_list[parseInt(category)]}
        </h1>

        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <BoardList posts={posts} /> // 게시물 목록
        )}
      </div>
    </div>
  );
};

export default BoardPage;
