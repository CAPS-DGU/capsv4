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
      className="relative overflow-hidden border rounded-lg shadow-md group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GalleryImage src={post.imageSrc} alt={post.title} />
      <ul className="absolute bottom-0 left-0 w-full p-2 pl-5 text-white list-disc bg-black bg-opacity-50">
        <GalleryInfo
          title={post.title}
          author={post.author}
          date={post.date}
          comments={post.comments}
          onClick={onTitleClick}
        />
      </ul>
      {showDetails && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-70">
          <div className="mb-4 text-center">
            <p>❤️: {post.likes}</p>
            <p>조회수: {post.views}</p>
          </div>
          <button
            onClick={handleDetailClick}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
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