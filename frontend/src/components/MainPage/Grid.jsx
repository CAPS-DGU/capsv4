import React from 'react';

function Grid() {
    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
            {[...Array(5)].map((_, index) => {
                // For the item at (2,0), set row-span-2 to span across two rows
                if (index === 2) {
                    return (
                        <div
                            key={index}
                            className="h-full flex flex-col items-start justify-center p-4 text-lg font-semibold text-gray-700 row-span-2"
                        >
                            <h1 className="text-blue-500">갤러리</h1>
                            <ul className="list-disc pl-5">
                                <li className="font-normal list-none"><a href="">1번 게시글</a></li>
                            </ul>
                        </div>
                    );
                }

                return (
                    <div
                        key={index}
                        className="h-64 flex flex-col items-start justify-center p-4 text-lg font-semibold text-gray-700"
                    >
                        <h1 className="text-blue-500">게시판</h1>
                        <ul className="list-disc pl-5">
                            <li className="font-normal list-none"><a href="">1번 게시글</a></li>
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}

export default Grid;
