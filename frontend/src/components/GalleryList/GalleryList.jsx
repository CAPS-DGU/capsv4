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
          className="relative group border rounded-lg overflow-hidden shadow-md"
        >
          <img
            src={post.imageSrc}
            alt={post.title}
            className="object-cover w-full h-48 sm:h-64 lg:h-72"  // 반응형 높이
          />
          <ul className="list-disc pl-5 absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-50 text-white">
            <li className="font-normal list-none">
              <a href="#" onClick={handleTitleClick} className="cursor-pointer">
                {post.title}
              </a>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GalleryList;
