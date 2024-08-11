import React from 'react';
import BoardList from '../components/BoardList/List';
import Search from '../components/BoardList/Search';
// board별 구분 필요
const BoardPage = () => {
    return (
        <div className='flex flex-col items-center'>
            <div className='w-full max-w-4xl'>
                <h1 className="text-2xl m-4 text-gray-500 text-center">{"자유"}게시판</h1>
                <BoardList />
                <Search />
            </div>
        </div>
    );
};

export default BoardPage;
