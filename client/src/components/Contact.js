/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  background:white;
  padding:0px;
  margin-top: 120px;

  .content {
      width: 100%;
      text-align:center;
      line-height: 2em;
  }

  a {
    color: ${colors.color_main_5};
  }
  iframe {
      margin: 30px 0px 60px 0px;
      width: calc(20vw + 270px);
      height: 400px;
      border: none;
  }
`;


const Contact = () => (
  <Fragment>
    <StyledWrapper className="wrapper">
      <h1>Contact Us</h1>
      <div className="content">
        <b>Email: </b>
        {' '}
        <a href="mailto: support@synergxdb.ca">support@synergxdb.ca</a>
        {' '}
        <p />
        <b>BHKLAB</b>
        {' '}
        <br />
              The MaRS Center
        <br />
              TMDT room 11-310
        <br />
              101 College Street Toronto, ON
        <br />
              M5G 1L7, Canada
      </div>
      <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.43444669756!2d-79.39085344846093!3d43.65993365990993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34b632b77689%3A0x901c210dff19e5a4!2s101%20College%20St%2C%20Toronto%2C%20ON%20M5G%201L7!5e0!3m2!1sen!2sca!4v1581544280286!5m2!1sen!2sca" />

    </StyledWrapper>
    <footer>
      <div className="footer-wrapper">
        <p>Copyright © 2019. All rights reserved</p>
      </div>
    </footer>
  </Fragment>
);


export default Contact;
