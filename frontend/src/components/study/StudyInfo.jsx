import React from 'react';

const StudyInfo = ({ study }) => {
    const { title, year, day, category, description, semester, location, type, maxParticipant, participants, maker } = study;

    // 요일과 학기 변환 함수
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

    return (
        <div className="mb-6">
            <h1 className="mb-6 text-4xl font-extrabold text-blue-700">{title}</h1>
            <p className="mb-2 text-gray-700"><strong>작성자:</strong> {maker.grade}기 {maker.name}</p>
            <p className="mb-2 text-gray-700"><strong>카테고리:</strong> {category}</p>
            <p className="mb-2 text-gray-700"><strong>학기:</strong> {year}년 {translateSemester(semester)} </p>
            <p className="mb-2 text-gray-700"><strong>요일:</strong> {translateDay(day)}</p>
            <p className="mb-2 text-gray-700"><strong>장소:</strong> {location}</p>
            <p className="mb-2 text-gray-700"><strong>유형:</strong> {type}</p>
            <p className="mb-2 text-gray-700"><strong>참여자 수:</strong> {participants.length}/{maxParticipant}</p>
            <p className="mb-6 text-gray-700"><strong>설명:</strong> {description}</p>
        </div>
    );
};

export default StudyInfo;
