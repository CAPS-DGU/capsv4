import React from 'react';

const InputField = ({ label, type, placeholder }) => (
  <div className="mb-4 w-full">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-10 text-base border-0 rounded-lg outline-none px-3 bg-gray-200"
    />
  </div>
);

const LoginButton = () => (
  <div className="mb-4 w-full">
    <input
      type="submit"
      value="로그인"
      className="w-full h-10 md:h-12 text-base md:text-lg font-medium text-white rounded-lg outline-none bg-green-500 cursor-pointer"
    />
  </div>
);

const Divider = () => (
  <div className="mb-4 w-full">
    <hr className="border-t border-gray-300" />
  </div>
);

const JoinLink = () => (
  <div className="text-center">
    <a href="/join" className="text-sm text-blue-500">
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
    <div className="flex justify-center items-center"
      style={{ marginTop: '10vh' }}
      >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-6 bg-white rounded-lg shadow-md"
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
