import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';  // xlsx 라이브러리 임포트

const ParticipantList = () => {
    const { eventId } = useParams();
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let accessToken = localStorage.getItem("accessToken");

    // 이벤트 참여자 목록을 불러오는 함수
    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await axios.get(`/api/event/${eventId}/participants`, {
                    headers: {
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + accessToken
                    },
                });
                if (response.data.success) {
                    setParticipants(response.data.data);

                } else {
                    setError('참여자 목록을 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('참여자 목록 조회 오류:', error);
                setError('참여자 목록을 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchParticipants();
    }, [eventId]);

    const handleManager = () => {
        window.location.href = '/event/manager/' + eventId; // 이전 페이지로 이동
    }; const handleGoBack = () => {
        window.location.href = '/event/' + eventId; // 이전 페이지로 이동
    };
    // Excel로 다운로드하는 함수
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            participants.map((participant, index) => ({
                번호: index + 1,
                이름: participant.user.name,
                기수: `${participant.user.grade}기`,
                '참여 날짜': new Date(participant.date).toLocaleString(),
                '퀴즈 정답': participant.quiz ? participant.quiz.answer : 'N/A',
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
        XLSX.writeFile(workbook, `event_participants_${eventId}.xlsx`);
    };

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-4 mx-auto max-w-7xl">
            <h2 className="mb-6 text-3xl font-bold ">이벤트 참여자 목록</h2>
            <button onClick={handleGoBack} className="px-4 py-2 text-white bg-gray-600 rounded">이전</button>

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
                            {participants && (
                                <th className="px-4 py-2 font-medium text-left bg-gray-100 border">퀴즈 정답</th>
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
                                    {new Date(participant.date).toLocaleString()}
                                </td>
                                {participant.quiz && (
                                    <td className="px-4 py-2 border">{participant.quiz.answer}</td>
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
