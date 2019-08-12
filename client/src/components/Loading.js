import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import colors from '../styles/colors';

const LoadingContainer = styled.div`
  &.-loading.-active {
    flex-direction: column;
    justify-content: center;
    background-color: white;
    opacity: 0;
    
    .-loading-inner {
      top: 0;
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
