import { ReviewDeleteIdAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ModalBtnContainer,
  ModalDesc,
  ModalContainer,
  ModalWrap as LogoutModalWrap,
  ModalWrap,
  Overlay,
} from "@style/ModalStyle";
import { deleteReview } from "@api/review";
import { userAtom } from "@atom/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OverlayVariant } from "@style/ModalVariants";
import { getUser, requestLogin } from "@api/user";
import { DangerAccent } from "@style/Layout";

export default function ReviewDeleteModal({ reviewId }: { reviewId: number }) {
  const [reviewDelId, setReviewDelId] = useRecoilState(ReviewDeleteIdAtom);
  const [user, setUser] = useRecoilState(userAtom);
  // const [reviews, setReviews] = useRecoilState(ReviewsAtom);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const reviewMutation = useMutation(deleteReview, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["reviews"]);
    },
  });
  const userMutation = useMutation(getUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  const handleClickConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    reviewMutation.mutate({ reviewId, userId: user?.id! });
    userMutation.mutate();
    setReviewDelId(null);
    navigate("/review");
  };
  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setReviewDelId(null);
  };

  return (
    <AnimatePresence>
      {reviewDelId && (
        <ReviewModalWrap>
          <ReviewModalContainer>
            <DeleteDesc>
              <DangerAccent>삭제</DangerAccent> 하시겠습니까?
            </DeleteDesc>
            <ModalBtnContainer>
              <DeleteBtn type="button" onClick={handleClickConfirm}>
                네
              </DeleteBtn>
              <CloseBtn type="button" onClick={handleClickCancel}>
                아니요
              </CloseBtn>
            </ModalBtnContainer>
          </ReviewModalContainer>
          <Overlay
            onClick={handleClickCancel}
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </ReviewModalWrap>
      )}
    </AnimatePresence>
  );
}

const ReviewModalWrap = styled(ModalWrap)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  z-index: 10000;
`;
const ReviewModalContainer = styled(ModalContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: auto;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 500px;
  height: 200px;
`;

const DeleteDesc = styled(ModalDesc)`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const DeleteBtn = styled.button`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 22px;
  background-color: ${props => props.theme.dangerColor};
  &:hover {
    background-color: #cc5e43;
  }
`;
const CloseBtn = styled(DeleteBtn)`
  background-color: ${props => props.theme.mainColor};
  &:hover {
    background-color: ${props => props.theme.accentColor};
  }
`;
