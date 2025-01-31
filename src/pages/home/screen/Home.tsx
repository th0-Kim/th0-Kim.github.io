import React from "react";
import styled from "styled-components";

import Header from "components/Header";
import Footer from "components/Footer";
import ProjectList from "pages/home/component/ProjectList";
import HistoryList from "pages/home/component/HistoryList";

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Header />
      <Main>
        <ProjectList />
        <HistoryList />
      </Main>
      <Footer />
    </HomeContainer>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 138rem;
  gap: 10rem;
  margin: 10rem auto 16rem;
`;
const HomeContainer = styled.div``;

export default Home;
