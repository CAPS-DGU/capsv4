import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const InputField = ({ label, type, placeholder }) => (
  <div className="w-full mb-4">
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
    />
  </div>
);

const LoginButton = () => (
  <div className="w-full mb-4">
    <input
      type="submit"
      value="로그인"
      className="w-full h-10 text-base font-medium text-white bg-gray-600 rounded-md shadow-md cursor-pointer md:h-12 md:text-lg hover:underline hover:bg-gray-700"
    />
  </div>
);

const Divider = () => (
  <div className="w-full mb-4">
    <hr className="border-t border-gray-300" />
  </div>
);

const JoinLink = () => (
  <div className="text-center">
    <a href="/join" className="text-sm text-blue-500 hover:underline">
      CAPS 회원가입
    </a>
  </div>
);

const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const userId = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    try {
      const response = await axios.post(
        '/api/user/login',
        { userId, password }, // 이 부분이 요청 본문(body)입니다.
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
        }
      );

      if (!response.status === 200) {
        throw new Error('로그인 실패');
      }

      const data = await response.data;
      const { accessToken, refreshToken } = data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      startTokenRefreshTimer();

      alert('로그인을 환영합니다! 10 포인트 지급!');
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const startTokenRefreshTimer = () => {
    const tokenExpiryTime = 15 * 60 * 1000;
    setTimeout(refreshAccessToken, tokenExpiryTime - 60 * 1000);
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await axios.get('/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('토큰 재발급 실패');
      }

      const data = await response.json();
      const { accessToken } = data;

      localStorage.setItem('accessToken', accessToken);

      startTokenRefreshTimer();
    } catch (error) {
      console.error('토큰 재발급 중 에러 발생:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('로그아웃되었습니다. 다시 로그인해주세요.');
    }
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ marginTop: '10vh' }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md md:max-w-md lg:max-w-lg xl:max-w-xl"
      >
        <InputField label="아이디" type="text" placeholder="ID" />
        <InputField label="비밀번호" type="password" placeholder="Password" />
        <LoginButton />
        {error && <p className="text-red-500">{error}</p>}
        <Divider />
        <JoinLink />
      </form>
    </div>
  );
};

export default LoginPage;
