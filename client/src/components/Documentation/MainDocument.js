/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import transitions from '../../styles/transitions';
import APIDoc from './APIdocumentation';
import FunctionalDoc from './FunctionalDoc';

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
        margin-left: 30px;
    }
    nav {
        margin-top: 25px;
        // position: fixed;
        max-width:300px;

        li {
            padding: 10px;
            margin-bottom: 5px;
            border-left: 2px solid ${colors.color_main_2}
            transition: ${transitions.main_trans}

            &.selected {
                border-left:2px solid ${colors.color_main_5}
                button {
                    color: ${colors.color_main_5}
                }
            }
            &.sub-head {
              font-size: 18px;
              margin-left:10px;
              padding: 10px;
              border-left: none;
              font-weight: bold;
            }
            &.sub-func {
              font-size: 15px;
              margin-left:25px;
              padding: 10px;
              border-left: none;
            }
          }
          button {
            border: 0;
            padding: 0;
            background: white;
            color: ${colors.color_main_2}
            outline: none;
            transition: ${transitions.main_trans};
            cursor: pointer;
            text-align:left;
          }
    }
    ol {
      list-style: none;
      padding: 10px 0;
    }
  } 
  footer {
    text-align: center;
    font-size: 20px;
    color: ${colors.color_main_2}
  }
`;

class MainDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'overview',
      type: 'general',
    };
    this.handleDocChange = this.handleDocChange.bind(this);
  }

  handleDocChange(display) {
    switch (display) {
      case 'overview':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'search':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'syn':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'samples':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'compounds':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'datasets':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'pharmaco':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'biomarker':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'sensitivity':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'enrichment':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'consistency':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'detailed':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'use':
        this.setState({
          display, type: 'general',
        });
        break;
      default:
        this.setState({ display, type: 'api' });
        break;
    }
  }

  render() {
    const { handleDocChange } = this;
    const {
      display, type,
    } = this.state;
    return (

      <StyledDiv>
        <main className="documentation">
          <nav>
            <ul>
              <li
                className={display === 'overview' ? 'selected' : null}
              >
                <button type="button" onClick={() => handleDocChange('overview')}>Functionality</button>
              </li>
              {/* Functionality sub-features */}
              {/* Basic features */}
              <li className="sub-head">Basic Features</li>
              <li
                className={display === 'search' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('search')}>Search</button>
              </li>
              <li
                className={display === 'syn' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('syn')}>Synergy Scores</button>
              </li>
              <li
                className={display === 'samples' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('samples')}>Samples</button>
              </li>
              <li
                className={display === 'compounds' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('compounds')}>Compounds</button>
              </li>
              <li
                className={display === 'datasets' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('datasets')}>Datasets</button>
              </li>
              {/* Advanced features */}
              <li className="sub-head">Advanced Features</li>
              <li
                className={display === 'pharmaco' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('pharmaco')}>Pharmacogenomics Analysis</button>
              </li>
              <li
                className={display === 'biomarker' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('biomarker')}>Biomarker discovery</button>
              </li>
              <li
                className={display === 'sensitivity' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('sensitivity')}>Cell line sensitivity analysis</button>
              </li>
              <li
                className={display === 'enrichment' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('enrichment')}>Tissue-specific enrichment analysis</button>
              </li>
              <li
                className={display === 'consistency' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('consistency')}>Consistency in synergy scores</button>
              </li>
              <li
                className={display === 'detailed' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('detailed')}>Detailed synergy scores</button>
              </li>
              {/* Use case */}
              <li
                className={display === 'use' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('use')}>Use case</button>
              </li>
              {/* Functionality sub-features end */}
              {/* API */}
              <li
                className={display === 'api' ? 'selected' : null}
              >
                <button type="button" onClick={() => handleDocChange('api')}>API</button>
              </li>
              <li
                className={display === 'api-cells' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-cells')}>Samples</button>
              </li>
              <li
                className={display === 'api-drugs' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-drugs')}>Compounds</button>
              </li>
              <li
                className={display === 'api-datasets' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-datasets')}>Datasets</button>
              </li>
              <li
                className={display === 'api-combos' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-combos')}>Drug Combinations</button>
              </li>
              <li
                className={display === 'api-biomarkers' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-biomarkers')}>Biomarkers</button>
              </li>
              <li
                className={display === 'api-pharma' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-pharma')}>Pharmacogenomics</button>
              </li>
            </ul>
          </nav>
          <div className="doc">
            {type === 'general' ? (
              <FunctionalDoc display={display} />
            ) : (
              <APIDoc display={display} />
            )}
            {/* {display === 'func' ? <GeneralDoc /> : <APIDoc />} */}
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
