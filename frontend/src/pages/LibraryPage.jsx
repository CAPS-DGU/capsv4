import React, { useState } from 'react';

// 도서 임시 데이터
const booksData = [
  {
    title: "(1)엔지니어를 위한 글쓰기 및 프리젠테이션", 
    author: "박준영 외",
    publisher: "교보문고", 
    category: "WR 글쓰기", 
    bookNumber: "WR001",
    availability: "대여 가능" 
  },
  {
    title: "(2)엔지니어를 위한 글쓰기 및 프리젠테이션", 
    author: "박준영 외",
    publisher: "교보문고", 
    category: "WR 글쓰기", 
    bookNumber: "WR002",
    availability: "대여 가능" 
  },
];

const BookTable = () => {
  const [books, setBooks] = useState(booksData);

  return (
    <div className="container mx-auto p-6">
      <table className="w-full border-collapse border border-gray-300 mt-4 text-lg text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b">No.</th>
            <th className="px-4 py-2 border-b">제목</th>
            <th className="px-4 py-2 border-b">저자</th>
            <th className="px-4 py-2 border-b">출판사</th>
            <th className="px-4 py-2 border-b">도서 분류</th>
            <th className="px-4 py-2 border-b">도서 번호</th>
            <th className="px-4 py-2 border-b">대여 가능 여부</th> 
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{book.title}</td>
              <td className="px-4 py-2 border-b">{book.author}</td>
              <td className="px-4 py-2 border-b">{book.publisher}</td>
              <td className="px-4 py-2 border-b">{book.category}</td>
              <td className="px-4 py-2 border-b">{book.bookNumber}</td>
              <td className="px-4 py-2 border-b">{book.availability}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LibraryPage = () => {
  return (
    <div>
      <BookTable />
    </div>
  );
}

export default LibraryPage;
