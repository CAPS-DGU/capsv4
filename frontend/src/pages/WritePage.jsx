import React from 'react';
import TextEditor from '../components/BoardWrite/TextEditor';

const WritePage = () => {
    return (
        <div className="flex items-center flex-col justify-center min-h-screen bg-gray-200 p-2">
            <h1 className="text-4xl m-4 text-gray-700">글 쓰기</h1>
            <TextEditor />
        </div>
    );
};

export default WritePage;
