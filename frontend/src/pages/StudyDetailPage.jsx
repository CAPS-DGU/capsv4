import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudyInfo from '../components/study/StudyInfo';
import ParticipantList from '../components/study/ParticipantList';
import FileList from '../components/study/FileList';

const studies = [{
    "id": 23,
    "isDeleted": 0,
    "maker": {
        "id": 10,
        "grade": 38,
        "name": "홍길동"
    },
    "title": "너도 C언어 할 수 있어!",
    "year": 2024,
    "day": "MON",
    "category": "C언어",
    "description": "C언어 배웁니다.",
    "semester": "SPRING",
    "location": "캡방",
    "type": "ONLINE",
    "maxParticipant": 5,
    "participants": [
        {
            "id": 10,
            "grade": 38,
            "name": "홍길동"
        },
        {
            "id": 11,
            "grade": 38,
            "name": "홍길순"
        }
    ],
    "files": [
        {
            "fileId": 232,
            "name": "기획서.hwp"
        },
        {
            "fileId": 233,
            "name": "기획서.pdf"
        }
    ]
}];

const StudyDetailPage = () => {
    const { study_id } = useParams();
    const study = studies.find(s => s.id === parseInt(study_id));
    const navigate = useNavigate();

    if (!study) {
        return <p>해당 스터디를 찾을 수 없습니다.</p>;
    }

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className="max-w-3xl p-6 mx-auto mt-8 bg-white border border-gray-300 rounded-lg shadow-lg">
            <StudyInfo study={study} />
            <ParticipantList participants={study.participants} />
            <FileList files={study.files} />
            <div className="flex justify-between mt-6 space-x-4">
                <button
                    onClick={handleGoBack}
                    className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
                >
                    이전
                </button>
                <div className="flex space-x-4">
                    <button
                        className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
                    >
                        수정
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudyDetailPage;
