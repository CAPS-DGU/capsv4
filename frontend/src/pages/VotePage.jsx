import React, { useEffect, useState } from "react";
import { Avatar } from "../components/Vote/Avatar";
import { Button } from "../components/Vote/Button";
import { Component } from "../components/Vote/Component";
import { Link } from "../components/Vote/Link";
import axios from "axios";
// Modal component


export default Element = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  let accessToken = localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal 상태 관리
  const [isVoted, setIsVoted] = useState(false);
  const [Error, setError] = useState(null);
  const [totalVotes, setTotalVotes] = useState(null);
  useEffect(() => {
    const voteSubmit = async () => {
      let requestBody = {
        voteId: 1,
        choiceId: 999999,
      }
      try {
        await axios.post('/api/vote', requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setIsVoted(true);
      } catch (error) {
        setError(error.response)
      }
    }
    voteSubmit();
  }, [])
  useEffect(() => {
    const total = async () => {
      try {
        let response = await axios.get('/api/vote', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setTotalVotes(response.data.data.totalVotes);
      } catch (error) {
        setError(error.response)
      }
    }
    total();
  }, [])
  const voteSubmit = async () => {
    let requestBody = {
      voteId: 1,
      choiceId: selectedCard + 2,
    }
    try {
      await axios.post('/api/vote', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setIsVoted(true);
    } catch (error) {
      setError(error)
    }
  }

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // Modal 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Modal 닫기
  };
  const Modal = ({ isOpen, onClose }) => {

    const handleVoted = () => {
      setIsVoted(true); // 투표완료시 모달 출력 위한 함수
      voteSubmit();
    };
    const CheckVote = ({ onClose }) => {
      return (
        <>
          <p className="mt-4 [font-family:'Space Grotesk',Serif]">{selectedCard === 1 ? "기호 1번" : "기호 2번"}</p>
          <p className="mt-4 [font-family:'Space Grotesk',Serif]">{selectedCard === 1 ? "신효환 / 성준영 후보" : "백수연 / 권수현 후보"}</p>
          <p className="mt-4 [font-family:'Space Grotesk',Serif]">투표하시겠습니까?</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button
              className="!flex-grow justify-center w-[15rem] !border-[#262F4B] !border-2 !border-solid !bg-[#262F4B] !text-[#ffffff] !text-[1.5625rem] !font-bold"
              text="투표하기"
              onClick={handleVoted}
            />
            <Button
              className="!flex-grow justify-center w-[15rem] border-[#999999] !border-2 !border-solid !bg-[#999999] !text-[#ffffff] !text-[1.5625rem] !font-bold"
              text="취소하기"
              onClick={onClose}
            />
          </div>
        </>
      )
    }

    const VoteFin = ({ onClose }) => {
      return (
        <>
          <p className="mt-4 [font-family:'Space Grotesk',Serif]">투표가 완료되었습니다!
          </p>
          <p className="mt-4 [font-family:'Space Grotesk',Serif]">소중한 한 표 감사합니다&#58;&#41;</p >
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button
              className="!flex-grow justify-center w-[15rem] !border-[#262F4B] !border-2 !border-solid !bg-[#262F4B] !text-[#ffffff] !text-[1.5625rem] !font-bold"
              text="닫기"
              onClick={onClose}
            />
          </div>
        </>
      )
    };
    const VoteWas = ({ onClose }) => {
      return (
        <>

          <p className="mt-4 [font-family:'Space Grotesk',Serif]">{Error.data.details}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button
              className="!flex-grow justify-center w-[15rem] !border-[#262F4B] !border-2 !border-solid !bg-[#262F4B] !text-[#ffffff] !text-[1.5625rem] !font-bold"
              text="닫기"
              onClick={onClose}
            />
          </div>
        </>
      )
    };
    const VoteLoginFail = ({ onClose }) => {
      return (
        <>
          <p className="mt-4 [font-family:'Space Grotesk',Serif]">
            로그인하지 않으셨습니다.
          </p>
          <p className="mt-4 [font-family:'Space Grotesk',Serif]">로그인 해주세요!</p >
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button
              className="!flex-grow justify-center w-[15rem] !border-[#262F4B] !border-2 !border-solid !bg-[#262F4B] !text-[#ffffff] !text-[1.5625rem] !font-bold"
              text="닫기"
              onClick={onClose}
            />
          </div>
        </>
      )
    };
    if (!isOpen) return null;
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[30rem] text-center">
          <h2 className="text-2xl font-bold !text-[#BDBDBD]">알림</h2>
          {isVoted ? <VoteFin onClose={onClose} /> : accessToken === null ? <VoteLoginFail onClose={onClose} /> : Error === null ? < CheckVote halnder={handleVoted} onClose={onClose} /> : <VoteWas onClose={onClose} />}

        </div>
      </div>
    );

  };

  return (
    <div className="bg-[#262F4B] flex flex-col items-center w-full min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col items-center w-full mt-5">
        <div className="w-full sm:w-[45.4375rem] text-center">
          <p className="[text-shadow:2px_4px_0px_#8b4e65] [font-family:'Inter',Helvetica] font-extrabold text-[#f7cf62] text-3xl sm:text-5xl tracking-[0] leading-[3rem] sm:leading-[4.4375rem]">
            38기 CAPS 회장단 선거 투표
          </p>
          {totalVotes === null ? <p className="mt-8 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-sm sm:text-[1.2rem] tracking-[0] leading-6 sm:leading-9">
            2025년 CAPS를 이끌 회장단 투표입니다.
            <br />
            투표는 익명이며 12/27 00시부터 12/28일 00시까지 진행됩니다.
            <br />
            기호 1, 2번 회장단 공약을 확인 하신 후
            <br />
            투표하러 가기 버튼을 통해 투표 부탁드립니다!
          </p> : <p className="mt-8 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-2xl tracking-[0] leading-6 sm:leading-9">
            총 투표수 : {totalVotes}명</p>}
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col items-center sm:flex-row sm:gap-[10.875rem] mt-[2rem] sm:mt-[2rem] sm:w-full sm:justify-center">
        {/* Card 1 */}
        <div
          onClick={() => handleCardClick(1)} // 카드 클릭 시 상태 업데이트
          className={`mb-10 max-w-screen-md flex flex-col w-[24rem] sm:w-[32.1875rem] h-[25.1875rem] items-end justify-end pt-2.5 pb-[1.5625rem] px-[2.1875rem] rounded-[2.8125rem] overflow-hidden border border-solid border-[#191a23] shadow-[0px_5px_0px_#191a23] 
            ${selectedCard === 1 ? "bg-[#ffe8aa]" : "bg-[#ffffff]"}`} // 선택된 카드 스타일
        >
          {/* Card Content */}
          <div className="relative w-full sm:w-[29.0625rem] h-[16.625rem]">
            <div className="absolute w-full sm:w-[29rem] h-[7.375rem]">
              <div className="relative w-[19.8125rem] h-[7.375rem]">
                <div className="relative w-[6.5rem] h-[6.4375rem] bg-[url(/vote_1.jpg)] bg-cover bg-[50%_50%]">
                  <div className="relative h-[6.4375rem] bg-[url(/vote_1.jpg)] bg-cover bg-[50%_50%]">
                    <div className="absolute top-[2.6875rem] left-[0.6875rem] font-android-overline text-white text-center"></div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 absolute top-[1.625rem] left-[8.6875rem]">
                  <div className="[font-family:'Inter',Helvetica] font-bold text-[#000000] text-3xl sm:text-4xl">회장</div>
                  <div className="[font-family:'Space_Grotesk',Helvetica] font-normal text-[1.375rem] text-[#000000]">신효환</div>
                </div>
              </div>
            </div>
            <Component
              className="!absolute !bottom-[17rem] left-1/2 transform -translate-x-1/2"
              labelClassName="!left-1"
              text="기호 1번"
            />
            <img
              className="absolute w-[29.0625rem] h-[0.1875rem] top-[8.25rem] left-0"
              alt="Line"
              src="https://c.animaapp.com/YiM9BdDl/img/line-3-1.svg"
            />
            <div className="absolute w-[29rem] h-[7.375rem] top-[9.25rem] left-0">
              <div className="relative w-[19.8125rem] h-[7.375rem]">
                <Avatar
                  divClassName="!left-2.6875rem !top-[2.6875rem]"
                  size="small"
                  sizeSmallTypeClassName="!h-[6.4375rem] !bg-[50%_50%] !rounded-[unset] !bg-cover bg-[url(/vote_2.jpg)] !absolute !left-0 !bg-[unset] !w-[6.5rem] !top-[0.4375rem]"
                  type="initials"
                />
                <div className="absolute w-[9.25rem] top-[5.0625rem] left-[8.6875rem] [font-family:'Space_Grotesk',Helvetica] font-normal text-[1.375rem] text-[#000000]">
                  성준영
                </div>
                <div className="absolute w-[9.25rem] top-1.5 left-[8.6875rem] [font-family:'Inter',Helvetica] font-bold text-3xl text-[#000000]">
                  부회장
                </div>
              </div>
            </div>
          </div>
          <Link
            arrow="https://c.animaapp.com/YiM9BdDl/img/arrow-1-7.svg"
            className="!justify-end !flex-[0_0_auto] !items-end"
            href="https://alpine-composer-83a.notion.site/CAPS-14db1697a69280f6ae82f9a2431ec83e"
            property1="black"
            text="공약 보러가기"
          />
        </div>

        {/* Card 2 */}
        <div
          onClick={() => handleCardClick(2)} // 카드 클릭 시 상태 업데이트
          className={`mb-10 max-w-screen-md flex flex-col w-[24rem] sm:w-[32.1875rem] h-[25.1875rem] items-end justify-end pt-2.5 pb-[1.5625rem] px-[2.1875rem] rounded-[2.8125rem] overflow-hidden border border-solid border-[#191a23] shadow-[0px_5px_0px_#191a23] 
            ${selectedCard === 2 ? "bg-[#ffe8aa]" : "bg-[#ffffff]"}`} // 선택된 카드 스타일
        >
          {/* Card Content */}
          <div className="inline-flex flex-col items-start gap-3.5 relative flex-[0_0_auto] ml-[-0.21875rem]">
            <div className="relative w-full sm:w-[29.0625rem] h-[7.375rem]">
              <div className="inline-flex flex-col items-start gap-2.5 relative left-0.21875rem">
                <div className="relative w-[19.8125rem] h-[7.375rem]">
                  <Avatar
                    divClassName="!left-2.6875rem !top-[2.6875rem]"
                    size="small"
                    sizeSmallTypeClassName="!h-[6.4375rem] !bg-[50%_50%] !rounded-[unset] !bg-cover bg-[url(/vote_3.jpg)] !absolute !left-0 !bg-[unset] !w-[6.4375rem] !top-[0.4375rem]"
                    type="initials"
                  />
                  <div className="flex flex-col w-[9.25rem] items-start gap-2 absolute top-[1.625rem] left-[8.6875rem]">
                    <div className="relative self-stretch mt-[-0.0625rem] [font-family:'Inter',Helvetica] font-bold text-[#000000] text-3xl tracking-[0] leading-[normal]">
                      회장
                    </div>
                    <div className="relative self-stretch [font-family:'Space_Grotesk',Helvetica] font-normal text-[1.375rem] text-[#000000] tracking-[0] leading-[normal]">
                      백수연
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="relative w-[29.0625rem] h-[0.1875rem]"
              alt="Line"
              src="https://c.animaapp.com/YiM9BdDl/img/line-3-1.svg"
            />
            <div className="relative w-[19.8125rem] h-[7.375rem]">
              <Avatar
                divClassName="!left-2.6875rem !top-[2.6875rem]"
                size="small"
                sizeSmallTypeClassName="!h-[6.4375rem] !bg-[50%_50%] !rounded-[unset] !bg-cover bg-[url(/vote_4.jpg)] !absolute !left-0 !bg-[unset] !w-[6.4375rem] !top-[0.4375rem]"
                type="initials"
              />
              <div className="absolute w-[9.25rem] top-[5.0625rem] left-[8.6875rem] [font-family:'Space_Grotesk',Helvetica] font-normal text-[1.375rem] text-[#000000] tracking-[0] leading-[normal]">
                권수현
              </div>
              <div className="absolute w-[9.25rem] top-1.5 left-[8.6875rem] [font-family:'Inter',Helvetica] font-bold text-3xl text-[#000000] tracking-[0] leading-[normal]">
                부회장
              </div>
            </div>
            <Component
              className="!absolute !bottom-[17rem] left-1/2 transform -translate-x-1/2"
              labelClassName="!left-1"
              text="기호 2번"
            />
          </div>
          <Link
            arrow="https://c.animaapp.com/YiM9BdDl/img/arrow-1-7.svg"
            href="https://spectacular-cake-372.notion.site/2025-CAPS-2-15fcf988885b80afb1bfdcc632aecf8c?pvs=4"
            className="!justify-end !flex-[0_0_auto] !items-end"
            property1="black-2"
            text="공약 보러가기"
          />
        </div>
      </div>

      {/* Button Section */}
      <div className="flex justify-center w-full ">
        <Button
          className="!border-[#8b4e65] !border-2 !border-solid !bg-[#f7cf62]"
          divClassName="!mt-[-0.125rem] !text-[#000000] !text-[1.5625rem] !font-bold"
          property1="button-tertiary"
          text="투표하기"
          onClick={handleOpenModal} // Modal 열기
        />
      </div>

      {/* Modal Section */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
