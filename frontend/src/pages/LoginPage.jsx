import React from 'react';

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
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('님, 로그인을 환영합니다! 10 포인트 지급!');
  };

  return (
    <div className="flex items-center justify-center"
      style={{ marginTop: '10vh' }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md md:max-w-md lg:max-w-lg xl:max-w-xl"
      >
        <InputField label="아이디" type="text" placeholder="ID" />
        <InputField label="비밀번호" type="password" placeholder="Password" />
        <LoginButton />
        <Divider />
        <JoinLink />
      </form>
    </div>
  );
};

export default LoginPage;
