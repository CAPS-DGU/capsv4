import React, { useState, useEffect } from 'react';
import BoardList from '../components/BoardList/List';
import Search from '../components/BoardList/Search';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// board별 구분 필요
const board_list = ["전체 게시판", "자유 게시판", "공모전 및 대회", "건의사항", "장부", "회의록", "(구)게시판"]

// 게시글 카테고리
// 1 "공지사항"
// 2 "주저리"
// 3 "건의사항”
// 4 "자료실"
// 5 "공모전 및 대회”
// 10 회의록
// 11 장부
// 12 전시회 회의록
// (구) 게시글 → 별도 api 사용

const board_category = {
  0: "전체 게시판",
  1: "공지사항",
  2: "주저리",
  3: "건의사항",
  4: "자료실",
  5: "공모전 및 대회",
  10: "회의록",
  11: "장부",
  12: "전시회 회의록"
}

const BoardPage = () => {
  let accessToken = localStorage.getItem("accessToken");

  const { board_id } = useParams();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/board?category=${board_id}&page=${page}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          }
        });
        console.log(response.data);
        setPosts(response.data.data);
        setTotalPages(response.data.data[0]?.totalPages || 0);
      } catch (error) {
        console.error('Error fetching board data:', error);
      }
    };
    if (page >= 0) {
      fetchData();
    }
  }, [page]);

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-4xl'>
        <h1 className="text-2xl m-4 text-gray-500 text-center">{board_id ? board_category[board_id] : board_category[0]}</h1>
        <BoardList posts={posts} />
        <Search />
      </div>
    </div>
  );
};

export default BoardPage;
