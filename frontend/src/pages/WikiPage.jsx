import React, { useState, useEffect } from 'react';
import Template from '../components/WIKI/template';
import WikiSearch from '../components/WIKI/WikiSearch';
import { useParams } from 'react-router-dom';
import axios from "axios";
import LoadingSpinner from '../components/LoadingSpinner';
import WikiRecent from '../components/WIKI/WikiRecent';

const wikiIntroData = {
  "title": "대문",
  "content": `[[CAPS 위키]]에 오신 것을 환영합니다!
[[CAPS]] 회원이라면 원하는 문서를 생성 및 편집할 수 있습니다.
더 자세한 내용은 [[CAPS 위키]], [[도움말]]을 참고하시기 바랍니다.

<div class="bg-gray-200 p-4 border-2 border-gray-300 rounded-xl">||[[도움말]] || CAPS 위키를 어떻게 써야할 지 모르겠다면 도움말을 클릭하세요!</div>
<div class="bg-gray-200 p-4 border-2 border-gray-300 rounded-xl ">||[[CAPS 위키 프로젝트]] 진행 중!! || 프로젝트에 참여해서 관련 문서에 기여의 손길을 보내주세요!</div>
<div class="bg-gray-200 p-4 border-2 border-gray-300 rounded-xl">||[[C언어 프로젝트]] 진행 중!! || 2024-여름학기 동안 C언어 및 여러가지 위키 페이지를 작성하고 수정하고 싶습니다! 같이 하실분 구해요~</div>
`
};

const IntroducePage = () => {
  const { wiki_title } = useParams();

  const NotFoundData = {
    "title": wiki_title,
    "content": `<div>해당 문서가 없습니다.</div> <a class="text-blue-500 hover:underline" href='/wiki/edit/${wiki_title}'>새 문서 만들기</a>`
  };

  const [wikiData, setWikiData] = useState(null);  // For fetched data
  const [error, setError] = useState(null);        // For error handling
  const [loading, setLoading] = useState(true);    // For loading state
  // let template =  <Template data={wikiData} />
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/wiki?title=${wiki_title}`);
        if (response.status === 200) {
          setWikiData(response.data.data); // Set the fetched data
          setError(null);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);  // Stop loading after fetching data
      }
    };
    if (wiki_title) {
      fetchData();  // Fetch only if wiki_title is present
    } else {
      // If no title, show intro data
      setWikiData(wikiIntroData);
      setLoading(false);  // Stop loading
    }
  }, [wiki_title]);
  if (loading) return <LoadingSpinner />;  // Show loading state
  console.log(error);
  return (

    <div>
      <WikiSearch></WikiSearch>
      <WikiRecent />
      {wikiData && !error ? <Template data={wikiData} /> : <Template data={NotFoundData} notFoundFlag={true} />}
    </div >
  );
};

export default IntroducePage;
