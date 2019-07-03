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
`;

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      stats: {},
    };
  }

  componentDidMount() {
    fetch('/api/stats/')
      .then(response => response.json())
      .then((stats) => {
        this.setState({ stats });
      });
  }

  render() {
    const { stats } = this.state;
    if (stats.cells) {
      return (
        <StyledDiv className="stats">
          <div>
            <h2>Cell Lines</h2>
            <h2>
              <CountUp
                start={0}
                end={stats.cells}
                duration={3}
              />
            </h2>
          </div>
          <div>
            <h2>Tissues</h2>
            <h2>
              <CountUp
                start={0}
                end={stats.tissues}
                duration={3}
              />
            </h2>
          </div>
          <div>
            <h2>Drug Combinations</h2>
            <h2>
              <CountUp
                start={0}
                end={stats.combos}
                duration={3}
              />
            </h2>
          </div>
          <div>
            <h2>Experiments</h2>
            <h2>
              <CountUp
                start={0}
                end={stats.experiments}
                duration={3}
              />
            </h2>
          </div>
          <div>
            <h2>Datapoints</h2>
            <h2>
              <CountUp
                start={0}
                end={stats.datapoints}
                duration={3}
              />
            </h2>
          </div>
        </StyledDiv>
      );
    }
    return null;
  }
}


export default Stats;
