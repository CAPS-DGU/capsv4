import React from 'react';

function PostItem({ id, title, author, time, hit, comments }) {
    return (
        <li className="grid grid-cols-7 items-center border-b border-gray-200 py-2 text-sm">
            <div className="text-center text-gray-500">{"자유"}</div>
            <div className="col-span-3">
                <a href={`/view/${id}`} className="text-gray-800 hover:text-blue-500 hover:underline">
                    {title}
                </a>
                {comments > 0 && (
                    <span className="ml-2 text-xs text-red-500">[{comments}]</span>
                )}
            </div>
            <div className="text-center text-gray-500">{author.grade}기 {author.name}</div>
            <div className="text-center text-gray-500">{time}</div>
            <div className="text-center text-gray-500">{hit}</div>
        </li >
    );
}

function BulletinBoard() {
    const posts = [
        {
            "id": 0,
            "writer": {
                "id": 10,
                "grade": 38,
                "name": "홍길동"
            },
            "category": 3,
            "title": "동해물과백두산이마르고닳도록하느님이보우하사우리나라만세무궁화삼천리.",
            "time": "2024-08-07 16:20:32",
            "hit": 37,
            "comment": 13
        },
        {
            "id": 1,
            "writer": {
                "id": 11,
                "grade": 38,
                "name": "홍길순"
            },
            "category": 3,
            "title": "안녕하세요.",
            "time": "2024-08-07 16:30:27",
            "hit": 17,
            "comment": 6
        }, {
            "id": 2,
            "writer": {
                "id": 11,
                "grade": 38,
                "name": "홍길순"
            },
            "category": 3,
            "title": "안녕하세요.",
            "time": "2024-08-07 16:30:27",
            "hit": 17,
            "comment": 6
        },
        {
            "id": 111,
            "writer": {
                "id": 11,
                "grade": 38,
                "name": "홍길순"
            },
            "category": 3,
            "title": "안녕하세요.",
            "time": "2024-08-07 16:30:27",
            "hit": 17,
            "comment": 6
        }, {
            "id": 111,
            "writer": {
                "id": 11,
                "grade": 38,
                "name": "홍길순"
            },
            "category": 3,
            "title": "안녕하세요.",
            "time": "2024-08-07 16:30:27",
            "hit": 17,
            "comment": 6
        }
        , {
            "id": 111,
            "writer": {
                "id": 11,
                "grade": 38,
                "name": "홍길순"
            },
            "category": 3,
            "title": "안녕하세요.",
            "time": "2024-08-07 16:30:27",
            "hit": 17,
            "comment": 6
        }

    ];

    return (
        <div className="m-4 max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <ul className="divide-y divide-gray-200">
                <li className="grid grid-cols-7 items-center py-2 text-sm font-bold text-gray-700">
                    <div className="text-center">분류</div>
                    <div className="col-span-3">제목</div>
                    <div className="text-center">작성자</div>
                    <div className="text-center">날짜</div>
                    <div className="text-center">조회수</div>
                </li>
                {posts.map((post, index) => (
                    <PostItem
                        key={index}
                        id={post.id}
                        title={post.title}
                        author={post.writer}
                        time={post.time}
                        hit={post.hit}
                        comments={post.comment}
                    />
                ))}
            </ul>
        </div>
    );
}

export default BulletinBoard;
