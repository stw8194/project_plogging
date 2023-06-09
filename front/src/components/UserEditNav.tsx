import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { userAtom } from "@atom/user";
import { isLogoutModalAtom } from "@atom/atom";
import { UserNavProps } from "./layout/Nav";
import { motion, AnimatePresence, useScroll, useAnimation } from "framer-motion";

interface UserEditNavProps {}
export default function UserEditNav({ setIsEdit }: { setIsEdit: React.Dispatch<React.SetStateAction<boolean>> }) {
  const userNavMenus = ["edit/password", "edit/name"];
  const userNavKorMenus = ["비밀번호 수정", "이름 수정"];
  const setIsLogoutModal = useSetRecoilState(isLogoutModalAtom);
  const { pathname } = useLocation();
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  // const handleClickLogout = async () => {
  //   setIsLogoutModal(true);
  //   setIsEdit(false);
  // };

  const handleClickChangePassword = () => {
    // changePassword()
    if (user?.social !== "origin") {
      alert("소셜로그인 회원은 비밀번호 수정이 불가합니다.");
    } else {
      navigate("/");
    }
  };

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  };

  return (
    <UserNavWrapper variants={variants} initial="hidden" animate="visible">
      {userNavMenus.map((menu, index) => (
        <Link key={index} to={menu}>
          <Button>
            <BtnText variants={item}>{userNavKorMenus[index]}</BtnText>
          </Button>
        </Link>
      ))}
    </UserNavWrapper>
  );
}

const UserNavWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0px;
  top: 65px;
  background: white;
  min-width: 180px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Button = styled.button`
  min-width: 180px;
  &:not(last-child) {
    border-bottom: solid 1px ${props => props.theme.accentColor};
  }
`;
const BtnText = styled(motion.p)``;
