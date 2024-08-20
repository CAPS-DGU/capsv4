import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudyItem from '../components/study/StudyItem';

const studies = [
    {
        "id": 23,
        "user": {
            "id": 10,
            "grade": 38,
            "name": "홍길동"
        },
        "title": "너도 C언어 할 수 있어!",
        "year": 2024,
        "day": "MON",
        "category": "C언어",
        "semester": "SPRING",
        "participants": 5,
        "maxParticipant": 5,
        "type": "ONLINE"
    },
    {
        "id": 24,
        "user": {
            "id": 11,
            "grade": 38,
            "name": "홍길순"
        },
        "title": "너도 JAVA 할 수 있어!",
        "year": 2024,
        "day": "MON",
        "category": "JAVA",
        "semester": "SPRING",
        "participants": 3,
        "maxParticipant": 5,
        "type": "ONLINE"
    }
    // 다른 스터디 객체들을 추가할 수 있습니다.
];

const StudyPage = () => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate('/study/create');
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
            {studies.map(study => (
                <StudyItem key={study.id} study={study} />
            ))}
        </div>
    );
};

export default StudyPage;
