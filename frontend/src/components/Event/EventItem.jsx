import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpiner';

const EventItem = ({ event }) => {
    const { title, startDate, maxParticipants, description, type } = event;
    const navigate = useNavigate();
    let accessToken = localStorage.getItem("accessToken");
    const [player, setPlayer] = useState(0);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const handleClick = () => {
        navigate(`/event/${event.id}`); // 상세 페이지로 이동
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/event/${event.id}/participants`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                setPlayer(response.data.data.length);
                setLoading(false); // 로딩 완료
            }
            catch (error) {
                setLoading(false); // 에러 발생 시에도 로딩 상태 해제
                throw error;
            }
        };
        if (event) fetchData();
    }, []);

    // type에 따른 이모지 설정
    const getEmoji = (type) => {
        switch (type) {
            case "SNACK":
                return "🍪"; // 스낵 관련 이모지
            case "QUIZ":
                return "❓"; // 퀴즈 관련 이모지
            default:
                return "📅"; // 기본 이모지
        };
    };

    // 로딩중일 때 화면에 표시
    if (loading) {
        return <LoadingSpinner />;

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
                    <strong>시작 : </strong> {new Date(startDate).toLocaleString()}
                </p>
                <p className="text-gray-600">
                    <strong>정원 : </strong> {player}/{maxParticipants}명
                </p>
                <p className="text-gray-700">{description}</p>
            </div>
        </div>
    );
};

export default EventItem;
