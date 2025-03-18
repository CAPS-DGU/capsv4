import React, { useState } from 'react';
import TextEditor from '../components/BoardWrite/TextEditor';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const WritePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

  const onSubmit = async (formData) => {

    try {
      setIsLoading(true);
      const response = await axios.post('/api/board', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*',
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      console.log(response);
      // await new Promise(resolve => setTimeout(resolve, 3000));

      setIsLoading(false);
      alert('글 작성이 완료되었습니다.');
      return navigate(`/board/${formData.get('category')}`);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert('글 작성에 실패했습니다.');
    }
  }

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-gray-200 p-2">
      <h1 className="text-4xl m-4 text-gray-700">글 쓰기</h1>
      {isLoading ? <LoadingSpinner /> :
        <TextEditor onSubmit={onSubmit} />}
    </div>
  );
};

export default WritePage;
