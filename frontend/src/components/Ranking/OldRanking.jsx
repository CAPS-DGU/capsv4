import React, { useEffect, useState } from 'react';
import RankingList from './RankingList';
import axios from 'axios';

const OldRanking = () => {
  const [ranking,setRanking] = useState(null);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get('/api/ranking/old');
        console.log(response);
        if(response.status === 200){
          setRanking(response.data.data);
          setError(null)
        }
        else{
          setError("Failed to fetch data");
        }
      }
      catch(err){
        setError(err.message);
      }
      finally{
        setLoading(false)
      }
    };
    fetchData();
  },[])
  if(loading) return <div>Loading...</div>;
  return (
    <RankingList data={ranking} />
  );
};

export default OldRanking;
