import React from 'react';

const ParticipantList = ({ participants }) => {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700">참여자 목록</h2>
            <ul className="mt-2 text-gray-700">
                {participants.map((participant) => (
                    <li key={participant.id}>{participant.grade}기 {participant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ParticipantList;
