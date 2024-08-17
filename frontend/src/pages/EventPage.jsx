import React from 'react';
import EventsList from '../components/Event/EventList';

const eventsData = [
    {
        "id": 23,
        "writer": {
            "id": 10,
            "grade": 38,
            "name": "홍길동"
        },
        "type": "QUIZ",
        "title": "홍길동배 깜짝 퀴즈",
        "startDate": "2024-08-08 16:00:00",
        "endDate": "2024-08-08 23:59:59",
        "maxParticipant": 40,
        "description": "내 기수를 맞춰봐 ~ (기 제외)",
        "quiz": {
            "question": "나의 기수는?",
            "correctAnswer": "38"
        },

    },
    {
        "id": 24,
        "writer": {
            "id": 10,
            "grade": 38,
            "name": "홍길동"
        },
        "type": "SNACK",
        "title": "2024학년도 2학기 중간고사 간식행사",
        "startDate": "2024-08-08 16:00:00",
        "endDate": "2024-08-08 23:59:59",
        "maxParticipant": 40,
        "description": "2024학년도 2학기 중간고사 간식행사를 ...",
        "quiz": {
            "question": "",
            "correctAnswer": ""
        }
    }

    // 다른 이벤트 객체들을 추가할 수 있습니다.
];
const EventPage = () => {
    return (
        <div className="p-4">
            <h1 className="mb-6 text-2xl font-bold text-center">이벤트 목록</h1>
            <EventsList events={eventsData} />
        </div>
    );
};

export default EventPage;