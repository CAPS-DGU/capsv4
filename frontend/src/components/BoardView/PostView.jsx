import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const PostView = ({ post, onCommentSubmit }) => {
    const {
        writer,
        isDeleted,
        isModified,
        category,
        title,
        time,
        hit,
        content,
        like,
        comment,
        files,
    } = post;

    const [newComment, setNewComment] = useState('');
    const [likes, setLikes] = useState(like);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        onCommentSubmit(newComment);
        setNewComment('');
    };

    const handleLikeClick = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md max-w-3xl mx-auto">
            {/* 제목과 작성자 정보 */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                <div className="text-sm text-gray-500">
                    <span>작성자: {writer.grade}기 {writer.name} </span> | <span>{time}</span> | <span>조회수: {hit}</span>
                </div>
                {isModified ? (
                    <div className="text-xs text-gray-400">(수정됨)</div>
                ) : null}
                {isDeleted ? (
                    <div className="text-xs text-red-500">(삭제됨)</div>
                ) : null}
            </div>

            {/* 본문 내용 */}
            <div className="mb-6">
                <p className="text-lg leading-relaxed">{content}</p>
            </div>

            {/* 첨부 파일 */}
            {files && files.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-semibold">첨부 파일:</h2>
                    <ul className="list-disc pl-5">
                        {files.map((file) => (
                            <li key={file.fileId}>
                                <a href={`/download/${file.fileId}`} className="text-blue-500 underline">
                                    {file.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 좋아요 버튼 */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleLikeClick}
                    className={`flex items-center space-x-2 p-2 rounded-md ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-gray-300`}
                >
                    <FaHeart className="text-lg" />
                    <span>{likes}</span>
                </button>
            </div>

            {/* 댓글 목록 */}
            {comment && comment.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">댓글:</h2>
                    <ul className="space-y-4">
                        {comment.map((c) => (
                            <li key={c.id} className="p-4 bg-gray-100 rounded-md">
                                <div className="text-sm text-gray-600">
                                    {c.isDeleted ? (
                                        <span className="text-red-500">(삭제된 댓글입니다)</span>
                                    ) : (
                                        <p>{c.content}</p>
                                    )}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {c.time}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 댓글 작성 */}
            <div className="mt-6">
                <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4">
                    <textarea
                        value={newComment}
                        onChange={handleCommentChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                        placeholder="댓글을 입력하세요"
                        rows={3}
                    />
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            onClick={() => { navigate(-1) }}
                        >
                            목록
                        </button>
                        <button
                            type="submit"
                            className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            댓글 작성
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostView;
