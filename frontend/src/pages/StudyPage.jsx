import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudyItem from '../components/study/StudyItem';
import axios from 'axios';

const StudyPage = () => {
    let accessToken = localStorage.getItem("accessToken");

    const navigate = useNavigate();
    const [page, setPage] = useState(0); // 현재 페이지 번호
    const [studies, setStudies] = useState([]); // 스터디 목록
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수, 초기값을 0으로 설정

    // 스터디 만들기 버튼 핸들러
    const handleCreate = () => {
        navigate('/study/create');
    };

    // 데이터 fetching
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/study?page=${page}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                console.log(response.data); // 응답 데이터 확인
                setStudies(response.data.data); // 스터디 목록 설정
                setTotalPages(response.data.data[0]?.totalPages || 0); // totalPages 값 설정
            } catch (error) {
                console.error('Error fetching study data:', error);
            }
        };
        if (page >= 0) {
            fetchData();
        }
    }, [page, accessToken]);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div className="p-4">
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-3xl font-extrabold text-gray-800'>
                    스터디 목록
                </h2>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
                >
                    스터디 만들기
                </button>
            </div>

            {/* 스터디 목록 출력 */}
            {studies.map(study => (
                <StudyItem key={study.id} study={study} />
            ))}

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
                    페이지가 없습니다.
                </div>
            )}
        </div>
    );
};

export default StudyPage;
