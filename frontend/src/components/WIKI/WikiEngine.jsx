import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDiffViewer from 'react-diff-viewer-continued';
import { toRelativeTime } from '../../utils/Time';

const WikiContent = ({ DocTitle, content, notFoundFlag, history, prevContent }) => {
  const [toc, setToc] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeSection, setActiveSection] = useState(null);  // 활성화된 섹션 추적
  const [isContentVisible, setIsContentVisible] = useState(history === undefined ? true : false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(history === undefined ? true : false);
  const navigate = useNavigate();
  let accessToken = localStorage.getItem("accessToken");

  const applyFormatting = (text) => {
    text = text.replace(/\|\|(.+?)\|\|/g, '<b>$1</b>');
    text = text.replace(/\/\/(.+?)\/\//g, '<i>$1</i>');
    text = text.replace(/__(.+?)__/g, '<u>$1</u>');
    text = text.replace(/--(.+?)--/g, '<s>$1</s>');
    text = text.replace(/\(\((.+?)\)\)/g, '<pre>$1</pre>');
    return text;
  };

  const parseContent = (text) => {
    let htmlContent = applyFormatting(text);
    let tocList = [];
    let commentList = [];

    let numbering = [0, 0, 0, 0];  // 각 수준의 번호 저장. 최대 4단계 제목
    let currentLevel = 0;

    htmlContent = htmlContent.replace(/^(==+)(.*?)==+$/gm, (_, levelStr, title) => {
      const level = levelStr.length; // 제목 레벨 결정 (레벨은 '='의 개수)

      if (level > currentLevel) {
        // 더 작은 수준으로 들어가면 해당 수준에서 번호 증가
        numbering[level - 2]++;
      } else if (level < currentLevel) {
        // 더 큰 수준으로 돌아가면 이전 번호로 복원
        numbering[level - 2]++;
        numbering[level - 1] = 0;
      } else {
        // 같은 레벨이면 해당 레벨의 번호만 증가
        numbering[level - 2]++;
      }

      // 이후 모든 낮은 수준들의 번호는 0으로 초기화
      for (let i = level; i < numbering.length; i++) {
        numbering[i] = 0;
      }

      currentLevel = level;
      const sectionNumber = numbering.slice(0, level - 1).filter(num => num > 0).join('.');

      const id = `section-${tocList.length + 1}`;

      // [[ ]] 구문을 링크로 변환
      const subtitleWithLinks = title.replace(/\[\[([^\]]+?)\]\]/g, (_, linkText) => {
        const [text] = linkText.split('|');
        const link_text = text ? text.replace(/ /g, '+') : null;
        return text ? `<a href="/wiki/${link_text}" class="text-blue-500 hover:underline">${text}</a>` : `<a href="#" class="text-blue-500 hover:underline">${text}</a>`;
      });

      tocList.push({ id, number: sectionNumber, subtitle: subtitleWithLinks.trim(), level });

      // 본문 제목에 링크 추가
      return `<h${6 - level} id="${id}" class="text-${6 - level}xl font-semibold text-gray-700 mb-4">
                        <a href="#toc_${sectionNumber}" class="text-blue-500 hover:underline" onclick="document.getElementById('toc_${sectionNumber}').scrollIntoView();">${sectionNumber}.</a> ${subtitleWithLinks}
                    </h${level}><hr>`;
    });

    htmlContent = htmlContent.replace(/\[\[([^\]]+?)\]\]/g, (_, linkText) => {
      const [text] = linkText.split('|');
      const link_text = text ? text.replace(/ /g, '+') : null;
      return text ? `<a href="/wiki/${link_text}" class="text-blue-500 hover:underline">${text}</a>` : `<a href="#" class="text-blue-500 hover:underline">${text}</a>`;
    });

    htmlContent = htmlContent.replace(/\{\{(.+?)\}\}/g, (_, commentText) => {
      const commentIndex = commentList.length + 1;
      commentList.push(commentText.trim());
      return `<sup class="text-blue-500 hover:underline cursor-pointer" id="comment-ref-${commentIndex}"><a href="#comment-${commentIndex}" class="text-blue-500 hover:underline cursor-pointer">[${commentIndex}]</a></sup>`;
    });

    htmlContent = htmlContent.replace(/^\* (.+)$/gm, '<li class="text-lg text-gray-600">$1</li>');
    htmlContent = htmlContent.replace(/(<li>.*<\/li>)(?!.*<\/ul>)/g, '<ul class="list-disc pl-6">$1</ul>');

    htmlContent = htmlContent.replace(/\n/g, '</p><p class="text-lg text-gray-700 leading-relaxed mb-4">');

    return {
      htmlContent: `<p class="text-lg text-gray-700 leading-relaxed mb-4">${htmlContent}</p>`,
      tocList,
      commentList
    };
  };

  const { htmlContent, tocList, commentList } = useMemo(() => parseContent(content), [content]);

  useEffect(() => {
    const redirectToHashPage = (text) => {
      const hashPattern = /^#(\S+)/g;
      const match = hashPattern.exec(text);
      if (match) {
        const targetPage = text.replace("#", "");
        setTimeout(() => {
          navigate(`/wiki/${targetPage}`);
        }, 500);
      }
    };

    redirectToHashPage(content);

    setToc(tocList);
    setComments(commentList);
  }, [content, tocList, commentList, navigate]);

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);  // 클릭된 섹션을 활성화 상태로 설정
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  const editButton = (

    <div className="flex space-x-4">
      {accessToken && <>
        <a href={`/wiki/edit/${DocTitle}`} className='px-4 py-2 text-white bg-gray-600 rounded-md shadow-md hover:bg-gray-700'>
          수정
        </a>
        <a href={`/wiki/history/${DocTitle}`} className='px-4 py-2 text-white bg-gray-600 rounded-md shadow-md hover:bg-gray-700'>
          수정 내역
        </a>
      </>}
    </div>
  );

  const escapeScriptTags = (str) => {
    return str.replace(/(<script\b[^>]*>|<\/script>)/gi, match => {
      return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    });
  }


  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between mb-5">
        <h1 className='text-4xl font-semibold text-gray-700'>
          {DocTitle} {history ? <span className='inline text-xl text-gray-400'>{(isHistoryVisible || isContentVisible) ? history : toRelativeTime(history)}에 작성되었습니다.</span> : null}
        </h1>
        {notFoundFlag ? null : editButton}
      </div>

      {/* 목차 */}
      {tocList.length > 0 && (!history || isContentVisible) && (
        <div className="w-full p-4 mb-6 bg-gray-100 rounded-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">목차</h2>
          <ul className="pl-6 text-lg text-gray-600 list-decimal">
            {tocList.map((section) => (
              <li
                key={section.id}
                className={`mb-2 list-none ${activeSection === section.id ? 'text-red-500' : ''}`}  // 클릭된 항목 색상 변경
                style={{ paddingLeft: `${(section.level - 2) * 20}px` }}
              >
                <a
                  id={`toc_${section.number}`}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionClick(section.id);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  {section.number + "." + " "}
                </a>
                <span dangerouslySetInnerHTML={{ __html: escapeScriptTags(section.subtitle) }}></span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {history && (
        <div className="mb-4">
          <button
            onClick={() => setIsContentVisible(!isContentVisible)}
            className="px-4 py-2 text-white bg-gray-600 rounded-md shadow-md hover:bg-gray-700"
          >
            {isContentVisible ? "본문 숨기기" : "본문 보기"}
          </button>
          <button
            onClick={() => setIsHistoryVisible(!isHistoryVisible)}
            className="ml-4 px-4 py-2 text-white bg-gray-600 rounded-md shadow-md hover:bg-gray-700"
          >
            {isHistoryVisible ? "변경사항 숨기기" : "변경사항 보기"}
          </button>
        </div>
      )}

      {isContentVisible && (
        <div className="wiki-content" dangerouslySetInnerHTML={{ __html: escapeScriptTags(htmlContent) }}></div>
      )}

      {isHistoryVisible && prevContent && (
        <ReactDiffViewer oldValue={prevContent} newValue={content} splitView={true} />
      )}

      {comments.length > 0 && isContentVisible && (
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">주석</h2>
          <ol className="pl-6 text-lg text-gray-600 list-decimal">
            {comments.map((comment, index) => (
              <li key={index} id={`comment-${index + 1}`} className="mb-2 list-none">
                <a href={`#comment-ref-${index + 1}`} className="text-blue-500 hover:underline">
                  [{index + 1}]
                </a>{" "}
                <span dangerouslySetInnerHTML={{ __html: escapeScriptTags(comment) }}></span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default WikiContent;
