import React from 'react';
import BoardList from '../components/BoardList/List';
import Search from '../components/BoardList/Search';
import { useParams } from 'react-router-dom';
// board별 구분 필요
const board_list = ["전체 게시판", "자유 게시판", "공모전 및 대회", "건의사항", "장부", "회의록", "(구)게시판"]
const BoardPage = () => {

    const Params = useParams();
    const board_id = Params.board_id;
    console.log(board_id);
    return (
        <div className='flex flex-col items-center'>
            <div className='w-full max-w-4xl'>
                <h1 className="text-2xl m-4 text-gray-500 text-center">{board_id ? board_list[board_id] : board_list[0]}</h1>
                <BoardList />
                <Search />
            </div>
        </div>
    );
};

export default BoardPage;
