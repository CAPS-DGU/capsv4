import React, { useEffect, useState } from 'react';
import EventsList from '../components/Event/EventList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const EventPage = () => {
    const navigate = useNavigate();
    let accessToken = localStorage.getItem("accessToken");
    const [events, setEvents] = useState([]); // 이벤트 목록
    const [page, setPage] = useState(0); // 현재 페이지 번호
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수, 초기값을 0으로 설정

    const handleCreationClick = () => {
        navigate('/event/create');
    }
    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken");

        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/event?page=${page}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                console.log(response.data); // 응답 데이터 확인
                setEvents(response.data.data); // 스터디 목록 설정

            } catch (error) {
                console.error('Error fetching study data:', error);
                alert("잘못된 접근입니다.")
                localStorage.clear();
                window.location.href = '/login';
            }
        };
        if (page >= 0)
            fetchData();
    }, [page, accessToken]);
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    return (
        <div className="p-4">
            <div className="flex flex-col items-center mb-4">
                <h1 className="mb-4 text-3xl font-bold">이벤트 목록</h1>
                <button
                    onClick={handleCreationClick}
                    className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800">
                    이벤트 만들기
                </button>
            </div>
            <EventsList events={events} />
            {/* 페이지네이션 버튼 */}
            {totalPages > 0 ? (
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index)}
                            className={`px-4 py-2 rounded ${page === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="mt-6 text-center text-gray-500">

                </div>
            )}
        </div>
    );
};

export default EventPage;
