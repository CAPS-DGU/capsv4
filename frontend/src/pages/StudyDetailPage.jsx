import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudyInfo from '../components/study/StudyInfo';
import ParticipantList from '../components/study/ParticipantList';
import FileList from '../components/study/FileList';
import axios from 'axios';

const StudyDetailPage = () => {
    let accessToken = localStorage.getItem("accessToken");
    let profileName = localStorage.getItem("profilename");

    const { study_id } = useParams();
    const [study, setStudy] = useState();
    const [apply, setApply] = useState(false);
    const [applyList, setApplyList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/study/${study_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + accessToken
                    },
                });
                setStudy(response.data.data);
            } catch (err) {
                console.error("Error fetching study data", err);
            }
        };

        if (study_id) {
            fetchData();
        }
    }, [study_id]);

    useEffect(() => {
        const ListfetchData = async () => {
            try {
                const updatedResponse = await axios.get(`/api/study/apply/${study_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
                setApplyList(updatedResponse.data.data);
            } catch (err) {
                console.error("Error fetching apply list", err);
            }
        };

        if (study_id) {
            ListfetchData();
        }
    }, [study_id]);

    // UseEffect to log applyList after it updates
    useEffect(() => {
        if (applyList) {
            applyList.map((item, idx) => {
                if (item.user.name === profileName) {
                    setApply(true);
                    return;
                }
            });
        }
    }, [applyList]);

    if (!study) {
        return <p>해당 스터디를 찾을 수 없습니다.</p>;
    }

    const handleEdit = () => {
        window.location.href = '/study/edit/' + study_id;
    };

    const handleGoBack = () => {
        window.location.href = '/study';
    };

    const handleApply = async () => {
        try {
            const response = await axios.post(`/api/study/apply/${study_id}`, {}, {
                headers: {
                    'Accept': '*/*',
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            if (response.status === 200) {
                alert("신청이 완료되었습니다!");
                setApply(true);
            }
        } catch (err) {
            console.log(err);
            alert(err.response.data.details);
        }
    };

    const handleCancel = async () => {
        try {
            const response = await axios.delete(`/api/study/${study_id}/withdraw`, {
                headers: {
                    'Accept': '*/*',
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            if (response.status === 200) {
                alert("신청 취소가 완료되었습니다!");
                setApply(false);
            }
        } catch (err) {
            console.log(err);
            alert(err.response.data.details);
        }
    };

    const handleManager = () => {
        window.location.href = '/study/manager/' + study_id;
    };

    const handleDelete = async () => {
        let delete_flag = confirm("삭제하시겠습니까?");
        try {
            if (delete_flag) {
                const response = await axios.delete(`/api/study/${study_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + accessToken
                    },
                });

                if (response.status === 200) {
                    alert("삭제가 완료되었습니다!");
                    navigate(-1);
                }
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className="max-w-3xl p-6 mx-auto mt-8 bg-white border border-gray-300 rounded-lg shadow-lg">
            <StudyInfo study={study} />
            <ParticipantList participants={study.participants} />
            <FileList files={study.files} />
            <div className="flex justify-between mt-6 space-x-4">
                <button
                    onClick={handleGoBack}
                    className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
                >
                    이전
                </button>
                <div className="flex space-x-4">
                    {apply ? (
                        <button onClick={handleCancel} className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800">
                            신청취소
                        </button>
                    ) : (
                        <button onClick={handleApply} className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800">
                            신청
                        </button>
                    )}{true ?
                        (
                            <>
                                <button onClick={handleEdit} className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800">
                                    수정
                                </button>
                                <button onClick={handleDelete} className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800">
                                    삭제
                                </button>
                                <button onClick={handleManager} className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800">
                                    관리
                                </button>
                            </>) : ""
                    }
                </div>
            </div>
        </div>
    );
};

export default StudyDetailPage;
