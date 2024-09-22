import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPage = () => {
  const { board_id, post_id } = useParams();  // 경로 파라미터에서 board_id와 post_id 추출
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log(`Fetching post with board_id: ${board_id}, post_id: ${post_id}`);  // 디버깅용 로그

        const token = localStorage.getItem("accessToken");  // 토큰을 localStorage에서 가져옴
        if (!token) {
          console.error("토큰이 없습니다. 로그인을 해야 합니다.");
          return;
        }

        const response = await axios.get(`/api/board/${board_id}/post/${post_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Authorization 헤더에 토큰 추가
          },
        });

        console.log(response);
        setPost(response.data.data);  // 게시물 데이터 저장
        

      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();  // 게시물 데이터 불러오기
  }, [board_id, post_id]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!post) {
    return <p>게시물을 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <h1>{post.title ?? ""}</h1>
      <p>{post.content ?? ""}</p>
    </div>
  );
};

export default ViewPage;
