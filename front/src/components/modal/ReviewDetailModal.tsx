import { ReviewDeleteIdAtom } from "@atom/atom";
import { userAtom } from "@atom/user";
import { ModalCloseBtn, ModalContainer, ModalWrap } from "@style/ModalStyle";
import { IReview } from "@type/review";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useState, SetStateAction, Dispatch, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

export default function ReviewDetailModal({ review }: { review: IReview }) {
  const { reviewId, name, createAt, description, userId, reviewImg, title } = review;
  const isEdit = true;

  const navigate = useNavigate();
  const reviewMatch = useMatch(`/review/${reviewId}`);
  const user = useRecoilValue(userAtom);
  const [reviewDelId, setReviewDelId] = useRecoilState(ReviewDeleteIdAtom);

  const handleClickOverlay = () => {
    navigate("/review");
  };

  const handleClickEdit = () => {
    navigate(`/review/edit/${reviewId}`, { state: { reviewId, userId } });
  };
  const createDay = dayjs(createAt!).format("YYYY-MM-DD");

  useEffect(() => {
    console.log(reviewMatch);
    console.log(reviewId);
  }, []);

  return (
    <ModalWrap>
      <Overlay
        onClick={handleClickOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
      <ReviewContainer layoutId={`${reviewId}wrap`}>
        <ImgContainer>
          <ReviewImg
            src={reviewImg as string}
            alt="review image"
            //
          ></ReviewImg>
          <ModalCloseBtn
            onClick={() => {
              navigate("/review");
            }}
          >
            <svg width="14" height="14" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 3L11 11L3 19M3 3L19 19"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </ModalCloseBtn>
        </ImgContainer>
        <ContentsContainer>
          <InfoContainer>
            <CardImg src={`/assets/icon/user/profile01.png`} />
            <InfoBox>
              <p style={{ fontSize: "25px" }}>
                <span style={{ color: "green" }}>{name ? name : "***"}</span> 님
              </p>
              <p style={{ fontSize: "20px", marginTop: "5px" }}>{createDay} </p>
            </InfoBox>
            <p style={{ position: "absolute", right: "25px" }}>지역</p>
          </InfoContainer>

          <TextContainer>
            <p style={{ color: "#636E72", fontSize: "20px", fontWeight: "bold" }}>{title}</p>
            <Description>{description}</Description>
          </TextContainer>
        </ContentsContainer>
        <ButtonContainer layoutId={`${reviewId}btn`}>
          {user?.id === userId ? <Btn onClick={handleClickEdit}>수정</Btn> : null}

          {user?.id === userId ? (
            <Btn
              onClick={() => {
                setReviewDelId(reviewId!);
              }}
            >
              삭제
            </Btn>
          ) : null}
        </ButtonContainer>
      </ReviewContainer>
    </ModalWrap>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ReviewContainer = styled(ModalContainer)`
  z-index: 2000;
  position: absolute;
  width: 500px;
  height: 600px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
`;

const ImgContainer = styled(motion.div)`
  width: 500px;
  height: 350px;
  position: relative;
`;
const ReviewImg = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const TextContainer = styled(motion.div)`
  width: 100%;
  height: 100px;
  margin-top: 20px;
`;

const Description = styled(motion.div)`
  padding: 10px;
  width: 100%;
  height: 90px;
  letter-spacing: 1px;
  line-height: 1.3em;
  margin-top: 10px;
  font-size: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  resize: none;
`;
const InfoBox = styled(motion.div)`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ContentsContainer = styled(motion.div)`
  width: 100%;
  height: 250px;
  padding: 30px;
`;

const InfoContainer = styled(motion.div)`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  height: 35px;
  margin: auto;
`;
const CardImg = styled(motion.img)`
  width: 30px;
  height: 30px;
`;
const ButtonContainer = styled(motion.div)`
  display: flex;
  width: 500px;
  flex-direction: row;
  position: absolute;
  margin: auto;
  left: 0;
  bottom: 0;
`;
const Btn = styled(motion.button)`
  width: 300px;
  height: 20px;
  &:first-child {
    border-right: 1px #388e3c solid;
  }
`;
