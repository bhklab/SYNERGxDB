/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import ConsistencyDsetPlot from './Plots/ConsistencyDsetPlot';

const StyledConsistencyDsetContainer = styled.div`
.consistencyDsetContainer {
    display: flex;
  }

  .consistencyGrid {
    display: flex;
    flex-wrap: wrap;
    min-height: 0;
    min-width: 0;
    .consistencyDsetContainer {
      // flex: 1 45%;
      width: 45%;
    }
  }
`;


const ConsistencyDsetContainer = (props) => {
  const { data } = props;
  const [selected, setSelected] = useState('bliss');
  useEffect(() => {
    const methods = ['ZIP', 'Bliss', 'Loewe', 'HSA'];
    // dropdown to choose the method
    const dropdown = d3.select('.selectDset')
      .append('select')
      .on('change', () => {
        setSelected(dropdown.property('value').toLowerCase());
      });

    dropdown.selectAll('option')
      .data(methods)
      .enter()
      .append('option')
      .property('selected', (d) => { // roundabout way to make a default value but ok
        if (d.toLowerCase() === selected) {
          return d;
        }
      })
      .attr('value', d => d)
      .text(d => d);
  }, []);

  return (
    <StyledConsistencyDsetContainer className="consistencyDsetContainer">
      <div className="selectDset" />
      <div className="consistencyGrid">
        {Object.keys(data).map((x, i) => (
          <Fragment key={x}>
            {/* if any have all null points (on either x or y), remove */}
            {data[x][selected].every(n => n.x === null) || data[x][selected].every(n => n.y === null) ? null : (
              <div className="consistencyDsetContainer">
                <ConsistencyDsetPlot
                  plotId={`consistencyDsetPlot${i}`}
                  data={data[x]}
                  score={selected}
                  dsets={x}
                  single={Object.keys(data).length === 1}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>

    </StyledConsistencyDsetContainer>

  );
};

export default ConsistencyDsetContainer;
