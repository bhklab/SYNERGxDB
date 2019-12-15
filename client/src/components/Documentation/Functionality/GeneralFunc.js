/* eslint-disable react/no-danger */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Overview extends React.Component {
  render() {
    const { text, imgPath } = this.props;
    return (
      <Fragment>
        <h1>SYNERGxDB</h1>
        <h2>Documentation</h2>
        <div dangerouslySetInnerHTML={{ __html: text }} />
        {imgPath === '' ? null : (
          <img src={imgPath} alt="" />
        )}
      </Fragment>
    );
  }
}

export default Overview;
