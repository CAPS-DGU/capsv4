import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);
    const [password, setPassword] = useState('');
    const [newImage, setNewImage] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const [sub, setSub] = useState(null);

    useEffect(() => {
        const parseJwt = (token) => {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split('')
                        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
                        .join('')
                );

                return JSON.parse(jsonPayload);
            } catch (error) {
                console.error('Invalid JWT', error);
                alert("잘못된 접근입니다.");
                localStorage.clear();
                window.location.href = '/login';
                return null;
            }
        };

        try {
            const decoded = parseJwt(accessToken);
            if (decoded) {
                setSub(decoded.sub);
            }
        } catch (error) {
            throw error;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`api/user/${sub}`, {
                    headers: {
                        Accept: '*/*',
                        Authorization: 'Bearer ' + accessToken,
                    }
                });
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert("잘못된 접근입니다.");
                localStorage.clear();
                window.location.href = '/login';
            }
        };
        if (sub) fetchData();
    }, [sub]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handlePasswordEditClick = () => {
        setIsPasswordEditing(!isPasswordEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const updatedUserData = {
                comment: user.comment,
                imageName: user.imageName,
            };

            await axios.patch(`/api/user/${sub}`, updatedUserData, {
                headers: {
                    Accept: '*/*',
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
            });

            setIsEditing(false);
            alert('저장되었습니다!');
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordSave = async () => {
        try {
            await axios.patch(
                `api/user/${sub}`,
                { password },
                {
                    headers: {
                        Accept: '*/*',
                        Authorization: 'Bearer ' + accessToken,
                    }
                }
            );

            setPassword('');
            setIsPasswordEditing(false);
            alert('비밀번호가 변경되었습니다!');
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0]);
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setUser((prevUser) => ({ ...prevUser, imageName: imageUrl }));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {user ? (
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h2 className="mb-6 text-2xl font-bold text-center">마이 페이지</h2>
                    <div className="flex justify-center mb-6">
                        <img
                            src={user.imageName ? user.imageName : '/default-profile.png'}
                            alt="Profile"
                            className="object-cover w-32 h-32 rounded-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">프로필 사진:</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            disabled={!isEditing}
                            className="w-full mt-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">이름:</label>
                        <p className="mt-2 text-gray-700">{user.name}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">이메일:</label>
                        <p className="mt-2 text-gray-700">{user.email}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">한줄소개:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="comment"
                                value={user.comment || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        ) : (
                            <p className="mt-2 text-gray-700">{user.comment || '한줄소개가 없습니다.'}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-700">포인트:</label>
                        <label> {user.point}P</label>
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-700">기수:</label>
                        <label> {user.grade}기</label>
                    </div>

                    {isPasswordEditing && (
                        <div className="mb-4">
                            <label className="block text-gray-700">새 비밀번호:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-2 mt-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <button
                                onClick={handlePasswordSave}
                                className="w-full px-4 py-2 mt-4 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                            >
                                비밀번호 변경하기
                            </button>
                        </div>
                    )}

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handleEditClick}
                            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            {isEditing ? '취소하기' : '수정하기'}
                        </button>
                        {isEditing && (
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                            >
                                저장하기
                            </button>
                        )}
                        <button
                            onClick={handlePasswordEditClick}
                            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                            {isPasswordEditing ? '비밀번호 변경 취소' : '비밀번호 변경'}
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-700">로딩 중...</p>
            )}
        </div>
    );
};

export default MyPage;
