import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetail = ({ events }) => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const event = events;
    const user_id = localStorage.getItem('id');
    const accessToken = localStorage.getItem("accessToken");

    const [timeLeft, setTimeLeft] = useState({
        start: '',
        end: ''
    });

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        answer: '' // answer 필드 추가
    });

    // 폼 데이터 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            // 하이픈 자동 추가 로직
            const formattedValue = formatPhoneNumber(value);
            setFormData((prevData) => ({
                ...prevData,
                [name]: formattedValue
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const formatPhoneNumber = (value) => {
        // 숫자만 추출
        const digits = value.replace(/\D/g, '');

        // 하이픈 추가
        if (digits.length < 4) return digits;
        if (digits.length < 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
        return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
    };

    const formSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        let requestBody = {
            eventId: eventId,
            date: new Date().toISOString(),
        };

        // 이벤트 타입에 따라 다른 데이터 전송
        if (event.type === "SNACK") {
            requestBody.snack = {
                name: formData.name,
                phone: formData.phone
            };
            requestBody.quiz = null;
        } else if (event.type === "QUIZ") {
            requestBody.quiz = {
                answer: formData.answer
            };
            requestBody.snack = null;
        }

        console.log(requestBody); // requestBody가 완성된 후 로그 출력

        try {
            await axios.post('/api/event/apply', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            alert("신청이 완료되었습니다! 🎉");
            window.location.reload();
        } catch (error) {
            console.error("신청 실패:", error);
            alert(error.response.data.details);
        }
    };

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
                const milliseconds = Math.floor(time % 1000);
                return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
            };

            setTimeLeft({
                start: timeToStart > 0 ? formatTime(timeToStart) : '이미 시작됨',
                end: timeToEnd > 0 ? formatTime(timeToEnd) : '이미 종료됨'
            });
        };

        const timer = setInterval(calculateTimeLeft, 1); // 1ms마다 업데이트
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
            default:
                return "📅"; // 기본 이모지
        }
    };

    // 삭제 핸들러
    const handleDelete = async () => {
        if (window.confirm("정말로 이 이벤트를 삭제하시겠습니까?")) {
            try {
                await axios.delete(`/api/event/${eventId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                alert("이벤트가 삭제되었습니다.");
                navigate(-1); // 삭제 후 이전 페이지로 이동
            } catch (error) {
                console.error("이벤트 삭제 실패:", error);
                alert(error.response.data.details);
            }
        }
    };

    // 수정 핸들러
    const handleEdit = () => {
        navigate(`/event/edit/${eventId}`);
    };

    const handleBefore = () => {
        navigate('/event'); // 이전 페이지로 이동
    };

    const handleManager = () => {
        window.location.href = '/event/manager/' + eventId; // 관리자 페이지로 이동
    };

    return (
        <div className="max-w-4xl p-6 mx-auto mt-8">
            <div className="flex justify-end mb-4">
                <button onClick={handleBefore} className="px-4 py-2 ml-2 text-white bg-gray-600 rounded">이전</button>
                {event.writer.id == user_id ? (
                    <>
                        <button onClick={handleEdit} className="px-4 py-2 ml-2 text-white bg-blue-600 rounded">수정하기</button>
                        <button onClick={handleDelete} className="px-4 py-2 ml-2 text-white bg-red-600 rounded">삭제하기</button>
                        <button onClick={handleManager} className="px-4 py-2 ml-2 text-white bg-gray-600 rounded">관리</button>
                    </>
                ) : ""}
            </div>
            <div className="mb-4 text-5xl">
                <span>{getEmoji(event.type)}</span>
            </div>
            <h1 className="mb-4 text-5xl font-extrabold text-gray-600">
                {event.title}
            </h1>

            <p className="mb-4 text-lg text-gray-700">
                <strong>작성자:</strong> {event.writer.grade}기 {event.writer.name}
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
                    <h2 className="mb-2 text-3xl font-semibold text-gray-500">퀴즈를 풀어보세요!</h2>
                </div>
            )}

            <form method="post" onSubmit={formSubmit} className="mb-8">
                {event.type === "SNACK" && (
                    <>
                        <div className="mb-4">
                            <label className="block mb-2 text-xl font-bold text-gray-700">
                                전화번호
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="전화번호를 입력하세요(하이픈 없이)"
                                required
                            />
                        </div>
                    </>
                )}

                {event.type === "QUIZ" && (
                    <>
                        <div className="mb-4">
                            <label className="block mb-2 text-xl font-bold text-gray-700">
                                질문
                            </label>
                            <label className="block mb-2 text-gray-700 text-L">
                                {event.quiz.question}
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-xl font-bold text-gray-700">
                                정답
                            </label>
                            <input
                                type="text"
                                name="answer"
                                value={formData.answer}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="정답을 입력하세요"
                                required
                            />
                        </div>
                    </>
                )}

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
