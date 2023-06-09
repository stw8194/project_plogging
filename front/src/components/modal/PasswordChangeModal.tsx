import styled from "styled-components";
import { useForm } from "react-hook-form";
import { changePassword } from "@api/user";
import { ViewPassword } from "@components/modal/LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "@style/Layout";
import { UserPasswordProps } from "@pages/mypage";
import { AnimatePresence } from "framer-motion";
import { ModalVariant, OverlayVariant } from "@style/ModalVariants";
import { ModalContainer, ModalWrap, Overlay } from "@style/ModalStyle";
import { useNavigate } from "react-router-dom";
import { PasswordForm } from "@type/user";
interface PasswordChangeModalProps {
  setIsPasswordChange: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordChange: boolean;
}
export default function PasswordChangeModal({ setIsPasswordChange, isPasswordChange }: PasswordChangeModalProps) {
  const [isViewCurPassword, setIsViewCurPassword] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [isViewConfirmPassword, setIsViewConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<PasswordForm>();

  const closeRegisterModal = async () => {
    setIsPasswordChange(false);
    reset();
    navigate("/mypage");
  };

  const handleSubmitChange = handleSubmit(data => {
    console.log(data);

    changePassword(data).then(status => {
      if (status === 406) {
        alert("현재 비밀번호가 일치하지 않습니다.");
      } else {
        alert("비밀번호 수정이 완료되었습니다.");
        closeRegisterModal();
      }
    });

    // closeRegisterModal();
  });

  return (
    <AnimatePresence>
      {isPasswordChange && (
        <PasswordWrapper>
          <ModalContainer
            onSubmit={handleSubmitChange}
            variants={ModalVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            width="700px"
            height="750px"
          >
            <Title>비밀번호 수정</Title>

            <InputBox>
              <InputTitle>현재 비밀번호</InputTitle>
              <Input
                placeholder="숫자,특수문자,영문 포함 8자리 이상"
                type={isViewCurPassword ? "text" : "password"}
                id="password"
                // type="password"
                {...register("password", {
                  required: { value: true, message: "비밀번호를 입력해주세요." },
                  minLength: { value: 8, message: "8자 이상 입력해주세요." },
                  // pattern: {
                  //   value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                  //   message: "숫자,특수문자,영문 포함 8자리 이상 적어주세요.",
                  // },
                })}
              />
              <ViewPassword style={{ top: "18px" }}>
                <FontAwesomeIcon
                  icon={isViewCurPassword ? faEye : faEyeSlash}
                  color="#2A9C6B"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsViewCurPassword(cur => !cur)}
                />
              </ViewPassword>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </InputBox>

            <InputBox>
              <InputTitle>비밀번호</InputTitle>
              <Input
                placeholder="숫자,특수문자,영문 포함 8자리 이상"
                type={isViewPassword ? "text" : "password"}
                id="newPassword"
                // type="password"
                {...register("newPassword", {
                  required: { value: true, message: "비밀번호를 입력해주세요." },
                  minLength: { value: 8, message: "8자 이상 입력해주세요." },
                })}
              />
              <ViewPassword style={{ top: "18px" }}>
                <FontAwesomeIcon
                  icon={isViewPassword ? faEye : faEyeSlash}
                  color="#2A9C6B"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsViewPassword(cur => !cur)}
                />
              </ViewPassword>
              <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>
            </InputBox>

            <InputBox>
              <InputTitle>비밀번호 확인</InputTitle>
              <Input
                placeholder="동일한 비밀번호를 입력해주세요."
                type={isViewConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "비밀번호를 한번 더 입력해 주세요",
                  validate: {
                    mathchesPreviousPassword: value => {
                      const { newPassword } = getValues();
                      return newPassword === value || "비밀번호가 일치하지 않습니다.";
                    },
                  },
                })}
              />
              <ViewPassword style={{ top: "18px" }}>
                <FontAwesomeIcon
                  icon={isViewConfirmPassword ? faEye : faEyeSlash}
                  color="#2A9C6B"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsViewConfirmPassword(cur => !cur)}
                />
              </ViewPassword>

              <ErrorMessage>{errors?.confirmPassword?.message!}</ErrorMessage>
            </InputBox>

            <Button>수정하기</Button>
            <Button type="button" onClick={closeRegisterModal}>
              취소하기
            </Button>
          </ModalContainer>
          <Overlay
            onClick={closeRegisterModal}
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </PasswordWrapper>
      )}
    </AnimatePresence>
  );
}

const PasswordWrapper = styled(ModalWrap)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  color: ${props => props.theme.mainColor};
`;
const Description = styled.p`
  font-size: 16px;
  margin-bottom: 45px;
  color: ${props => props.theme.textColor};
`;
const InputBox = styled.div`
  position: relative;
  width: 530px;
  color: #8d8d8d;
  margin-bottom: 25px;
`;
const InputTitle = styled.h3`
  font-size: 13px;
  margin-bottom: 12px;
  color: ${props => props.theme.textColor};
`;
const Input = styled.input`
  width: 530px;
  height: 50px;
  font-size: 18px;
  padding: auto;
  padding-left: 10px;
  color: ${props => props.theme.textColor};
  ::placeholder {
    color: ${props => props.theme.weekColor};
  }
`;
const ErrorMessage = styled.div`
  position: absolute;
  font-size: 12px;
  color: ${props => props.theme.dangerColor};
  height: 14px;
  right: 0px;
  bottom: -20px;
`;

const Button = styled.button`
  width: 200px;
  height: 64px;
  font-size: 18px;
  margin-top: 45px;
`;
