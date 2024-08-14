{/*경고메세지 추가 예정: 비정상 입력 시, 박스안에 빨간색으로 메세지 추가*/ }

import React from 'react';
import NameInput from '../components/JoinInput/NameInput';
import SemesterSelect from '../components/JoinInput/SemesterSelect';
import EmailInput from '../components/JoinInput/EmailInput';
import IdInput from '../components/JoinInput/IdInput';
import PasswordInput from '../components/JoinInput/PasswordInput';

const JoinPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('회원가입이 완료되었습니다!');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold">회원가입</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">이름</label>
          <input
            type="text"
            placeholder="이름"
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
            required
          />
        </div>

        {/* 기수 선택 필드 */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">기수</label>
          <select
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
            required
          >
            <option value="">비회원</option>
            {[...Array(38).keys()].map((_, index) => (
              <option key={index + 1} value={`${index + 1}기`}>
                {index + 1}기 {/*만약 가장 최근 기수이면 기수 옆에 '(신입생)'이라고 쓰기, 38-index 말고 역순 출력 방법?...*/}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">이메일</label>
          <input
            type="email"
            placeholder="이메일"
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">아이디</label>
          <input
            type="text"
            placeholder="아이디"
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-10 text-white bg-gray-600 rounded-md shadow-md hover:underline hover:bg-gray-700"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default JoinPage;

