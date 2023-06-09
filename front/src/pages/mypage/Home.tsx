import React from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row, GreenAccent } from "@style/Layout";
import styled from "styled-components";
import { getSummaryGreenCrews } from "@api/greenCrew";
import { useQuery } from "@tanstack/react-query";
import { IGreenCrew, SummaryGreenCrew } from "@type/greenCrew";
import { User } from "@type/user";
import dayjs from "dayjs";
import "dayjs/locale/ko";
// dayjs.locale("ko");

export function changeDayForm(date: Date) {
  const formatDate = dayjs(date).format(`YYYY.MM.DD(dddd) A HH:MM`);
  return formatDate.replace("요일", "");
}

export default function Home({ user }: { user: User }) {
  const { data: greenCrews } = useQuery<SummaryGreenCrew[] | undefined>(["summaryGreenCrew"], getSummaryGreenCrews, {
    onSuccess(data) {
      console.log("mypage query 작동", data);
    },
  });
  return (
    <HomeWrap>
      <HomeContainer height="20%">
        <GrayTitle>
          <Title>{user.name}</Title>님 <Title>풀빛마실</Title>에<Title>{user.greenCrews?.length}회</Title> 참여하셨어요!
        </GrayTitle>
      </HomeContainer>
      <HomeContainer height="80%">
        <GrayTitle>
          현재 진행 중인 <Title>풀빛마실</Title>
        </GrayTitle>
        <List>
          {greenCrews?.map(greenCrew => (
            <Item>
              <ContentBox>
                <ItemTitle>
                  {greenCrew?.title}
                  <ItemCourse as="span">({greenCrew?.course})</ItemCourse>
                </ItemTitle>

                <Box>
                  <ItemDate>{changeDayForm(greenCrew?.startAt)}</ItemDate>
                </Box>
              </ContentBox>
            </Item>
          ))}
        </List>
      </HomeContainer>
    </HomeWrap>
  );
}
const HomeWrap = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;
const HomeContainer = styled(Container)<{ height: string }>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => props.height};
`;
export const List = styled(Container)`
  flex-direction: column;
`;
const GrayTitle = styled(Title)`
  font-size: 22px;
  color: ${props => props.theme.textColor};
`;

export const Item = styled(Box)`
  width: 100%;
  justify-content: center;
  margin: 10px 0px;
  border-radius: 5px;
`;
export const ContentBox = styled(Box)`
  width: 540px;
  height: 60px;
  padding: 0px 15px;
  justify-content: space-between;
  background-color: ${props => props.theme.weekBorderColor};
`;
export const ItemTitle = styled(SubTitle)`
  font-size: 20px;
  color: ${props => props.theme.textColor};
`;
export const ItemCourse = styled(SubTitle)`
  font-size: 16px;
  color: ${props => props.theme.mainColor};
`;
export const ItemDate = styled(ItemTitle)`
  font-size: 16px;
  margin-right: 10px;
`;
