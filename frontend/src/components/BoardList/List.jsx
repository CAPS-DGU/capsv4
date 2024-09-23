import React from "react";
import { Link } from "react-router-dom";

// 카테고리 매핑
const categoryNames = {
  0: "전체",
  1: "공지사항",
  2: "자유게시판",
  3: "건의사항",
  4: "자료실",
  5: "공모전 및 대회",
  10: "회의록",
  11: "장부",
  12: "전시회 회의록 (구)",
};

function PostItem({ id, title, category, author, time, hit, comments }) {
  return (
    <Link to={`/board/${id}`} className="text-gray-800 hover:bg-gray-100">
      <li className="grid grid-cols-7 items-center border-b border-gray-200 py-2 text-sm cursor-pointer">
        {/* 게시판 분류 표시 */}
        <div className="text-center text-gray-500">{categoryNames[category]}</div>
        <div className="col-span-3">
          {/* 게시물 제목 */}
          <span className="hover:text-blue-500 hover:underline">
            {title}
          </span>
          {comments > 0 && (
            <span className="ml-2 text-xs text-red-500">[{comments}]</span>
          )}
        </div>
        <div className="text-center text-gray-500">
          {author.grade}기 {author.name}
        </div>
        <div className="text-center text-gray-500">{time}</div>
        <div className="text-center text-gray-500">{hit}</div>
      </li>
    </Link>
  );
}

function BoardList({ posts }) {
  return (
    <div className="m-4 max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <ul className="divide-y divide-gray-200">
        <li className="grid grid-cols-7 items-center py-2 text-sm font-bold text-gray-700">
          <div className="text-center">분류</div>
          <div className="col-span-3">제목</div>
          <div className="text-center">작성자</div>
          <div className="text-center">날짜</div>
          <div className="text-center">조회수</div>
        </li>
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <PostItem
              key={index}
              id={post.id}  // 게시물 ID
              title={post.title}  // 게시물 제목
              category={post.category}  // 카테고리 전달
              author={post.writer}  // 작성자 정보
              time={post.time}  // 게시물 작성 시간
              hit={post.hit}  // 조회수
              comments={post.comment}  // 댓글 수
            />
          ))
        ) : (
          <p className="text-center text-gray-500">게시글이 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default BoardList;
