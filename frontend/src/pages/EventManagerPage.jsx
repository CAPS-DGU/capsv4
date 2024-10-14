import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';  // xlsx 라이브러리 임포트
import LoadingSpinner from '../components/LoadingSpiner';

const ParticipantList = () => {
    const { eventId } = useParams();
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let accessToken = localStorage.getItem("accessToken");

    // 이벤트 참여자 목록을 불러오는 함수
    const fetchParticipants = async () => {
        try {
            const response = await axios.get(`/api/event/${eventId}/participants`, {
                headers: {
                    'Accept': '*/*',
                    'Authorization': 'Bearer ' + accessToken
                },
            });
            if (response.data.success) {
                const normalizedData = response.data.data.map(item => {
                    const modifiedDate = item.date.replace(/(\.\d{2})(\d)/, '$1$2'); // .42 -> .420으로 변경
                    return { ...item, date: modifiedDate };
                });
                const sortedData = normalizedData.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
                setParticipants(sortedData); // 상태 업데이트
            } else {
                setError('참여자 목록을 불러오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('참여자 목록 조회 오류:', error);
            if (error.response && error.response.status === 403) {
                alert("잘못된 접근");
                window.location.href = '/event';
            }
            setError('참여자 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchParticipants();
    }, [eventId]);

    // participants가 업데이트된 후 콘솔 로그
    useEffect(() => {
        console.log("Participants in Render:", participants);
    }, [participants]);

    // 밀리초까지 포함하는 날짜 포맷 함수
    const formatDateWithMilliseconds = (dateString) => {
        const date = new Date(dateString);
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0'); // 3자리 문자열로 변환
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}.${milliseconds}`;
    };


    // Excel로 다운로드하는 함수
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            participants.map((participant, index) => ({
                번호: index + 1,
                기수: `${participant.user.grade}기`,
                이름: participant.user.name,
                '참여 날짜': formatDateWithMilliseconds(participant.date),
                '전화번호': participant.snack ? participant.snack.phone : 'N/A',
                '퀴즈 정답': participant.quiz ? participant.quiz.answer : 'N/A'
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
        XLSX.writeFile(workbook, `event_participants_${eventId}.xlsx`);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-4 mx-auto max-w-7xl">
            <h2 className="mb-6 text-3xl font-bold">이벤트 참여자 목록</h2>
            <button onClick={() => window.location.href = '/event/' + eventId} className="px-4 py-2 text-white bg-gray-600 rounded">이전</button>
            <button
                onClick={downloadExcel}
                className="px-4 py-2 mb-4 ml-2 font-semibold text-white bg-green-500 rounded shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
                Excel로 다운로드
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 font-medium text-left bg-gray-100 border">번호</th>
                            <th className="px-4 py-2 font-medium text-left bg-gray-100 border">이름</th>
                            <th className="px-4 py-2 font-medium text-left bg-gray-100 border">기수</th>
                            <th className="px-4 py-2 font-medium text-left bg-gray-100 border">참여 날짜</th>
                            {participants[0]?.quiz && (
                                <th className="px-4 py-2 font-medium text-left bg-gray-100 border">퀴즈 정답</th>
                            )}
                            {participants[0]?.snack && (
                                <th className="px-4 py-2 font-medium text-left bg-gray-100 border">전화번호</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((participant, index) => (
                            <tr key={participant.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{participant.user.name}</td>
                                <td className="px-4 py-2 border">{participant.user.grade}기</td>
                                <td className="px-4 py-2 border">
                                    {formatDateWithMilliseconds(participant.date)}
                                </td>
                                {participant.quiz && (
                                    <td className="px-4 py-2 border">{participant.quiz.answer}</td>
                                )}
                                {participant.snack && (
                                    <td className="px-4 py-2 border">{participant.snack.phone}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ParticipantList;
