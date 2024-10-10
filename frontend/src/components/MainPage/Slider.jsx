import React, { useState, useEffect } from 'react';

const slides = [
    '/src/assets/1.jpg',
    '/src/assets/2.jpg',
    '/src/assets/3.jpg',
];

function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 10000); // 10초마다 슬라이드 변경

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
    }, [currentIndex]);

    const prevSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 500); // 슬라이드 전환 애니메이션과 같은 시간
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    return (
        <div className="relative overflow-hidden w-full h-64">
            {/* 슬라이드 이미지 */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundImage: `url(${slides[currentIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>

            {/* 이전 버튼 */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={prevSlide}
            >
                &#10094;
            </button>

            {/* 다음 버튼 */}
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={nextSlide}
            >
                &#10095;
            </button>


        </div>
    );
}

export default Slider;
