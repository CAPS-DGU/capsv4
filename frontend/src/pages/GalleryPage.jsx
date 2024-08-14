import React, { useState } from 'react';
import GalleryList from '../components/GalleryList/GalleryList';

const placeholderData = [
  {
    "id": 110,
    "writer": {
      "id": 10,
      "grade": 38,
      "name": "홍길동"
    },
    "isDeleted": 0,
    "isModified": 0,
    "category": 3,
    "title": "안녕하세요.",
    "time": "2024-08-07 16:20:32",
    "hit": 37,
    "content": "오늘부터 ...",
    "like": 6,
    "comment": [
      {
        "id": 37,
        "userId": 112,
        "isDeleted": 0,
        "targetId": 0,
        "content": "좋아요!",
        "time": "2024-08-07 15:52:37"
      },
      {
        "id": 38,
        "userId": 113,
        "isDeleted": 0,
        "targetId": 37,
        "content": "저도 좋아요!",
        "time": "2024-08-07 15:54:23"
      }
    ],
    "files": [
      {
        "fileId": 232,
        "name": "회의록.hwp"
      },
      {
        "fileId": 233,
        "name": "장부.xlsx"
      }
    ]
  }, {
    "id": 110,
    "writer": {
      "id": 10,
      "grade": 38,
      "name": "홍길동"
    },
    "isDeleted": 0,
    "isModified": 0,
    "category": 3,
    "title": "안녕하세요.",
    "time": "2024-08-07 16:20:32",
    "hit": 37,
    "content": "오늘부터 ...",
    "like": 6,
    "comment": [
      {
        "id": 37,
        "userId": 112,
        "isDeleted": 0,
        "targetId": 0,
        "content": "좋아요!",
        "time": "2024-08-07 15:52:37"
      },
      {
        "id": 38,
        "userId": 113,
        "isDeleted": 0,
        "targetId": 37,
        "content": "저도 좋아요!",
        "time": "2024-08-07 15:54:23"
      }
    ],
    "files": [
      {
        "fileId": 232,
        "name": "회의록.hwp"
      },
      {
        "fileId": 233,
        "name": "장부.xlsx"
      }
    ]
  }
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
        <button onClick={handleBackClick} className="px-4 py-2 mb-4 bg-gray-300">
          뒤로가기
        </button>
        <h1 className="mb-4 text-2xl font-bold">{selectedPost.title}</h1>
        <img src={selectedPost.imageSrc} alt={selectedPost.title} className="object-cover w-full h-64 mb-4" />
        <p>{selectedPost.details}</p>
        <p>❤️ {selectedPost.likes}</p>
      </div>
    );
  }
}

export default GalleryPage;
