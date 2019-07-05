import React, { Component } from 'react';
import CountUp from 'react-countup';
import styled from 'styled-components';
import colors from '../styles/colors';

const StyledDiv = styled.div`
    width: 100%    
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    flex-wrap: wrap

    &:div {
        width: 200px;
        min-width: 150px;
        margin: 20px
    }
    h2 {
      text-transform: uppercase;
    }
`;

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      datasets: 0,
      tissues: 0,
      compounds: 0,
      // cells: 0,
      combos: 0,
      experiments: 0,
      datapoints: 0,
    };
  }

  componentDidMount() {
    // database call (takes too long, using hardcoded values for now)
    // fetch('/api/stats/')
    //   .then(response => response.json())
    //   .then((data) => {
    //     const {
    //       cells, tissues, combos, experiments, datapoints,
    //     } = data;
    //     this.setState({
    //       cells, tissues, combos, experiments, datapoints,
    //     });
    //   });
    this.setState({
      datasets: 7,
      tissues: 11,
      compounds: 1965,
      // cells: 184,
      combos: 14634,
      experiments: 475278,
      datapoints: 6059248,
    });
  }

  render() {
    const {
      cells, datasets, tissues, compounds, combos, experiments, datapoints,
    } = this.state;
    const easeInOut = (t, b, c, d) => {
      if (t === 0) return b;
      if (t === d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };
    return (
      <StyledDiv className="stasts">
        <div>
          <h2>Datasets</h2>
          <h2>
            <CountUp
              start={0}
              end={datasets}
              duration={3}
              easingFn={easeInOut}
            />
          </h2>
        </div>
        {/* <div>
          <h2>Cell Lines</h2>
          <h2>
            <CountUp
              start={0}
              end={cells}
              duration={3}
              easingFn={easeInOut}
            />
          </h2>
        </div> */}
        <div>
          <h2>Tissues</h2>
          <h2>
            <CountUp
              start={0}
              end={tissues}
              duration={3}
              easingFn={easeInOut}
            />
          </h2>
        </div>
        <div>
          <h2>Compounds</h2>
          <h2>
            <CountUp
              start={0}
              end={compounds}
              duration={3}
              easingFn={easeInOut}
            />
          </h2>
        </div>
        <div>
          <h2>Combinations</h2>
          <h2>
            <CountUp
              start={0}
              end={combos}
              duration={3}
              easingFn={easeInOut}
            />
          </h2>
        </div>
        <div>
          <h2>Experiments</h2>
          <h2>
            <CountUp
              start={0}
              end={experiments}
              duration={3}
              easingFn={easeInOut}
            />
          </h2>
        </div>
        <div>
          <h2>Data points</h2>
          <h2>
            <CountUp
              start={0}
              end={datapoints}
              duration={3}
              easingFn={easeInOut}
            />
          </h2>
        </div>
      </StyledDiv>
    );
  }
}


export default Stats;
