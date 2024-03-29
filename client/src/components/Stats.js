/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
import React, { Component } from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors';

const StyledDiv = styled.div`
    width: 100%;
    bottom:0%;
    left:0px;
    position:fixed;  
    display: flex;
    min-height:80px;
    line-height:0.8em;
    align-items: flex-end;
    justify-content: space-around;
    flex-wrap: wrap;
    background:rgba(255, 255, 255, 0.7);
    color: ${colors.nav_links} !important;
    font-family: 'Montserrat', sans-serif;

    @media (max-width: 1025px) {
      h2 {
        font-size: 1em !important;
      }
    }

    
    @media (max-height : 900px) {
      h2 {
        font-size: 1.1em !important;
        line-height: 0.6em;
      }
      min-height: 70px;
    }
    
    @media (max-width: 649px) {
      position: static;
      margin-top:50px;
      h2 {
        font-size: 0.8em !important;
      }
    }
    div {
        padding: 0 10px; 
        max-width: 175px;
        min-width: 126px;
    }
    h2 {
      color: ${colors.nav_links} !important;
      font-family: 'Montserrat', sans-serif;
      font-weight:500;
      font-size: 1.3em;
      text-align:center;
    }
`;

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      datasets: 0,
      tissues: 0,
      compounds: 0,
      cells: 0,
      combos: 0,
      experiments: 0,
      measurements: 0,
    };
  }

  componentDidMount() {
    // database call (takes too long, using hardcoded values for now)
    // fetch('/api/stats/')
    //   .then(response => response.json())
    //   .then((data) => {
    //     const {
    //       cells, tissues, combos, experiments, measurements,
    //     } = data;
    //     this.setState({
    //       cells, tissues, combos, experiments, measurements,
    //     });
    //   });
    this.setState({
      datasets: 9,
      tissues: 15,
      compounds: 1977,
      cells: 151,
      combos: 22507,
      experiments: 536596,
      measurements: 6678592,
    });
  }

  render() {
    const {
      datasets, tissues, compounds, combos, experiments, measurements, cells,
    } = this.state;
    // const easeInOut = (t, b, c, d) => {
    //   if (t === 0) return b;
    //   if (t === d) return b + c;
    //   if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    //   return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    // };
    return (
      <StyledDiv className="stats">
        <div>
          <Link to="/datasets/">
            <h2>
              <CountUp
                start={0}
                end={datasets}
                duration={3}
                // easingFn={easeInOut}
                separator=","
              />
            </h2>
            <h2>Datasets</h2>
          </Link>
        </div>
        <div>
          <Link to="/cell-lines/">
            <h2>
              <CountUp
                start={0}
                end={tissues}
                duration={3}
                // easingFn={easeInOut}
                separator=","
              />
            </h2>
            <h2>Tissues</h2>
          </Link>
        </div>
        <div>
          <Link to="/cell-lines/">
            <h2>
              <CountUp
                start={0}
                end={cells}
                duration={3}
                // easingFn={easeInOut}
                separator=","
              />
            </h2>
            <h2>Cell lines</h2>
          </Link>
        </div>
        <div>
          <Link to="/drugs/">
            <h2>
              <CountUp
                start={0}
                end={compounds}
                duration={3}
                // easingFn={easeInOut}
                separator=","
              />
            </h2>
            <h2>Compounds</h2>
          </Link>
        </div>
        <div>
          <h2>
            <CountUp
              start={0}
              end={combos}
              duration={3}
              // easingFn={easeInOut}
              separator=","
            />
          </h2>
          <h2>Combinations</h2>

        </div>
        <div>
          <h2>
            <CountUp
              start={0}
              end={experiments}
              duration={3}
              // easingFn={easeInOut}
              separator=","
            />
          </h2>
          <h2>Experiments</h2>

        </div>
        <div>
          <h2>
            <CountUp
              start={0}
              end={measurements}
              duration={3}
              // easingFn={easeInOut}
              separator=","
            />
          </h2>
          <h2>Measurements</h2>

        </div>
      </StyledDiv>
    );
  }
}


export default Stats;
