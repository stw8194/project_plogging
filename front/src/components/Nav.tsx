import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useRoutes } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";
import LoginModal from "./modal/LoginModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginModalAtom, isLoginSelector } from "@atom/atom";

const Wrap = styled(motion.nav)`
  z-index: 1000;
  display: flex;
  position: fixed;
  justify-content: space-between;
  font-size: 18px;
  height: 90px;
  width: 100%;
  padding-left: 20px;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const LogoBox = styled(Col)``;
const MenuBox = styled(Col)`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  width: 710px;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;
const UserBox = styled(Col)`
  flex-direction: column;
  justify-content: center;
  width: 90px;
  height: 90px;
  background-color: ${props => props.theme.accentColor};
  cursor: pointer;
`;
const Logo = styled(motion.svg)`
  width: 180px;
  height: 46px;
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
  a:not(:last-of-type) {
    border-right: solid 1px gray;
  }
`;
const Item = styled.li`
  position: relative;
  width: 140px;
  display: flex;
  justify-content: center;

  color: #618872;
`;
const CurCircle = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  bottom: -20px;
  background-color: ${props => props.theme.accentColor};
`;
const UserName = styled.div`
  font-size: 18px;
  color: white;
  margin-top: 5px;
`;
// Variants
const LogoVariants = {
  normal: {
    fill: "rgba(0, 128, 55,1)",
  },
  active: {
    fill: "rgb(0,0,0)",
  },
};
const navVariants = {
  top: {
    backgroundColor: "rgba(255, 255, 255,1)",
  },
  scroll: {
    backgroundColor: "rgba(255, 255, 255,1)",
  },
};

// Interface
interface SearchForm {
  keyword: string;
}
export default function Nav() {
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const isLogin = useRecoilValue(isLoginSelector);
  const [isLoginModal, setIsloginModal] = useRecoilState(isLoginModalAtom);
  const navigate = useNavigate();
  const [curState, setCurState] = useState(pathname === "/" ? "home" : pathname.slice(1));
  const { register, handleSubmit, reset } = useForm<SearchForm>();
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const navMenus = ["about", "map", "chart", "walking", "plogging"];
  const navKorMenus = ["소개", "지도", "통계", "산책로", "플로깅"];
  const userMenus = ["login", "register"];
  console.log(curState);

  const onvalid = (data: SearchForm) => {
    navigate(`/search?keyword=${data.keyword}`);
    console.log(data);
  };
  const toggleSearch = () => setSearchOpen(cur => !cur);
  useEffect(() => {
    scrollY.onChange(() => {
      // console.log(scrollY.get());
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, []);
  useEffect(() => {
    console.log(pathname);
    // setCurState();
  }, [pathname]);
  return (
    <Wrap variants={navVariants} initial="top" animate={navAnimation}>
      <LogoBox>
        <Link to="/">
          <Logo
            onClick={() => setCurState("home")}
            variants={LogoVariants}
            initial="normal"
            whileHover="active"
            viewBox="0 0 180 47"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.1648 0C29.5615 0 35.3571 2.59288 39.5469 6.78711C43.7411 10.977 46.3296 16.7682 46.3296 23.1648C46.3296 29.5615 43.7411 35.3571 39.5469 39.5469C39.3056 39.7882 39.0555 40.0251 38.8011 40.2576V36.6074C41.9073 32.9923 43.785 28.2979 43.785 23.1648C43.785 17.4701 41.4773 12.3151 37.7437 8.5859C34.0145 4.85671 28.8595 2.54901 23.1648 2.54901C17.4745 2.54901 12.3195 4.85671 8.5859 8.5859C4.85671 12.3151 2.54901 17.4701 2.54901 23.1648C2.54901 28.8595 4.85671 34.0145 8.5859 37.7437C9.06411 38.2176 9.55549 38.6694 10.0776 39.095V29.7984H10.082C10.082 29.4167 10.2531 29.0438 10.5733 28.7893L20.3219 21.2827C20.0806 21.1905 19.8393 21.0852 19.6023 20.9668C18.4573 20.4052 17.3166 19.598 16.2856 18.5669C15.2589 17.5447 14.4473 16.3952 13.8901 15.2546C13.2891 14.0261 12.9776 12.7889 12.9951 11.6745C12.9995 10.9857 13.5611 10.4329 14.2499 10.4198C15.3642 10.4066 16.5971 10.7181 17.8255 11.3148C18.2862 11.5429 18.7468 11.8062 19.1987 12.1133C19.2558 10.5426 19.5321 9.06411 19.9797 7.76109C20.5193 6.19483 21.3134 4.86988 22.283 3.92661C22.7743 3.4484 23.5597 3.4484 24.051 3.92661L24.0554 3.931C25.0206 4.86988 25.8147 6.19483 26.35 7.76109C26.7975 9.06411 27.0739 10.5426 27.1309 12.1133C27.5828 11.8062 28.0479 11.5429 28.5041 11.3148C29.7326 10.7181 30.9742 10.4066 32.0841 10.4198C32.7773 10.4329 33.3301 10.9901 33.3389 11.6745C33.3521 12.7889 33.045 14.0261 32.4439 15.2546C31.8823 16.3952 31.0751 17.5447 30.0441 18.5669C29.0174 19.598 27.8724 20.4052 26.7317 20.9668C26.4904 21.0852 26.2491 21.1905 26.0122 21.2827L35.6773 28.7279C36.0239 28.956 36.2564 29.3509 36.2564 29.7984V42.2802C33.8829 43.9079 31.1935 45.1056 28.2979 45.7593V45.7856L27.4468 45.9348C26.9115 46.0357 26.3675 46.119 25.8191 46.1805L25.7884 46.1848H25.7577L25.7226 46.1892L25.5647 46.2068L25.5032 46.2156L25.4374 46.2199L25.4067 46.2243H25.3716L25.3409 46.2287L25.2137 46.2419L25.183 46.2463H25.1172L25.025 46.2594H24.9943L24.9592 46.2638H24.8978L24.8627 46.2682L24.832 46.2726H24.8013L24.7706 46.277H24.7398L24.7047 46.2814H24.674L24.6126 46.2858H24.5775L24.5468 46.2901H24.5117L24.481 46.2945H24.4503L24.4327 46.2989H24.3889L24.3538 46.3033H24.2265L24.2178 46.3077H24.1607L24.13 46.3121H24.0642L24.0335 46.3165H23.9721L23.9414 46.3209H23.7132L23.6913 46.3252H23.5509L23.4895 46.3296H22.8358L22.8094 46.3252H22.6515L22.6164 46.3209H22.397L22.3005 46.3165H22.283L22.2654 46.3121H22.2347L22.1689 46.3077H22.1382L22.1075 46.3033H22.0066C21.9101 46.2989 21.8135 46.2901 21.7214 46.2858C20.7387 46.2243 19.7778 46.1059 18.8346 45.926L18.0361 45.7856V33.997H28.2979V43.1401C30.2239 42.6487 32.0403 41.8809 33.7074 40.8894V30.417L23.1648 22.3005L12.6266 30.417V43.8026C11.9597 43.456 11.3104 43.083 10.683 42.6838L10.6655 42.6706L10.6523 42.6663L10.6479 42.6619C9.24838 41.7625 7.95413 40.7139 6.78711 39.5469C2.59727 35.3571 0 29.5615 0 23.1648C0 16.7682 2.59727 10.977 6.78711 6.78711C10.9814 2.59288 16.7682 0 23.1648 0ZM20.3087 26.4816H22.8138V29.228H20.0674V26.4816H20.3087ZM23.7571 26.4816H26.2666V29.228H23.5202V26.4816H23.7571ZM26.2666 30.1713V32.6764H23.5202V29.9344H26.2666V30.1713ZM22.5769 32.6764H20.0674V29.9344H22.8138V32.6764H22.5769ZM20.5807 43.6227C20.7913 43.649 20.9975 43.6709 21.2081 43.6929H21.2344L21.2432 43.6973H21.2783L21.3046 43.7016H21.3397L21.3616 43.706H21.3704L21.4801 43.7148L21.5064 43.7192H21.5108L21.5371 43.7236H21.6161L21.6468 43.728H21.6775L21.7039 43.7324H21.717L21.7346 43.7367H21.7609L21.7828 43.7411H21.875L21.9013 43.7455H21.932L21.9583 43.7499H22.0153L22.0461 43.7543H22.0724L22.1031 43.7587H22.1294L22.1601 43.7631H22.3005L22.3312 43.7675H22.3883L22.419 43.7718H22.5023L22.533 43.7762H22.6471L22.6691 43.7806H23.6562L23.6869 43.7762H23.801L23.8097 43.7718H23.858L23.9457 43.7675H24.0028L24.0291 43.7631C24.13 43.7631 24.2265 43.7587 24.3274 43.7499H24.345L24.4898 43.7411H24.4942C24.6653 43.728 24.8364 43.7192 25.0075 43.7016C25.2532 43.6797 25.5032 43.6534 25.7489 43.6227V36.546H20.5807V43.6227ZM23.1604 18.5231L23.1648 18.545L23.178 18.5275L23.1824 18.5187L23.1955 18.4968V18.4924L23.2087 18.4704L23.2175 18.4617L23.2218 18.4485L23.235 18.4266L23.2482 18.4002L23.2569 18.3915L23.2613 18.3783L23.2745 18.3607L23.2789 18.352L23.292 18.33L23.3008 18.3037L23.314 18.2906L23.3315 18.2555L23.371 18.1809L23.3842 18.1545L23.3886 18.1502L23.4237 18.08V18.0756C23.6167 17.7027 23.7922 17.2859 23.9457 16.8427C24.3582 15.6362 24.5951 14.2235 24.5951 12.7187C24.5951 11.2051 24.3582 9.79679 23.9457 8.59029C23.7308 7.95413 23.4675 7.38378 23.1648 6.88802C22.8665 7.38378 22.6032 7.95413 22.3883 8.59029C21.9715 9.79679 21.7346 11.2051 21.7346 12.7187C21.7346 14.2235 21.9715 15.6362 22.3883 16.8427C22.5155 17.2069 22.6515 17.5535 22.8094 17.8781L22.8182 17.9001H22.8226L22.8314 17.9264L22.8358 17.9352L22.8489 17.9527L22.8533 17.9703L22.8884 18.0405L22.8972 18.0536L22.906 18.0756L22.9104 18.08L22.9454 18.1502V18.1545L22.963 18.1809L22.9674 18.1853L22.9849 18.2204L22.9893 18.2335L23.0025 18.2555L23.0156 18.2818L23.0244 18.2906L23.0288 18.3037L23.042 18.3256L23.0464 18.33L23.099 18.4266L23.1209 18.4617V18.4704L23.1385 18.4924V18.4968L23.1517 18.5187L23.1604 18.5231ZM16.7111 13.5962C16.3996 13.4426 16.0881 13.3154 15.7942 13.2189C15.8907 13.5216 16.0136 13.8287 16.1671 14.1402C16.6015 15.0264 17.2464 15.9258 18.0887 16.7682C18.7907 17.4701 19.5409 18.0361 20.2824 18.4573C20.1727 18.2028 20.0718 17.9396 19.9797 17.6676C19.7603 17.027 19.5804 16.3382 19.4488 15.6231L19.3435 15.5134C18.5011 14.6754 17.5974 14.0305 16.7111 13.5962ZM30.1625 14.1402C30.3161 13.8287 30.4433 13.5216 30.5442 13.2189C30.2415 13.3154 29.9344 13.4426 29.6185 13.5962C28.7367 14.0305 27.8329 14.6754 26.9949 15.5134L26.8852 15.6231C26.7536 16.3382 26.5737 17.027 26.35 17.6676C26.2622 17.9396 26.1569 18.2028 26.0516 18.4573C26.7975 18.0361 27.5389 17.4701 28.2453 16.7682C29.0832 15.9258 29.7326 15.0264 30.1625 14.1402Z"
              fill="#008037"
            />
            <path
              d="M60.5133 33.348V34.2518H81.3309V37.5817H54.1956V30.1935H75.0133V29.2547H54.1956V25.9247H64.6066V24.0865H53.5024V19.4008H82.0241V24.0865H70.9199V25.9247H81.3309V33.348H60.5133ZM53.8841 8.88893H81.6424V12.877H77.8255V14.1624H81.8135V18.1505H53.713V14.1624H57.8064V12.877H53.8841V8.88893ZM64.1196 14.1624H71.5122V12.877H64.1196V14.1624Z"
              fill="#008037"
            />
            <path
              d="M86.0808 8.88895H91.8062V10.8325H97.7729V8.88895H103.498V22.1429H86.0808V8.88895ZM86.774 25.4729H97.2552V23.1827H103.568V25.4729H114.08V29.983H101.972L93.8551 37.4106H86.8793L95.0001 29.983H86.774V25.4729ZM114.08 23.8759H107.767V8.19576H114.08V23.8759ZM100.48 32.725H114.08V37.4106H100.48V32.725ZM97.7729 17.6328V15.3426H91.8062V17.6328H97.7729Z"
              fill="#008037"
            />
            <path
              d="M136.111 8.88895V37.4106H119.041V8.88895H136.111ZM145.825 19.5764H149.712V24.6042H145.825V37.4106H139.512V8.19576H145.825V19.5764ZM125.113 13.9212V32.3784H130.039V13.9212H125.113Z"
              fill="#008037"
            />
            <path
              d="M180 22.1429H173.687V8.19576H180V22.1429ZM159.011 32.3784V33.6288H180V37.4106H152.694V28.737H173.687V27.4515H152.694V23.6697H180V32.3784H159.011ZM169.418 8.88895V22.1429H163.346V13.9212H160.955L157.103 22.1429H151.031L157.239 8.88895H169.418Z"
              fill="#008037"
            />
          </Logo>
        </Link>
      </LogoBox>
      <MenuBox>
        <Items>
          {navMenus.map((menu, index) => (
            <Link key={index} to={menu}>
              <Item onClick={() => setCurState(menu)}>
                {navKorMenus[index]}
                {curState === menu && <CurCircle layoutId="point" />}
              </Item>
            </Link>
          ))}
        </Items>
      </MenuBox>
      <UserBox onClick={() => setIsloginModal(cur => !cur)}>
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="45" height="45" fill="url(#pattern0)" />
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use href="#image0_5_230" transform="scale(0.0104167)" />
            </pattern>
            <image
              id="image0_5_230"
              width="96"
              height="96"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAEHklEQVR4nO3czYscRRiA8afEkE2MSTwIGwRXIxuUmPixePAjEXPwYK6ioOA/IBo8BEVUVEQhiOjFb28SxbuCkES8JAcjroqiRtw1Kgme/NgJujk8HnoWJ4HNzvTMdNVk3h/saal+q953umeqq6shhBBCCCGEEEIIIYyLlLsD3VLXA7uBXcB1wBXAxva//wDmgVngEPBhSunvHP0876hb1HfUlt1rqW+r07n7P7LUNeqL6ukeEn+2RXWfOpF7PCNFnVa/7iPxZzuibso9rpGg3qD+PsDkL/lF3Z57fEWz+uQPI/mdRZjMPc4iqRPq7BCTv+Souib3eJdckLsDHZ6j+nk5bDPAYw3E6UoR8wB1C/ANcGFDIReA6ZTSyYbiLauUM+BRmks+wDrgqQbjLSv7GWA1wz0BrG04dAvYlHvGXMIZsJvmkw9wEXBXhrhnKKEAu8Y0NlBGAZr45bOc7BOzEgpwZcbYmzPGBsoowPqMsTdkjA2UUYCxVkIB/soY+8+MsYEyCjCXMfZPGWMDZRRgNmPsLzPGBsoowKGMsQ9mjA2UcStiHXCSambapBYwmVJaaDjuGbKfAe0EvJ8h9P7cyYcCzgCoVsKobkevaijkInBNSim+hAFSSseAlxsM+VIJyS9Ke0nySANLkofV1bnHWyR1Uj0+xOT/pl6We5xFU7dbPb0waMfVbbnHNxLUS9VPB5j8w8bjKL1RV6vPqAt9JP5f9Xnjml+f1ffCqz0WYkF9Q81+v38lRcwDumE1Y94N3AFcT7WQ0/l4+hzwBfAJ8FEJk6wQQgghhBBCCCGEEEI4U/ve/0712gZibVN3jP0agTqjPqkeVE+17+OfUC8fYswp9WQ71in1gPqEeuOwYhZF3ao+rX5/jsWUOfWqIcSeUo+dI+68+op6mzoy6yQrUi9RH1F/6HI1S/VX9ZYB9uHW9jG79Z26R9248tELpV5t9c6eXt7z02nRak249msF1LXqs9Z/5c2C+qbVRvLRoG6yWo/t5z0/nebVh6yWJLvtw8Xqw+rPA+rDafU1h/BkxcCudeoq4HFgL8N50rkFfAwcoNpTMEe1FgzV2vBmqh2Xd7b/hrH3uAXsA15IKZ0exAEHUgB1CtgPDOy6XbjPgPtSSj/2e6C+H85V7wW+YnySD3ATcFS9u98D9VUAdQ/wHnm3muayAfhAfbCfg9S+BKn3UG2sOH9+M9cj8EBK6d06jWslT90KfA6M93T+f/8AMymlb3ttWPcS9BaR/E4TwOt1GvZcAHUXcHOdYOe5HertvTaqcwbcX6PNuOg5N3UKsKNGm3Gxs9cGPX8Jqy3yvOFqFLRSSl3fMoF6BbDXNuMkpdRTTovYpjrOogCZRQEyiwJkFgXILAqQWRQgsyhAZlGAEEIIIYQQQgghhBAa8h8v/e80AMTCzAAAAABJRU5ErkJggg=="
            />
          </defs>
        </svg>
        <UserName>{isLogin ? "사용자" : "손님"}</UserName>
      </UserBox>
      {isLoginModal && <LoginModal></LoginModal>}
    </Wrap>
  );
}
