import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = ({ events }) => {
    const { eventId } = useParams();
    const event = events.find((e) => e.id === parseInt(eventId));

    const [timeLeft, setTimeLeft] = useState({
        start: '',
        end: ''
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const startTime = new Date(event.startDate);
            const endTime = new Date(event.endDate);

            const timeToStart = startTime - now;
            const timeToEnd = endTime - now;

            const formatTime = (time) => {
                const days = Math.floor(time / (1000 * 60 * 60 * 24));
                const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((time / 1000 / 60) % 60);
                const seconds = Math.floor((time / 1000) % 60);
                return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
            };

            setTimeLeft({
                start: timeToStart > 0 ? formatTime(timeToStart) : '이미 시작됨',
                end: timeToEnd > 0 ? formatTime(timeToEnd) : '이미 종료됨'
            });
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 제거
    }, [event.startDate, event.endDate]);

    if (!event) {
        return <p>이벤트를 찾을 수 없습니다.</p>;
    }

    // type에 따른 이모지 설정
    const getEmoji = (type) => {
        switch (type) {
            case "SNACK":
                return "🍪"; // 스낵 관련 이모지
            case "QUIZ":
                return "❓"; // 퀴즈 관련 이모지
            // 다른 타입에 대한 이모지를 추가할 수 있음
            default:
                return "📅"; // 기본 이모지
        }
    };

    return (
        <div className="max-w-4xl p-6 mx-auto mt-8">
            <div className="mb-4 text-5xl">
                <span>{getEmoji(event.type)}</span>
            </div>
            <h1 className="mb-4 text-5xl font-extrabold text-gray-600">
                {event.title}
            </h1>

            <p className="mb-4 text-lg text-gray-700">
                <strong>작성자:</strong> {event.writer.name} (기수: {event.writer.grade})
            </p>

            <div className="mb-4 text-lg text-gray-600">
                <p><strong>시작 시간:</strong> {new Date(event.startDate).toLocaleString()}</p>
                <p><strong>시작까지:</strong> {timeLeft.start}</p>
                <p><strong>종료 시간:</strong> {new Date(event.endDate).toLocaleString()}</p>
                <p><strong>종료까지:</strong> {timeLeft.end}</p>
            </div>

            <p className="mb-8 text-lg leading-relaxed text-gray-700">
                {event.description}
            </p>

            {event.quiz && (
                <div className="mb-8">
                    <h2 className="mb-2 text-3xl font-semibold text-gray-500">퀴즈</h2>
                    <p className="mb-2 text-xl text-gray-800">
                        <strong>질문:</strong> {event.quiz.question}
                    </p>
                    <p className="text-xl text-gray-800">
                        <strong>정답:</strong> {event.quiz.correctAnswer}
                    </p>
                </div>
            )}

            <form onSubmit={(e) => {
                e.preventDefault();
                alert("신청이 완료되었습니다! 🎉");
            }} className="mb-8">
                <div className="mb-4">
                    <label className="block mb-2 text-xl font-bold text-gray-700">
                        이름
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="이름을 입력하세요"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-xl font-bold text-gray-700">
                        이메일
                    </label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="이메일을 입력하세요"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 text-lg font-bold text-white bg-gray-600 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    신청하기
                </button>
            </form>
        </div>
    );
};

export default EventDetail;
