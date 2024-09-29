import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventItem = ({ event }) => {
    const { title, startDate, maxParticipants, description, type } = event;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/event/${event.id}`); // 상세 페이지로 이동
    };

    // type에 따른 이모지 설정
    const getEmoji = (type) => {
        switch (type) {
            case "SNACK":
                return "🍪"; // 스낵 관련 이모지
            // 다른 타입에 대한 이모지를 추가할 수 있음
            case "QUIZ":
                return "❓"; // 퀴즈 관련 이모지
            // 다른 타입에 대한 이모지를 추가할 수 있음
            default:
                return "📅"; // 기본 이모지
        };
    }
    return (
        <div
            onClick={handleClick}
            className="flex items-center p-4 mb-4 transition-colors border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
        >
            <span className="mr-4 text-2xl">{getEmoji(type)}</span>
            <div>
                <h2 className="mb-1 text-xl font-bold">{title}</h2>
                <p className="text-gray-600">
                    <strong>시작:</strong> {new Date(startDate).toLocaleString()}
                </p>
                <p className="text-gray-600">
                    <strong>참가자 수 제한:</strong> {maxParticipants}명
                </p>
                <p className="text-gray-700">{description}</p>
            </div>
        </div>
    );
};

export default EventItem;
