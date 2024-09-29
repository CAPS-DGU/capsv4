import React, { useState } from 'react';
import WholeRanking from '../components/Ranking/WholeRanking';
import MonthlyRanking from '../components/Ranking/MonthlyRanking';
import OldRanking from '../components/Ranking/OldRanking';

const RankingPage = () => {
  const [selectedRanking, setSelectedRanking] = useState('whole');

  const handleRankingChange = (rankingType) => {
    setSelectedRanking(rankingType);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-4xl'>
        <h1 className="m-4 text-2xl text-center text-gray-500">CAPS 활동 랭킹</h1>
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
          </button><button
            onClick={() => handleRankingChange('old')}
            className={`mx-2 py-2 px-4 rounded ${selectedRanking === 'old' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            (구) 전체 랭킹
          </button>
        </div>
        <div className='mt-6'>
          {selectedRanking === 'whole' && <WholeRanking />}
          {selectedRanking === 'monthly' && <MonthlyRanking />}
          {selectedRanking === 'old' && <OldRanking />}
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
