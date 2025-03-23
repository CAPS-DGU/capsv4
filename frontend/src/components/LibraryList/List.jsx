import React from 'react';

const BookTable = ({ books }) => {
  return (
    <div className="m-4 max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <ul className="divide-y divide-gray-200">
        {/* 헤더 */}
        <li className="grid grid-cols-8 items-center py-2 text-sm font-bold text-gray-700">
          <div className="text-center">No.</div>
          <div className="col-span-2">제목</div>
          <div className="text-center">저자</div>
          <div className="text-center">출판사</div>
          <div className="text-center">도서 분류</div>
          <div className="text-center">도서 번호</div>
          <div className="text-center">대여 가능 여부</div>
        </li>

        {/* 도서 리스트 */}
        {books.map((book, index) => (
          <li key={index} className="grid grid-cols-8 items-center py-2 text-sm">
            <div className="text-center text-gray-500">{index + 1}</div>
            <div className="col-span-2">
              <a href="#" className="text-gray-800 hover:text-blue-500 hover:underline">
                {book.title}
              </a>
            </div>
            <div className="text-center text-gray-500">{book.author}</div>
            <div className="text-center text-gray-500">{book.publisher}</div>
            <div className="text-center text-gray-500">{book.category}</div>
            <div className="text-center text-gray-500">{book.bookNumber}</div>
            <div className="text-center text-gray-500">{book.availability}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookTable;
