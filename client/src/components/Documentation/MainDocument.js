/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import transitions from '../../styles/transitions';

import GeneralDoc from './Documentation';
import APIDoc from './APIdocumentation';

const StyledDiv = styled.div`
  padding: 10px;
  width: 100%;
  main {
    display: flex;
    max-width: 1200px;
    padding: 30px;
    text-align: justify;
    font-size: 20px;
    min-height: 80vh;
    &.documentation {
        width: 100%;
      background:white;
      font-family: Nunito Sans, sans-serif;
      color:${colors.nav_links};
      h1, h2 {
        margin: 25px 0;
      }
      span {
        font-size: 20px;
      }
      h2 {
        padding:20px 0px;
      }
    }
    .doc {
        margin-left: 300px;
    }
    nav {
        margin-top: 25px;
        position: fixed;

        li {
            padding: 20px 10px;
            margin-bottom: 5px;
            border-left: 2px solid ${colors.color_main_2}
            transition: ${transitions.main_trans}

            &.selected {
                border-left:2px solid ${colors.color_main_5}
                button {
                    color: ${colors.color_main_5}
                }
            }
        }
        button {
            border: 0;
            padding: 0;
            backgound-color: white;
            color: ${colors.color_main_2}
            outline: none;
            transition: ${transitions.main_trans}
        }
    }
    ol {
      list-style: none;
      padding: 10px 0;
    }
  } 
  footer {
    text-align: center;
    color: ${colors.color_main_2}
    font-size: 20px;
  }
`;

class MainDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'func',
    };
    this.handleDocChange = this.handleDocChange.bind(this);
  }

  handleDocChange(display) {
    this.setState({ display });
  }

  render() {
    const { handleDocChange } = this;
    const { display } = this.state;
    return (

      <StyledDiv>
        <main className="documentation">
          <nav>
            <ul>
              <li
                className={display === 'func' ? 'selected' : null}
              >
                <button type="button" onClick={() => handleDocChange('func')}>Functionality</button>
              </li>
              <li
                className={display === 'api' ? 'selected' : null}
              >
                <button type="button" onClick={() => handleDocChange('api')}>API</button>
              </li>
            </ul>
          </nav>
          <div className="doc">
            {display === 'func' ? <GeneralDoc /> : <APIDoc />}
          </div>
        </main>
        <footer>
          <p>Copyright © 2019. All rights reserved</p>
        </footer>
      </StyledDiv>
    );
  }
}

export default MainDocument;
