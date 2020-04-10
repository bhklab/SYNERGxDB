/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import ConsistencyPlot from './Plots/ConsistencyPlot';

const StyledConsistencyContainer = styled.div`
.consistencyContainer {
    display: flex;

    .selectX {
      margin-left: 460px;
      margin-top: 500px;
      
    }
  
    .selectY {
      margin-left: 0px;
      margin-top: 250px;
    }
  }

  .consistencyGrid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .consistencyContainer {
      flex: 45%;
      width: 45%;
    }

    .selectX {
      margin-left: 250px;
      margin-top: 400px;
      
    }
  
    .selectY {
      margin-left: 50px;
      margin-top: 20px;
    }
  }
`;


const ConsistencyContainer = (props) => {
  const { data, allData, datasets } = props;
  const [xvalue, setXValue] = useState('Bliss');
  const [yvalue, setYValue] = useState('Loewe');

  useEffect(() => {
    setXValue('Bliss');
    setYValue('Loewe');
    const plotDropdowns = () => {
      const methods = ['ZIP', 'Bliss', 'Loewe', 'HSA'];

      // dropdown to choose the method
      const dropdownX = d3.select('.consistencyContainer')
        .append('select')
        .attr('class', 'selectX')
        .on('change', () => {
          // d3.selectAll('.scatter').remove();
          setXValue(dropdownX.property('value'));
          // CALL
        });


      dropdownX.selectAll('option')
        .data(methods)
        .enter()
        .append('option')
        .property('selected', (d) => { // roundabout way to make a default value but ok
          if (d === xvalue) {
            return d;
          }
        })
        .attr('value', d => d)
        .text(d => d);


      const dropdownY = d3.select('.consistencyContainer')
        .append('select')
        .attr('class', 'selectY')
        .on('change', () => {
          // d3.selectAll('.scatter').remove();
          setYValue(dropdownY.property('value'));
          // CALL
        });

      dropdownY.selectAll('option')
        .data(methods)
        .enter()
        .append('option')
        .property('selected', (d) => { // roundabout way to make a default value but ok
          if (d === yvalue) {
            return d;
          }
          return null;
        })
        .attr('value', d => d)
        .text(d => d);

      // CALL
    };
    plotDropdowns('consistencyPlot');
  }, []);

  return (
    <StyledConsistencyContainer>
      <div className="consistencyContainer">
        <ConsistencyPlot
          plotId="consistencyPlotAll"
          data={allData}
          datasets={datasets}
          xvalue={xvalue}
          yvalue={yvalue}
        />
      </div>
      <div className="consistencyGrid">
        {Object.keys(data).map(x => (
          <div key={x} className="consistencyContainer">
            <ConsistencyPlot
              plotId={`consistencyPlot${x}`}
              data={data[x]}
              datasets={datasets}
              xvalue={xvalue}
              yvalue={yvalue}
            />
          </div>
        ))}
      </div>
    </StyledConsistencyContainer>

  );
};

export default ConsistencyContainer;
