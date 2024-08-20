import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudyItem = ({ study }) => {
    const { id, title, year, day, category, semester, participants, maxParticipant, type, user } = study;
    const navigate = useNavigate();

    // 요일과 학기 변환 함수 (이전과 동일)
    const translateDay = (day) => {
        switch (day) {
            case 'MON': return '월요일';
            case 'TUE': return '화요일';
            case 'WED': return '수요일';
            case 'THU': return '목요일';
            case 'FRI': return '금요일';
            case 'SAT': return '토요일';
            case 'SUN': return '일요일';
            default: return day;
        }
    };

    const translateSemester = (semester) => {
        switch (semester.toUpperCase()) {
            case 'SPRING': return '1학기';
            case 'SUMMER': return '여름학기';
            case 'FALL':
            case 'AUTUMN': return '2학기';
            case 'WINTER': return '겨울학기';
            default: return semester;
        }
    };

    const handleClick = () => {
        navigate(`/study/${id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="p-4 mb-4 transition-colors border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
        >
            <h2 className="mb-2 text-xl font-bold text-blue-700">{title}</h2>
            <p className="text-gray-700"><strong>작성자: </strong>{user.grade}기 {user.name}</p>
            <p className="text-gray-700"><strong>카테고리 :</strong> {category}</p>
            <p className="text-gray-700"><strong>학기 :</strong> {translateSemester(semester)} {year}</p>
            <p className="text-gray-700"><strong>요일 :</strong> {translateDay(day)}</p>
            <p className="text-gray-700"><strong>참여자 수 :</strong> {participants.length}/{maxParticipant}</p>
            <p className="text-gray-700"><strong>유형 :</strong> {type}</p>
        </div>
    );
};

export default StudyItem;
