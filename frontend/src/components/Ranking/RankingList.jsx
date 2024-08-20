import React from 'react';

import firstPlaceImg from '../../assets/iStock-1st.jpg';
import secondPlaceImg from '../../assets/iStock-2nd.jpg';
import thirdPlaceImg from '../../assets/iStock-3rd.jpg';

function RankingItem({ rank, name, message, posts, comments, point }) {

  const rankImages = {
    1: firstPlaceImg,
    2: secondPlaceImg,
    3: thirdPlaceImg,
  };

  return (
    <li className="grid grid-cols-6 items-center border-b border-gray-200 py-4 text-sm" style={{ gridTemplateColumns: "1fr 1fr 3fr 1fr 1fr 1fr" }}>
      <div className="text-center">
        {rank <= 3 ? (
          <img src={rankImages[rank]} alt={`${rank}위`} className="mx-auto h-8 w-8" />
        ) : (
          rank
        )}
      </div>
      <div className="text-center">{name}</div>
      <div className="text-left">{message}</div>
      <div className="text-center">{posts}</div>
      <div className="text-center">{comments}</div>
      <div className="text-center">{point}</div>
    </li>
  );
}

const RankingList = ({ data }) => {
  // 포인트 기준으로 내림차순 정렬
  const sortedData = [...data].sort((a, b) => b.point - a.point);

  return (
    <div className="m-4 max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <ul className="divide-y divide-gray-200">
        <li className="grid grid-cols-6 items-center py-4 text-sm font-bold text-gray-700" style={{ gridTemplateColumns: "1fr 1fr 3fr 1fr 1fr 1fr" }}>
          <div className="text-center">등수</div>
          <div className="text-center">이름</div>
          <div className="text-left">한 마디</div>
          <div className="text-center">게시물 수</div>
          <div className="text-center">댓글 수</div>
          <div className="text-center">포인트</div>
        </li>
        {sortedData.map((user, index) => (
          <RankingItem
            key={index}
            rank={index + 1} 
            name={user.name}
            message={user.message}
            posts={user.posts}
            comments={user.comments}
            point={user.point}
          />
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
