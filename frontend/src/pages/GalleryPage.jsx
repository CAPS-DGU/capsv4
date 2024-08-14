import React, { useState } from 'react';
import GalleryList from '../components/GalleryList/GalleryList'; 

const placeholderData = [
  { id: 1, title: '1번 게시물', likes: 3, details: '상세 내용 1', imageSrc: '/1.png' },
  { id: 2, title: '2번 게시물', likes: 0, details: '상세 내용 2', imageSrc: '/2.png' },
  { id: 3, title: '3번 게시물', likes: 0, details: '상세 내용 3', imageSrc: '/3.png' },
  { id: 4, title: '4번 게시물', likes: 0, details: '상세 내용 4', imageSrc: '/4.png' },
  { id: 5, title: '5번 게시물', likes: 0, details: '상세 내용 5', imageSrc: '/5.png' },
  { id: 6, title: '6번 게시물', likes: 0, details: '상세 내용 6', imageSrc: '/6.png' },
];

const GalleryPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
    
  const handleDetailsClick = (id) => {
    const post = placeholderData.find((item) => item.id === id);
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <div className="p-4">
        <button onClick={handleBackClick} className="mb-4 bg-gray-300 px-4 py-2">
          뒤로가기
        </button>
        <h1 className="text-2xl font-bold mb-4">{selectedPost.title}</h1>
        <img src={selectedPost.imageSrc} alt={selectedPost.title} className="w-full h-64 object-cover mb-4" />
        <p>{selectedPost.details}</p>
        <p>❤️ {selectedPost.likes}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <GalleryList posts={placeholderData} />
    </div>
  );
};

export default GalleryPage;
