import React from "react";

function PostItem({ id, title, author, time, hit, comments }) {
  return (
    <li className="grid grid-cols-7 items-center border-b border-gray-200 py-2 text-sm">
      <div className="text-center text-gray-500">{"자유"}</div>
      <div className="col-span-3">
        <a
          href={`/view/${id}`}
          className="text-gray-800 hover:text-blue-500 hover:underline"
        >
          {title}
        </a>
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
              id={post.id}
              title={post.title}
              author={post.writer}
              time={post.time}
              hit={post.hit}
              comments={post.comment}
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
