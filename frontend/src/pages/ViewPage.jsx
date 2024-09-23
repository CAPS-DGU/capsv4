import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPage = () => {
  const { boardId } = useParams(); // boardId 파라미터를 가져옴
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken'); // access token 가져오기
        const intBoardId = parseInt(boardId, 10); // boardId를 정수로 변환

        if (!accessToken) {
          throw new Error('로그인이 필요합니다.');
        }

        const response = await axios.get(`/api/board/${intBoardId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${accessToken}`, // 토큰
          },
        });

        setPost(response.data); // 게시물 데이터 설정
      } catch (error) {
        console.error("게시물 조회 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [boardId]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {loading ? (
        <p>로딩 중...</p>
      ) : post ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">게시물을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default ViewPage;
