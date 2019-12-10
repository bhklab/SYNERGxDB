import React from 'react';
import styled from 'styled-components';
import CsvDownloader from 'react-csv-downloader';
import PropTypes from 'prop-types';

import colors from '../../styles/colors';
import downloadIcon from '../../images/icons/download.svg';
import transitions from '../../styles/transitions';

const StyledButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    color: #fff !important;
    background: ${colors.pagination};
    padding: 15px;
    border: 0;
    font-size: 15px;
    margin: 10px;
    transition: ${transitions.main_trans}
    img {
        display: inline-block;
        height: 15px;
        width: auto;
        margin-left: 5px;
    }
    &:hover {
        background-color: ${colors.pagination_dark};
    }
  }
`;


const DownloadButton = (props) => {
  const { data, headers, filename } = props;
  return (
    <StyledButton>
      <CsvDownloader
        datas={data}
        columns={headers}
        filename={filename}
      >
        <button type="button">
           Download Data
          {'   '}
          <img src={downloadIcon} alt="download icon" />
        </button>
      </CsvDownloader>
    </StyledButton>
  );
};

export default DownloadButton;

DownloadButton.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  filename: PropTypes.string.isRequired,
};
