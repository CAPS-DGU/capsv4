import React from 'react';
import StudyItem from './StudyItem';

const StudyList = ({ studies }) => {
    return (
        <div>
            {studies.map((study) => (
                <StudyItem key={study.id} study={study} />
            ))}
        </div>
    );
};

export default StudyList;
