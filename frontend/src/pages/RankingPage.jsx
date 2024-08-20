import React, { useState } from 'react';
import WholeRanking from '../components/Ranking/WholeRanking';
import MonthlyRanking from '../components/Ranking/MonthlyRanking';

const RankingPage = () => {
  const [selectedRanking, setSelectedRanking] = useState('whole');

  const handleRankingChange = (rankingType) => {
    setSelectedRanking(rankingType);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-4xl'>
        <h1 className="text-2xl m-4 text-gray-500 text-center">CAPS 활동 랭킹</h1>
        <div className="flex justify-center my-4">
          <button
            onClick={() => handleRankingChange('whole')}
            className={`mx-2 py-2 px-4 rounded ${selectedRanking === 'whole' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            전체 랭킹
          </button>
          <button
            onClick={() => handleRankingChange('monthly')}
            className={`mx-2 py-2 px-4 rounded ${selectedRanking === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            월별 랭킹
          </button>
        </div>
        <div className='mt-6'>
          {selectedRanking === 'whole' && <WholeRanking />}
          {selectedRanking === 'monthly' && <MonthlyRanking />}
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
