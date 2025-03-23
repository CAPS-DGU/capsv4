import React from 'react';
import Slider from '../components/MainPage/Slider';
import Grid from '../components/MainPage/Grid';
import ContactUs from '../components/MainPage/ContactUs';
import About from '../components/MainPage/About';
const MainPage = () => {
    return (
        <>
            <Slider />
            <Grid />
            <ContactUs />
            <About />
        </>
    );
};

export default MainPage;