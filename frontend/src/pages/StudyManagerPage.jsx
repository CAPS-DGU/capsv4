import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const StudyManagerPage = () => {
    let accessToken = localStorage.getItem("accessToken");

    const { study_id } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [members, setMembers] = useState([]); // 회원 목록
    const [selectedApplicants, setSelectedApplicants] = useState([]); // 선택된 지원자들
    const [selectedMembers, setSelectedMembers] = useState([]); // 선택된 회원들 (삭제할 회원)
    const [activeTab, setActiveTab] = useState('applicants'); // 'applicants' or 'members'
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await axios.get(`/api/study/apply/${study_id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                setApplicants(response.data.data); // 지원자 목록 설정
            } catch (error) {
                console.error("지원자 목록을 불러오는 중 오류 발생:", error);
            }
        };

        const fetchMembers = async () => {
            try {
                const response = await axios.get(`/api/study/apply/${study_id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                setMembers(response.data.data); // 회원 목록 설정
            } catch (error) {
                console.error("회원 목록을 불러오는 중 오류 발생:", error);
            }
        };

        if (study_id) {
            fetchApplicants();
            fetchMembers();
        }
    }, [study_id]);

    // 체크박스 클릭 시 처리 함수 (applicant.user.id 저장)
    const handleCheckboxChange = (userId) => {
        if (activeTab === "members") {
            setSelectedMembers((prevSelected) =>
                prevSelected.includes(userId)
                    ? prevSelected.filter((id) => id !== userId) // 이미 선택된 경우 제거
                    : [...prevSelected, userId] // 선택되지 않은 경우 추가
            );
        } else {
            setSelectedApplicants((prevSelected) =>
                prevSelected.includes(userId)
                    ? prevSelected.filter((id) => id !== userId) // 이미 선택된 경우 제거
                    : [...prevSelected, userId] // 선택되지 않은 경우 추가
            );
        }
    };

    // 지원자 승인 처리 함수
    const handleApprove = async () => {
        try {
            const requestBody = {
                studyId: study_id,
                users: selectedApplicants.map((userId) => ({
                    userId: userId
                }))
            };

            const response = await axios.post(`/api/study/accept`, requestBody, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            if (response.status === 200) {
                alert("선택된 지원자가 승인되었습니다.");
                setSelectedApplicants([]); // 선택 초기화
                const updatedResponse = await axios.get(`/api/study/apply/${study_id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                setApplicants(updatedResponse.data.data); // 지원자 목록 갱신
            }
        } catch (error) {
            console.error("지원자 승인 중 오류 발생:", error);
            alert(error.response.data.details);
        }
    };

    // 회원 삭제 처리 함수
    const handleDeleteMembers = async () => {

        let deleteFlag = confirm(`회원을 삭제하시겠습니까?`)
        if (deleteFlag) {
            try {
                const requestBody = {
                    studyId: study_id,
                    users: selectedMembers.map((userId) => ({
                        userId: userId
                    }))
                };
                console.log(selectedMembers);
                const response = await axios.post(`/api/study/kick`, requestBody, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });

                if (response.status === 200) {
                    alert("선택된 회원이 삭제되었습니다.");
                    setSelectedMembers([]); // 선택 초기화
                    const response = await axios.get(`/api/study/apply/${study_id}`, {
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    });
                    setMembers(response.data.data); // 회원 목록 갱신
                }
            } catch (error) {
                console.error("회원 삭제 중 오류 발생:", error);
                alert(error.response.data.details);
            }
        }
    };

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className="max-w-3xl p-6 mx-auto mt-8 bg-white border border-gray-300 rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">스터디 관리</h2>

            {/* Toggle Buttons */}
            <div className="flex mb-6 space-x-4">
                <button
                    onClick={() => setActiveTab('applicants')}
                    className={`px-4 py-2 rounded ${activeTab === 'applicants' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                >
                    지원자 관리
                </button>
                <button
                    onClick={() => setActiveTab('members')}
                    className={`px-4 py-2 rounded ${activeTab === 'members' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                >
                    회원 삭제 관리
                </button>
            </div>

            {/* Applicant Management */}
            {activeTab === 'applicants' && (
                <>
                    {applicants.length === 0 ? (
                        <p>지원자가 없습니다.</p>
                    ) : (
                        <ul>
                            {applicants.map((applicant) => (
                                applicant.status === "PENDING" ? (
                                    <li key={applicant.id} className="flex items-center p-4 border-b">
                                        <input
                                            type="checkbox"
                                            checked={selectedApplicants.includes(applicant.user.id)}
                                            onChange={() => handleCheckboxChange(applicant.user.id)}
                                            className="mr-4"
                                        />
                                        <div>
                                            <p>이름: {applicant.user.name}</p>
                                            <p>기수: {applicant.user.grade}</p>
                                            <p>지원 시간: {new Date(applicant.time).toLocaleString()}</p>
                                            <p>상태: {applicant.status}</p>
                                        </div>
                                    </li>
                                ) : null
                            ))}
                        </ul>
                    )}

                    <div className="flex justify-between mt-6 space-x-4">
                        <button
                            onClick={handleGoBack}
                            className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
                        >
                            이전
                        </button>
                        <button
                            onClick={handleApprove}
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                            disabled={selectedApplicants.length === 0}
                        >
                            승인
                        </button>
                    </div>
                </>
            )}

            {/* Member Deletion Management */}
            {activeTab === 'members' && (
                <>
                    {members.length === 0 ? (
                        <p>회원이 없습니다.</p>
                    ) : (
                        <ul>
                            {members.map((applicant) => (
                                applicant.status === "APPROVED" ? (
                                    <li key={applicant.id} className="flex items-center p-4 border-b">
                                        <input
                                            type="checkbox"
                                            checked={selectedMembers.includes(applicant.user.id)}
                                            onChange={() => handleCheckboxChange(applicant.user.id)}
                                            className="mr-4"
                                        />
                                        <div>
                                            <p>이름: {applicant.user.name}</p>
                                            <p>기수: {applicant.user.grade}</p>
                                            <p>지원 시간: {new Date(applicant.time).toLocaleString()}</p>
                                            <p>상태: {applicant.status}</p>
                                        </div>
                                    </li>
                                ) : null
                            ))}
                        </ul>
                    )}

                    <div className="flex justify-between mt-6 space-x-4">
                        <button
                            onClick={handleGoBack}
                            className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
                        >
                            이전
                        </button>
                        <button
                            onClick={handleDeleteMembers}
                            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                            
                        >
                            삭제
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StudyManagerPage;
