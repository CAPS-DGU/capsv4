import React, { useState, useEffect } from 'react';
import Template from '../components/WIKI/template';
import WikiSearch from '../components/WIKI/WikiSearch';
import { useParams } from 'react-router-dom';
import axios from "axios";
import ReactDiffViewer from 'react-diff-viewer-continued';
import LoadingSpinner from '../components/LoadingSpinner';


const WikiHistoryPage = () => {
  const { wiki_title } = useParams();

  const [wikiData, setWikiData] = useState(null);  // For fetched data
  const [error, setError] = useState(null);        // For error handling
  const [loading, setLoading] = useState(true);    // For loading state
  let accessToken = localStorage.getItem("accessToken")

  // let template =  <Template data={wikiData} />
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/wiki/history?title=${wiki_title}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
              'Authorization': 'Bearer ' + accessToken

            },
          }
        );
        if (response.status === 200) {
          setWikiData(response.data.data); // Set the fetched data
          setError(null);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
        throw err;
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
  const handleRedirect = () => {
    alert("잘못된 접근입니다.");
    window.location.href = '/wiki';  // 리다이렉트
  };
  // console.log(wikiData);
  return (

    <div>
      <WikiSearch></WikiSearch>

      {wikiData && !error ? (wikiData.map((wiki, index) => {
        return (
          <div>
            <Template key={index} data={wiki} notFoundFlag={true} history={wiki.time} />
            {index < wikiData.length - 1 &&
              <ReactDiffViewer oldValue={wikiData[index + 1].content} newValue={wiki.content} splitView={true} />
            }
          </div>)
      })) : (handleRedirect())}
    </div >
  );
};

export default WikiHistoryPage;
