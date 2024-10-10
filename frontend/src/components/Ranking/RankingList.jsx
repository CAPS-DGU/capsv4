import React from 'react';

import firstPlaceImg from '../../assets/iStock-1st.jpg';
import secondPlaceImg from '../../assets/iStock-2nd.jpg';
import thirdPlaceImg from '../../assets/iStock-3rd.jpg';

function RankingItem({ rank, name, comment, postCount, commentCount, point }) {

  const rankImages = {
    1: firstPlaceImg,
    2: secondPlaceImg,
    3: thirdPlaceImg,
  };

  return (
    <li className="grid items-center grid-cols-6 py-4 text-sm border-b border-gray-200" style={{ gridTemplateColumns: "1fr 1fr 3fr 1fr 1fr 1fr" }}>
      <div className="text-center">
        {rank <= 3 ? (
          <img src={rankImages[rank]} alt={`${rank}위`} className="w-8 h-8 mx-auto" />
        ) : (
          rank
        )}
      </div>
      <div className="text-center">{name}</div>
      <div className="text-left">{comment}</div>
      <div className="text-center">{postCount}</div>
      <div className="text-center">{commentCount}</div>
      <div className="text-center">{point}</div>
    </li>
  );
}

const RankingList = ({ data }) => {
  // 포인트 기준으로 내림차순 정렬
  const sortedData = [...data].sort((a, b) => b.point - a.point);

  return (
    <div className="p-4 m-4 mx-auto bg-white rounded-lg shadow-md max-w-7xl">
      <ul className="divide-y divide-gray-200">
        <li className="grid items-center grid-cols-6 py-4 text-sm font-bold text-gray-700" style={{ gridTemplateColumns: "1fr 1fr 3fr 1fr 1fr 1fr" }}>
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
            comment={user.comment}
            postCount={user.postCount}
            commentCount={user.commentCount}
            point={user.point}
          />
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
