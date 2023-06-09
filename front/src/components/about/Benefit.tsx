import {
  AboutContent,
  Title,
  SubTitle as SubTitleGuide,
  GreenAccent,
  Desc as DescGuide,
  Box,
  Row as RowGuide,
} from "@style/Layout";
import React from "react";
import styled from "styled-components";

export default function Benefit() {
  return (
    <Wrap>
      <Title>플로깅의 장점</Title>
      <Row height="50%" className="subTitle">
        <Img src="/assets/icon/double_quotes_start.svg" alt="" />
        <SubTitle>
          <GreenAccent>운동을 통한 체력, 환경보호, 건강한 마음</GreenAccent>이라는
          <br />세 마리 토끼를 잡을 수 있어요.
        </SubTitle>
        <Img src="/assets/icon/double_quotes_end.svg" alt="" />
      </Row>
      <Row className="between">
        <BenefitBox color="#88CAAE">
          <BoxTitle>
            운동을 통한 건강한 <GreenAccent>체력</GreenAccent>
          </BoxTitle>

          <Desc>
            쓰레기를 주울 때 앉았다 일어나는 <br />
            동작을 반복해야 하기 때문에 단순히 걷거나 뛰는 유산소 운동보다
            <br /> 칼로리 소모량이 많습니다.
          </Desc>
        </BenefitBox>
        <BenefitBox color="#6AB8FF">
          <Row>
            <BoxTitle>
              지구를 지키는 <GreenAccent> 환경운동</GreenAccent>
            </BoxTitle>
          </Row>
          <Desc>
            주변의 담배꽁초, 종이, <br />
            플라스틱 등의 생활 쓰레기를 <br />
            줍는 것 만으로 지구를 위한 훌륭한 환경 운동이 됩니다.
          </Desc>
        </BenefitBox>
        <BenefitBox color="#FFBEBE">
          <BoxTitle>
            산책으로 지키는 <GreenAccent>건강한 마음</GreenAccent>
          </BoxTitle>
          <Desc>
            야외에서 시원한 공기를 마시며 <br />
            걷는 것 만으로도 상쾌한 기분이 <br />
            들고, 활력이 생겨 정신 건강에 <br />
            도움을 줍니다.
          </Desc>
        </BenefitBox>
      </Row>
    </Wrap>
  );
}
const Wrap = styled(AboutContent)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BenefitBox = styled(Box)<{ color: string }>`
  flex-direction: column;
  width: 290px;
  height: 190px;
  border: solid 2px ${props => props.color};
  border-radius: 20px;
  padding: 0px 20px;
  background-color: rgba(255, 255, 255, 0.7);
`;
const BoxTitle = styled(SubTitleGuide)`
  font-family: "Sebang";
  font-size: 18px;
`;
const Row = styled(RowGuide)`
  justify-content: center;
  &.between {
    justify-content: space-between;
  }
  &.subTitle {
    width: 80%;
    justify-content: space-between;
  }
`;
const SubTitle = styled(SubTitleGuide)`
  font-size: 22px;
  font-family: "Sebang";
  text-align: center;
  line-height: 1.5;
`;
const Img = styled.img`
  margin-top: -70px;
`;
const Desc = styled(DescGuide)`
  text-align: center;
  color: #393c3e;
  letter-spacing: 0.5px;
  line-height: 1.3;
  margin-top: 22px;
`;
