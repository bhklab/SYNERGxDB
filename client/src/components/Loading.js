import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import colors from '../styles/colors';

const LoadingContainer = styled.div`
  &.-loading.-active {
    background-color: white;
    opacity: 1;
    z-index: 100;
    
    .-loading-inner {
      display: flex;
      justify-content: center;
      top: calc(50% - 150px);
    }
  }

`;


const LoadingComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const { loading } = props;
  return loading ? (
    <LoadingContainer className="-loading -active">
      <div className="-loading-inner">
        <ReactLoading type="bubbles" width={150} height={150} color={colors.color_main_2} />
      </div>
    </LoadingContainer>
  ) : (
    <div />
  );
};

export default LoadingComponent;
