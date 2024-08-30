import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // React Router의 useNavigate 훅 사용

const WikiContent = ({ DocTitle, content, notFoundFlag, history }) => {
    const [toc, setToc] = useState([]);
    const [comments, setComments] = useState([]);
    const [isContentVisible, setIsContentVisible] = useState(history===undefined? true : false);  // 본문 내용의 가시성 관리
    const navigate = useNavigate();  // 리다이렉트를 위해 useNavigate 사용

    // 텍스트 내의 특정 포맷팅을 처리하는 함수
    const applyFormatting = (text) => {
        text = text.replace(/\|\|(.+?)\|\|/g, '<b>$1</b>'); // Bold (||text||)
        text = text.replace(/\/\/(.+?)\/\//g, '<i>$1</i>'); // Italic (//text//)
        text = text.replace(/__(.+?)__/g, '<u>$1</u>');     // Underline (__text__)
        text = text.replace(/--(.+?)--/g, '<s>$1</s>');     // Strikethrough (--text--)
        text = text.replace(/\(\((.+?)\)\)/g, '<pre>$1</pre>'); // Preformatted text ((text))
        return text;
    };

    // 콘텐츠를 파싱하고 목차를 생성하는 함수
    const parseContent = (text) => {
        let htmlContent = applyFormatting(text);
        let tocList = [];
        let commentList = [];
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
            const link_text = text ? text.replace(/ /g, '+') : null;
            return text ? `<a href="/wiki/${link_text}" class="text-blue-500 hover:underline">${text}</a>` : `<a href="#" class="text-blue-500 hover:underline">${text}</a>`;
        });

        // 주석 처리 {{comment}}
        htmlContent = htmlContent.replace(/\{\{(.+?)\}\}/g, (_, commentText) => {
            const commentIndex = commentList.length + 1;
            commentList.push(commentText.trim());
            return `<sup class="text-blue-500 hover:underline cursor-pointer" id="comment-ref-${commentIndex}">[${commentIndex}]</sup>`;
        });

        // 리스트 변환 (* 항목)
        htmlContent = htmlContent.replace(/^\* (.+)$/gm, '<li class="text-lg text-gray-600">$1</li>');
        htmlContent = htmlContent.replace(/(<li>.*<\/li>)(?!.*<\/ul>)/g, '<ul class="list-disc pl-6">$1</ul>');

        // 개행은 줄 띄우기
        htmlContent = htmlContent.replace(/\n/g, '</p><p class="text-lg text-gray-700 leading-relaxed mb-4">');

        return {
            htmlContent: `<p class="text-lg text-gray-700 leading-relaxed mb-4">${htmlContent}</p>`,
            tocList,
            commentList
        };
    };

    const { htmlContent, tocList, commentList } = useMemo(() => parseContent(content), [content]);

    useEffect(() => {
        // "#문자" 패턴을 찾아서 그 문자로 리다이렉트
        const redirectToHashPage = (text) => {
            const hashPattern = /^#(\S+)/g;  // #문자 패턴을 찾는 정규식
            const match = hashPattern.exec(text);  // 첫 번째 일치 찾기
            if (match) {
                const targetPage = text.replace("#","");  // # 뒤의 문자를 타겟으로
                setTimeout(() => {
                    navigate(`/wiki/${targetPage}`);
                }, 2000)
            }
        };

        // 본문에 대해 리다이렉트 검사를 실행
        redirectToHashPage(content);

        setToc(tocList);
        setComments(commentList);
    }, [content, tocList, commentList, navigate]);

    const editButton = (
        <div className="flex space-x-4">
            <a href={`/wiki/edit/${DocTitle}`} className='px-4 py-2 text-white bg-gray-600 rounded-md shadow-md hover:bg-gray-700'>
                수정
            </a>
            <a href={`/wiki/history/${DocTitle}`} className='px-4 py-2 text-white bg-gray-600 rounded-md shadow-md hover:bg-gray-700'>
                수정 내역
            </a>
        </div>
    );

    return (
        <div className="max-w-3xl p-6 mx-auto bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between mb-5">
                <h1 className='text-4xl font-semibold text-gray-700'>
                    {DocTitle} {history ? <span className='inline text-xl text-gray-400'>{history}에 작성되었습니다.</span> : null}
                </h1>
                {notFoundFlag ? null : editButton}
            </div>

            {/* 목차 */}
            {tocList.length > 0 && (
                <div className="w-full p-4 mb-6 bg-gray-100 rounded-md">
                    <h2 className="mb-4 text-xl font-semibold text-gray-700">목차</h2>
                    <ul className="pl-6 text-lg text-gray-600 list-decimal">
                        {tocList.map((section) => (
                            <li key={section.id} className="mb-2 list-none">
                                <a href={`#${section.id}`} className="text-blue-500 hover:underline">
                                    {section.number}. {section.subtitle}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 토글 버튼 */}
            {history && (
                <div className="mb-4">
                    <button
                        onClick={() => setIsContentVisible(!isContentVisible)}
                        className="px-4 py-2 text-white bg-gray-600 rounded-md shadow-md hover:bg-gray-700"
                    >
                        {isContentVisible ? "본문 숨기기" : "본문 보기"}
                    </button>
                </div>
            )}

            {/* 콘텐츠 */}
            {isContentVisible && (
                <div className="wiki-content" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
            )}

            {/* 주석 목록 */}
            {comments.length > 0 && isContentVisible && (
                <div className="mt-10">
                    <h2 className="mb-4 text-xl font-semibold text-gray-700">주석</h2>
                    <ol className="pl-6 text-lg text-gray-600 list-decimal">
                        {comments.map((comment, index) => (
                            <li key={index} id={`comment-${index + 1}`} className="mb-2 list-none">
                                <a href={`#comment-ref-${index + 1}`} className="text-blue-500 hover:underline">
                                    [{index + 1}]
                                </a> {comment}
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default WikiContent;
