import { isReviewDeleteAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CloseBtn, ModalVariant, Overlay, OverlayVariant } from "./LoginModal";
import { Link, useNavigate } from "react-router-dom";
import { userAtom } from "@atom/user";
import { Accent, BtnContainer, Desc, ModalContainer, ModalWrap as LogoutModalWrap, ModalWrap } from "@style/ModalStyle";
import { IReview } from "src/types/review";
import { deleteReview } from "@api/review";

export default function ReviewDeleteModal({ review }: { review: IReview }) {
  const [isReviewDeleteModal, setIsReviewDeleteModal] = useRecoilState(isReviewDeleteAtom);
  const navigate = useNavigate();
  const handleClickConfirm = async (e: React.MouseEvent<HTMLElement>) => {
    // e.preventDefault();
    setIsReviewDeleteModal(false);
    const data = await deleteReview(review);
  };
  const handleClickCancel = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsReviewDeleteModal(false);
  };

  return (
    <AnimatePresence>
      {isReviewDeleteModal && (
        <WelcomeModalWrap>
          <WelcomeModalContainer>
            <Accent>삭제&nbsp; </Accent>하시겠습니까?
            <button onClick={handleClickConfirm}>네</button>
            <button onClick={handleClickCancel}>아니요</button>
          </WelcomeModalContainer>
        </WelcomeModalWrap>
      )}
    </AnimatePresence>
  );
}

const WelcomeModalWrap = styled(ModalWrap)`
  z-index: 1000;
`;
const WelcomeModalContainer = styled(ModalContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
`;

//   return (
//     <AnimatePresence>
//       {isReviewDeleteModal && (
//         <LogoutModalWrap>
//           <LogoutModalContainer variants={ModalVariant} initial="initial" animate="animate" exit="exit">
//             <LogoutDesc>
//               <Accent>삭제&nbsp; </Accent>하시겠습니까?
//             </LogoutDesc>
//             <BtnContainer>
//               <LogoutBtn type="button" onClick={closeDeleteModal}>
//                 네
//               </LogoutBtn>

//               <LogoutBtn type="button" onClick={() => closeDeleteModal()}>
//                 아니요
//               </LogoutBtn>
//             </BtnContainer>
//           </LogoutModalContainer>
//           <Overlay
//             onClick={() => setIsReviewDeleteModal(false)}
//             variants={OverlayVariant}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//           />
//         </LogoutModalWrap>
//       )}
//     </AnimatePresence>
//   );
// }

// const WelcomeModalContainer = styled(ModalContainer)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 500px;
//   height: 200px;
// `;

// const WelcomeCloseBtn = styled(CloseBtn)`
//   width: 36px;
//   height: 36px;
//   top: 10px;
//   right: 10px;
// `;
// const StartBtn = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 5px;
//   font-size: 22px;
//   width: 180px;
//   height: 40px;
// `;

// const LogoutModalContainer = styled(ModalContainer)`
//   width: 500px;
//   height: 200px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
// const LogoutDesc = styled(Desc)`
//   margin-top: 60px;
//   margin-bottom: 40px;
// `;

// const LogoutBtn = styled.button`
//   width: 100px;
//   height: 40px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 5px;
//   font-size: 22px;
//   background-color: ${props => props.theme.dangerColor};
//   &:hover {
//     background-color: #cc5e43;
//   }
// `;
