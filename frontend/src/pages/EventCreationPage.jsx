import React, { useEffect, useState } from 'react';
import EventForm from '../components/Event/EventForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventCreationPage = (flag) => {
    const [initialData, setinitialData] = useState({})
    const { eventId } = useParams();
    let accessToken = localStorage.getItem("accessToken");

    const handleEventSubmit = (eventData) => {
        // 여기서 서버로 이벤트 데이터를 전송하거나 상태를 업데이트하는 등의 작업을 수행할 수 있습니다.
        console.log('생성된 이벤트 데이터:', eventData);
    };
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
                setinitialData(response.data.data); // 스터디 목록 설정

            } catch (error) {
                if (error.response.status === 403) {
                    alert("권한이 없습니다.");
                    window.location.href = '/event';
                }
                console.error('Error fetching study data:', error);
            }
        };
        if (flag) {

            fetchData();
        }
    }, [eventId])
    console.log(initialData); //
    return (
        <div className="flex items-center justify-center w-full min-h-screen p-4 bg-gray-100">
            <EventForm eventId={eventId} initialData={initialData} onSubmit={handleEventSubmit} />
        </div>
    );
};

export default EventCreationPage;
