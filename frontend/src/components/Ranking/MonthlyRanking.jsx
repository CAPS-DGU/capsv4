import React from 'react';
import RankingList from './RankingList';

const MonthlyRanking = () => {
  const rankingData = [
    { name: '홍길동', message: "통신값 다 평문이던데 다른건 몰라도 로그인만이라도 암호화를 해야할 것 같아요. 플젝으로 진행하고 잘 정리해놓으면 전시회에도 출품하고, 취업시에도 괜찮은 스펙이 될것같아요. kennyk@kakao.com", posts: 1, comments: 2, point: 300 },
    { name: '이순신', message: "천재개발자 ★ 가 되고싶다 T^T", posts: 1, comments: 2, point: 8000 },
    { name: '강감찬', message: ": )", posts: 1, comments: 2, point: 3000 },
    { name: '유관순', message: "", posts: 1, comments: 2, point: 5000 },
    { name: '김유신', message: "", posts: 1, comments: 2, point: 1000 },

  ];
  return (
    <RankingList data={rankingData} />
  );
};

export default MonthlyRanking;
