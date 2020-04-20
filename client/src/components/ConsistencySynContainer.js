/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import ConsistencySynPlot from './Plots/ConsistencySynPlot';

const StyledConsistencySynContainer = styled.div`
.consistencySynContainer {
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
    flex-wrap: wrap;
    min-height: 0;
    min-width: 0;
    .consistencySynContainer {
      // flex: 1 45%;
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


const ConsistencySynContainer = (props) => {
  const { data, allData, datasets } = props;
  const [xvalue, setXValue] = useState('Bliss');
  const [yvalue, setYValue] = useState('Loewe');

  useEffect(() => {
    setXValue('Bliss');
    setYValue('Loewe');
    const plotDropdowns = () => {
      const methods = ['ZIP', 'Bliss', 'Loewe', 'HSA'];

      // dropdown to choose the method
      const dropdownX = d3.select('.consistencySynContainer')
        .append('select')
        .attr('class', 'selectX')
        .on('change', () => {
          setXValue(dropdownX.property('value'));
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


      const dropdownY = d3.select('.consistencySynContainer')
        .append('select')
        .attr('class', 'selectY')
        .on('change', () => {
          setYValue(dropdownY.property('value'));
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
    };
    plotDropdowns('consistencyPlot');
  }, []);

  return (
    <StyledConsistencySynContainer>
      <div className="consistencySynContainer">
        <ConsistencySynPlot
          plotId="consistencyPlotAll"
          data={allData}
          datasets={datasets}
          xvalue={xvalue}
          yvalue={yvalue}
        />
      </div>
      {Object.keys(data).length <= 1 ? null : (
        <div className="consistencyGrid">
          {Object.keys(data).map((x, i) => {
            // if data is all null on either axis by itself, do not plot
            const isNullX = [...new Set(data[x].map(item => item[xvalue.toLowerCase()]))];
            const isNullY = [...new Set(data[x].map(item => item[yvalue.toLowerCase()]))];
            if ((isNullX.length === 1 && isNullX[0] === null) || (isNullY.length === 1 && isNullY[0] === null)) {
              return null;
            }
            return (
              <div key={x} className="consistencySynContainer">
                <ConsistencySynPlot
                  plotId={`consistencyDsetPlot${x}`}
                  data={data[x]}
                  datasets={datasets}
                  xvalue={xvalue}
                  yvalue={yvalue}
                />
              </div>
            );
          })}
        </div>
      )}
    </StyledConsistencySynContainer>

  );
};

export default ConsistencySynContainer;
