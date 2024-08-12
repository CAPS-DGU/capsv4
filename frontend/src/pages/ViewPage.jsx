import React from 'react';
import PostView from '../components/BoardView/PostView';
import { useParams } from 'react-router-dom';
const examplePosts = [{
    id: 0,
    writer: { id: 10, grade: 38, name: "김장훈" },
    isDeleted: 0,
    isModified: 0,
    category: 3,
    title: "안녕하세요. 김장훈입니다.",
    time: "2024-08-07 16:20:32",
    hit: 37,
    content: "오늘부터 ...",
    like: 6,
    comment: [
        { id: 37, userId: 112, isDeleted: 0, targetId: 0, content: "좋아요!", time: "2024-08-07 15:52:37" },
        { id: 38, userId: 113, isDeleted: 0, targetId: 37, content: "저도 좋아요!", time: "2024-08-07 15:54:23" },
    ],
    files: [
        { fileId: 232, name: "회의록.hwp" },
        { fileId: 233, name: "장부.xlsx" }
    ]
}, {
    id: 1,
    writer: { id: 10, grade: 38, name: "홍길동" },
    isDeleted: 0,
    isModified: 0,
    category: 3,
    title: "안녕하세요.",
    time: "2024-08-07 16:20:32",
    hit: 37,
    content: "오늘부터 ...",
    like: 6,
    comment: [
        { id: 37, userId: 112, isDeleted: 0, targetId: 0, content: "좋아요!", time: "2024-08-07 15:52:37" },
        { id: 38, userId: 113, isDeleted: 0, targetId: 37, content: "저도 좋아요!", time: "2024-08-07 15:54:23" },
    ],
    files: [
        { fileId: 232, name: "회의록.hwp" },
        { fileId: 233, name: "장부.xlsx" }
    ]
}
];
const ViewPage = () => {

    const Params = useParams();
    const view_id = Params.view_id;
    console.log(view_id);
    return (
        <div>
            <PostView post={examplePosts[view_id]} />
        </div>
    );
};

export default ViewPage;