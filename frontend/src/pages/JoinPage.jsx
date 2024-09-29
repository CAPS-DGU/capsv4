{/*경고메세지 추가 예정: 비정상 입력 시, 박스안에 빨간색으로 메세지 추가*/ }

import React, { useState } from 'react';
import NameInput from '../components/JoinInput/NameInput';
import IdInput from '../components/JoinInput/IdInput';
import PasswordInput from '../components/JoinInput/PasswordInput';
import EmailInput from '../components/JoinInput/EmailInput';
import SemesterSelect from '../components/JoinInput/SemesterSelect';
import axios from 'axios';

const JoinPage = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [semester, setSemester] = useState('');
  const [errors, setErrors] = useState({});
  const registerFunction = async () => {
    try {
      const response = await axios.post(`/api/user`,
        {
          userId: id,
          password: password,
          name: name,
          grade: parseInt(semester),
          email: email
        }
      )
      console.log(response.status);
      if (response.status === 200 || response.status === 201) {
        alert('회원가입이 완료되었습니다!');
        window.location.href = '/';
      }
    }
    catch (err) {
      alert(err.response.data.details)
      throw err;
    }
  }

  const validateForm = () => {
    const newErrors = {};

    // 이름 유효성 검사
    if (!/^[가-힣]{2,4}$/.test(name)) {
      newErrors.name = '이름은 2~4글자의 한글이어야 합니다.';
    }

    // 아이디 유효성 검사
    if (!/^[a-zA-Z0-9]{4,12}$/.test(id)) {
      newErrors.id = '아이디는 4~12글자의 영문 대소문자와 숫자만 가능합니다.';
    }

    // 비밀번호 유효성 검사
    if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$/.test(password)) {
      newErrors.password = '비밀번호는 8~20글자의 영문 대소문자와 숫자 1개 이상이 포함되어야 합니다.';
    }

    // 비밀번호 확인 유효성 검사
    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 이메일 유효성 검사
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    // 기수 선택 유효성 검사
    if (!semester) {
      newErrors.semester = '기수를 선택해주세요. 회원이 아니시면 "비회원"을 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      registerFunction();

      // 실제 회원가입 처리 로직을 여기에 추가 
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold">회원가입</h2>

        <NameInput name={name} setName={setName} error={errors.name} />
        <IdInput id={id} setId={setId} error={errors.id} />
        <PasswordInput
          label="비밀번호"
          password={password}
          setPassword={setPassword}
          error={errors.password}
        />
        <PasswordInput
          label="비밀번호 확인"
          password={confirmPassword}
          setPassword={setConfirmPassword}
          error={errors.confirmPassword}
        />
        <EmailInput email={email} setEmail={setEmail} error={errors.email} />
        <SemesterSelect semester={semester} setSemester={setSemester} error={errors.semester} />

        <button
          type="submit"
          className="w-full h-10 text-white bg-gray-600 rounded-md shadow-md cursor-pointer md:h-12 md:text-lg hover:underline hover:bg-gray-700"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default JoinPage;

