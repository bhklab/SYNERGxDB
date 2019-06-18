import React, { Fragment } from 'react';

import styled from 'styled-components';
import SearchCombos from './SearchCombos';
import colors from '../styles/colors';
import banner from '../images/banner.png';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h2 {
    color: ${colors.color_main_2};
  }
`;

const StyledBanner = styled.img`
  max-width: 500px;
`;

const Home = () => (
  <Fragment>
    <header>
      <div className="wrapper">
        <h1>SYNERGxDB</h1>
      </div>
    </header>
    <main>
      <StyledWrapper className="wrapper">
        <StyledBanner src={banner} alt="banner" />
        <h2>
            SYNERGxDB is a database that allows users to ... drug combinations.
            Synergistic drug combination ... in chemotherapy of cancer.
        </h2>
        <SearchCombos />
      </StyledWrapper>
    </main>
    <footer>
      <div className="wrapper">
        <p>Copyright © 2019. All rights reserved</p>
      </div>
    </footer>
  </Fragment>
);


export default Home;
