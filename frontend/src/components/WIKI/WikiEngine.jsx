import React, { useMemo, useState, useEffect } from 'react';

const WikiContent = ({ DocTitle, content }) => {
    const [toc, setToc] = useState([]);

    // 콘텐츠를 파싱하고 목차를 생성하는 함수
    const parseContent = (text) => {
        let htmlContent = text;
        let tocList = [];
        let level = 0;

        // 제목 변환 (== 제목 ==)
        htmlContent = htmlContent.replace(/^(==+)(.*?)==+$/gm, (_, levelStr, title) => {
            level = levelStr.length;  // 제목 레벨 결정 (레벨은 '='의 개수)
            const id = `section-${tocList.length + 1}`;
            tocList.push({ id, number: tocList.length + 1, subtitle: title.trim() });
            return `<h${level} id="${id}" class="text-${level}xl font-semibold text-gray-700 mb-4">${tocList.length}. ${title.trim()}</h${level}>`;
        });

        // 링크 변환 ([[링크]])
        htmlContent = htmlContent.replace(/\[\[([^\]]+?)\]\]/g, (_, linkText) => {
            const [text] = linkText.split('|');
            return text ? `<a href="/wiki/${text}" class="text-blue-500 hover:underline">${text}</a>` : `<a href="#" class="text-blue-500 hover:underline">${text}</a>`;
        });

        // 리스트 변환 (* 항목)
        htmlContent = htmlContent.replace(/^\* (.+)$/gm, '<li class="text-lg text-gray-600">$1</li>');
        htmlContent = htmlContent.replace(/(<li>.*<\/li>)(?!.*<\/ul>)/g, '<ul class="list-disc pl-6">$1</ul>');

        // 개행은 줄 띄우기
        htmlContent = htmlContent.replace(/\n/g, '</p><p class="text-lg text-gray-700 leading-relaxed mb-4">');

        return {
            htmlContent: `<p class="text-lg text-gray-700 leading-relaxed mb-4">${htmlContent}</p>`,
            tocList
        };
    };

    const { htmlContent, tocList } = useMemo(() => parseContent(content), [content]);

    useEffect(() => {
        setToc(tocList);
    }, [tocList]);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            {/* 제목과 수정 버튼들을 가로로 정렬 */}
            <div className="flex items-center justify-between mb-5">
                <h1 className='text-4xl font-semibold text-gray-700'>{DocTitle}</h1>

                {/* 수정과 수정 내역 버튼 */}
                <div className="flex space-x-4">
                    <a href={`/wiki/edit/${DocTitle}`} className='bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700'>
                        수정
                    </a>
                    <a href={`/wiki/history/${DocTitle}`} className='bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700'>
                        수정 내역
                    </a>
                </div>
            </div>

            {/* 목차 */}
            {tocList.length > 0 && (
                <div className="w-full p-4 bg-gray-100 rounded-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">목차</h2>
                    <ul className="list-decimal pl-6 text-lg text-gray-600">
                        {tocList.map((section) => (
                            <li key={section.id} className="list-none mb-2">
                                <a href={`#${section.id}`} className="text-blue-500 hover:underline">
                                    {section.number}. {section.subtitle}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 콘텐츠 */}
            <div className="wiki-content" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
    );
};

export default WikiContent;
