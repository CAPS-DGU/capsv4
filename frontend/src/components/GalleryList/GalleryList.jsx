import React, { useState } from 'react';

const GalleryImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="object-cover w-full h-48 sm:h-64 lg:h-72"
  />
);

const GalleryInfo = ({ title, author, date, comments, onClick }) => (
  <div>
    <li className="font-normal list-none">
        {title} [{comments}]
    </li>
    <li className="text-sm list-none">
      <div>{author}</div>
      <div>{date}</div>
    </li>
  </div>
);

const GalleryPost = ({ post, onTitleClick }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  const handleDetailClick = () => {
    window.location.href = `/post/${post.id}`;
  };

  return (
    <div
      key={post.id}
      className="relative group border rounded-lg overflow-hidden shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GalleryImage src={post.imageSrc} alt={post.title} />
      <ul className="list-disc pl-5 absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-50 text-white">
        <GalleryInfo
          title={post.title} 
          author={post.author} 
          date={post.date} 
          comments={post.comments} 
          onClick={onTitleClick} 
        />
      </ul>
      {showDetails && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
          <div className="text-center mb-4">
            <p>❤️: {post.likes}</p>
            <p>조회수: {post.views}</p>
          </div>
          <button
            onClick={handleDetailClick}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white"
          >
            자세히 보기
          </button>
        </div>
      )}
    </div>
  );
};

const GalleryList = ({ posts }) => {
  const handleTitleClick = () => {
    window.location.href = "";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
      {posts.map(post => (
        <GalleryPost key={post.id} post={post} onTitleClick={handleTitleClick} />
      ))}
    </div>
  );
};

export default GalleryList;
