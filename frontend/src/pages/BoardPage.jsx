import React, { useState, useEffect } from "react";
import BoardList from "../components/BoardList/List";
import Search from "../components/BoardList/Search";
import { useParams } from "react-router-dom";
import axios from "axios";

const board_list = [
  "전체 게시판",
  "자유 게시판",
  "공모전 및 대회",
  "건의사항",
  "장부",
  "회의록",
  "(구)게시판",
];

const BoardPage = () => {
  const { board_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const validBoardId = parseInt(board_id) || 0;

        const response = await axios.get(`/api/board/${board_id}`, {
          params: {
            category: board_id || 0, // 카테고리별로 게시글 불러오기, 없으면 전체 게시판(0)
          },
        });
        setPosts(response.data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [board_id]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl m-4 text-gray-500 text-center">
          {board_id ? board_list[parseInt(board_id)] : board_list[0]}
        </h1>

        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <>
            <BoardList posts={posts} />
            <Search />
          </>
        )}
      </div>
    </div>
  );
};

export default BoardPage;
