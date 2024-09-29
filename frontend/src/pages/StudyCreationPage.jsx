import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStudyForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [day, setDay] = useState('MONDAY');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('ONLINE');
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  let accessToken = localStorage.getItem("accessToken");

  // 스터디 정보 가져오기

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData();
    
    // 값이 있는 필드만 추가
    if (title) formData.append('title', title);
    if (category) formData.append('category', category);
    if (description) formData.append('description', description);
    if (day) formData.append('day', day);
    if (location) formData.append('location', location);
    if (type) formData.append('type', type);
    if (maxParticipants) formData.append('maxParticipants', maxParticipants);
    if (file) formData.append('files', file);
    console.log(title);
    try {
      const response = await axios.post(`/api/study`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer `+accessToken,
        },
      });
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        setSuccess('Study updated successfully!');
        window.location.href = '/study'
        
      }
    } catch (error) {
      setError('Error updating the study.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-center">Edit Study</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">스터디명</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="당신의 멋진 스터디 이름은?"
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">스터디 분류</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="어떤 종류의 스터디인가요?"
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">스터디 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="당신의 멋진 스터디를 설명해 주세요!"
            className="w-full h-24 px-3 py-2 text-base bg-gray-200 border-0 rounded-lg outline-none"
          />
        </div>

        {/* Day */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">요일</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
          >
            <option value="MONDAY">월요일</option>
            <option value="TUESDAY">화요일</option>
            <option value="WEDNESDAY">수요일</option>
            <option value="THURSDAY">목요일</option>
            <option value="FRIDAY">금요일</option>
            <option value="SATURDAY">토요일</option>
            <option value="SUNDAY">일요일</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">스터디 장소</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="어디에서 스터디를 하실건가요?"
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">스터디 방식</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
          >
            <option value="ONLINE">온라인</option>
            <option value="OFFLINE">오프라인</option>
          </select>
        </div>

        {/* Max Participants */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">최대 참여 인원</label>
          <input
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            placeholder="Enter max participants"
            className="w-full h-10 px-3 text-base bg-gray-200 border-0 rounded-lg outline-none"
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">File</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-base"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full h-10 text-base font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700"
          >
            만들기
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
    </div>
  );
};

export default EditStudyForm;
