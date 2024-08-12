import React from 'react';
import Introduce from '../components/WIKI/template';
const placeholder = {
    "title": "동아리 이름",
    "sections": [
        {
            "id": "section1",
            "number": 1,
            "subtitle": "동아리 소개",
            "content": [
                "저희 동아리는 [동아리 이름]로서, [동아리 활동 영역]을 주제로 활동하고 있습니다. [동아리 이름]는 [동아리 설립 목적 및 목표]로 시작하여, 현재 [동아리의 주요 활동이나 성과]를 이루어내고 있습니다.",
                "매주 정기적으로 모임을 가지고 있으며, [모임의 구체적 활동 내용]와 같은 활동을 진행합니다. 동아리 회원들 간의 [동아리의 장점이나 특별한 점]을 통해 유익한 경험을 쌓아가고 있습니다."
            ]
        },
        {
            "id": "section2",
            "number": 2,
            "subtitle": "동아리 활동 사진",
            "images": [
                "https://via.placeholder.com/400",
                "https://via.placeholder.com/400"
            ]
        },
        {
            "id": "section3",
            "number": 3,
            "subtitle": "동아리 가입 방법 및 연락처",
            "content": [
                "저희 동아리에 관심 있으신 분들은 [가입 방법]을 통해 가입하실 수 있습니다. 더 자세한 사항은 [연락처]로 문의 주시면 감사하겠습니다."
            ]
        }
    ]
}

const IntroducePage = () => {
    return (
        <div>
            <Introduce data={placeholder}></Introduce>
        </div>
    );
};

export default IntroducePage;