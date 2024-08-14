import React from 'react';

const GalleryList = ({ posts }) => {
  const handleTitleClick = () => {
    window.location.href = "";
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
      {posts.map(post => (
        <div
          key={post.id}
          className="relative overflow-hidden border rounded-lg shadow-md group"
        >
          <img
            src={post.files[0].name}
            alt={post.files[0].name}
            className="object-cover w-full h-48 sm:h-64 lg:h-72"  // 반응형 높이
          />
          <ul className="absolute bottom-0 left-0 w-full p-2 pl-5 text-white list-disc bg-black bg-opacity-50">
            <li className="font-normal list-none">
              <a href="#" onClick={handleTitleClick} className="cursor-pointer">
                {post.title}
              </a>
              <div></div><a href="#" onClick={handleTitleClick} className="cursor-pointer ">
                {post.writer.grade}기 {post.writer.name}
              </a>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GalleryList;
