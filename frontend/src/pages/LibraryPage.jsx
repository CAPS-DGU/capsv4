import React, { useState } from 'react';
import Search from '../components/LibraryList/Search.jsx';
import BookTable from '../components/LibraryList/List.jsx';

const booksData = [
  {
    title: "(1)엔지니어를 위한 글쓰기 및 프리젠테이션",
    author: "박준영 외",
    publisher: "교보문고",
    category: "글쓰기",
    bookNumber: "WR001",
    availability: "대여 가능"
  },
  {
    title: "(2)엔지니어를 위한 글쓰기 및 프리젠테이션",
    author: "박준영 외",
    publisher: "교보문고",
    category: "글쓰기",
    bookNumber: "WR002",
    availability: "대여 불가"
  },
];

const LibraryPage = () => {
  const [books, setBooks] = useState(booksData);
  const [filteredBooks, setFilteredBooks] = useState(booksData);

  const handleSearch = (category, query) => {
    const lowercasedQuery = query.toLowerCase();

    const filtered = books.filter(book => {
      if (category === 'all') {
        return (
          book.title.toLowerCase().includes(lowercasedQuery) ||
          book.author.toLowerCase().includes(lowercasedQuery) ||
          book.publisher.toLowerCase().includes(lowercasedQuery) ||
          book.category.toLowerCase().includes(lowercasedQuery)
        );
      } else if (category === 'title') {
        return book.title.toLowerCase().includes(lowercasedQuery);
      } else if (category === 'author') {
        return book.author.toLowerCase().includes(lowercasedQuery);
      } else if (category === 'publisher') {
        return book.publisher.toLowerCase().includes(lowercasedQuery);
      } else if (category === 'category') {
        return book.category.toLowerCase().includes(lowercasedQuery);
      } else {
        return false;
      }
    });

    setFilteredBooks(filtered);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-4xl'>
        <h1 className="m-4 text-2xl text-center text-gray-500">CAPS 도서관</h1>
        <BookTable books={filteredBooks} />
        <Search onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default LibraryPage;
