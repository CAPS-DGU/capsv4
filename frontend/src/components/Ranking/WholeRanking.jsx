import React from 'react';
import RankingList from './RankingList';

const WholeRanking = () => {
  const rankingData = [
    { name: '길동', message: "", posts: 10, comments: 20, point: 3000 },
    { name: '순신', message: "", posts: 1, comments: 2, point: 2000 },
    { name: '감찬', message: "", posts: 1, comments: 2, point: 1000 },
    { name: '관순', message: "안녕", posts: 1, comments: 2, point: 1000 },
    { name: '유신', message: "안녕하세요", posts: 1, comments: 2, point: 1000 },

  ];
  return (
    <RankingList data={rankingData} />
  );
};

export default WholeRanking;
