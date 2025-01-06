import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios 임포트

const EventForm = ({ eventId, onSubmit, initialData }) => {
    let accessToken = localStorage.getItem("accessToken");
    const [eventData, setEventData] = useState({
        type: "QUIZ",
        title: "",
        startDate: "",
        endDate: "",
        maxParticipants: 20,
        eventId: eventId,
        description: "",
        quiz: {
            question: "",
            correctAnswer: "",
        },
    });

    useEffect(() => {
        // 프롭에서 받은 초기 데이터가 있으면 eventData에 설정
        if (initialData && Object.keys(initialData).length > 0) {
            setEventData((prevData) => ({
                ...prevData,
                ...initialData,
                quiz: {
                    ...prevData.quiz,
                    ...initialData.quiz,
                },
            }));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleQuizChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            quiz: {
                ...prevData.quiz,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (Object.keys(initialData).length) {
                const response = await axios.patch(`/api/event`, eventData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ` + accessToken,
                    },
                });
                if (response.status === 200 || response.status === 204) {
                    alert("이벤트 수정이 완료되었습니다.");
                    window.location.href = '/event';
                }
            } else {
                const response = await axios.post('/api/event', eventData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ` + accessToken,
                    },
                });
                if (response.status === 201) {
                    alert("이벤트 생성이 완료되었습니다.");
                    window.location.href = '/event';
                }
            }
        } catch (error) {
            alert("이벤트 처리 실패");
            console.error('이벤트 처리 실패:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg"
        >
            {Object.keys(initialData).length ? <h2 className="mb-4 text-2xl font-bold">이벤트 수정하기</h2> : <h2 className="mb-4 text-2xl font-bold">이벤트 만들기</h2>}
            <div className="mb-4">
                <label className="block mb-2">타입</label>
                <select
                    name="type"
                    value={eventData.type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="SNACK">간식행사</option>
                    <option value="QUIZ">퀴즈</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">제목</label>
                <input
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">시작 날짜</label>
                <input
                    type="datetime-local"
                    name="startDate"
                    value={eventData.startDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">종료 날짜</label>
                <input
                    type="datetime-local"
                    name="endDate"
                    value={eventData.endDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">최대 참가자 수</label>
                <input
                    type="number"
                    name="maxParticipants"
                    value={eventData.maxParticipants}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">설명</label>
                <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            {eventData.type === 'QUIZ' && (
                <>
                    <div className="mb-4">
                        <label className="block mb-2">퀴즈 질문</label>
                        <input
                            type="text"
                            name="question"
                            value={eventData.quiz.question}
                            onChange={handleQuizChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">정답</label>
                        <input
                            type="text"
                            name="correctAnswer"
                            value={eventData.quiz.correctAnswer}
                            onChange={handleQuizChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </>
            )}

            <button
                type="submit"
                className="w-full h-10 text-base font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700"
            >
                {Object.keys(initialData).length ? '이벤트 수정하기' : '이벤트 만들기'}
            </button>
        </form>
    );
};

export default EventForm;
