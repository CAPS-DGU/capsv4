import React, { useEffect, useState } from 'react';
import EventDetail from '../components/Event/EventDetail';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
        "startDate": "2024-08-17 16:00:00",
        "endDate": "2024-08-18 23:59:59",
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
        "startDate": "2024-08-18 16:00:00",
        "endDate": "2024-08-18 23:59:59",
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

    const { eventId } = useParams();
    const [eventsData, setEventsData] = useState(); // 스터디 목록
    let accessToken = localStorage.getItem("accessToken");
    useEffect(() => {
        const fetchData = async () => {


            try {
                const response = await axios.get(`/api/event/${eventId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                console.log(response.data); // 응답 데이터 확인
                setEventsData(response.data.data); // 스터디 목록 설정

            } catch (error) {
                if (error.response.status == 403) {
                    alert("로그인을 하세요.")
                    window.location.href = '/login'
                }
                console.error('Error fetching study data:', error);
            }
        };
        if (eventId) {
            fetchData();
        }
        else {
        }
    }, [eventId, accessToken]);
    return (
        <div className="p-4">
            {eventsData ? <EventDetail events={eventsData} /> : <div>로딩중...</div>}
        </div>
    );
};

export default EventPage;