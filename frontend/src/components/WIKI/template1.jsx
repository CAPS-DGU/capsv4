import React, { useEffect, useState } from 'react';

// JSON 파일을 가져옵니다.


const Introduce = (props) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        // JSON 파일 데이터를 상태로 저장합니다.
        setData(props.data);
    }, [])
    if (!data) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            {/* 문서 제목 */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{data.title}</h1>

            {/* 목차 */}
            <div className="mb-8 p-4 bg-gray-100 rounded-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">목차</h2>
                <ul className="list-decimal pl-6 text-lg text-gray-600">
                    {data.sections.map((section) => (
                        <li className='list-none' key={section.id}>
                            <a href={`#${section.id}`} className="text-blue-500 hover:underline ">
                                {section.number}.</a> {section.subtitle}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 각 섹션 내용 */}
            {data.sections.map((section) => (
                <div key={section.id} id={section.id} className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        {section.number}. {section.subtitle}
                    </h2>
                    {section.content && section.content.map((paragraph, index) => (
                        <p key={index} className="text-lg text-gray-700 leading-relaxed mb-4">
                            {paragraph}
                        </p>
                    ))}
                    {section.images && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.images.map((image, index) => (
                                <img key={index} src={image} alt={`동아리 활동 사진 ${index + 1}`} className="w-full h-auto rounded-md" />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Introduce;
