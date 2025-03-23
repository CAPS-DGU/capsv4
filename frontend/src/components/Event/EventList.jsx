import React from 'react';
import EventItem from './EventItem';

const EventsList = ({ events }) => {
    return (
        <div className="max-w-3xl mx-auto mt-8 ">
            {
                events.map((event, index) => (
                    <EventItem key={index} event={event} />
                ))
            }
        </div>
    );
};

export default EventsList;
