import React from 'react';
import GalleryList from '../components/GalleryList/GalleryList'; 

const GalleryData = [ //임시데이터
  { id: 1, title: '1번 게시물', author: '38기 작성자1', date: '2024-08-14', likes: 1, comments: 2, views: 45, imageSrc: '/src/assets/1.jpg' },
  { id: 2, title: '2번 게시물', author: '38기 작성자2', date: '2024-08-14', likes: 2, comments: 0 ,views: 45, imageSrc: '/src/assets/2.jpg' },
  { id: 3, title: '3번 게시물', author: '38기 작성자3', date: '2024-08-14', likes: 3, comments: 1, views: 45, imageSrc: '/src/assets/3.jpg' },
  { id: 4, title: '4번 게시물', author: '38기 작성자4', date: '2024-08-14', likes: 4, comments: 4, views: 45, imageSrc: '/src/assets/4.jpg' },
  { id: 5, title: '5번 게시물', author: '38기 작성자5', date: '2024-08-14', likes: 4, comments: 0, views: 45, imageSrc: '/src/assets/5.jpg' },
  { id: 6, title: '6번 게시물', author: '38기 작성자6', date: '2024-08-14', likes: 0, comments: 3, views: 45, imageSrc: '/src/assets/6.jpg' },
]

const GalleryPage = () => {
  return (
    <div className="p-4">
      <GalleryList posts={GalleryData} />
    </div>
  );
};

export default GalleryPage;
