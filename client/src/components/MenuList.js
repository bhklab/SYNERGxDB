/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import List from 'react-virtualized/dist/commonjs/List';
import _ from 'lodash';
// import colors from '../styles/colors';

export default class MenuList extends PureComponent {
  render() {
    const {
      children, maxHeight,
    } = this.props;

    const height = 65;
    const rows = Array.isArray(children) ? children : [];
    const rowRenderer = ({
      key, index, style,
    }) => (
      <div
        key={key}
        style={{
          ...style,
          width: '350px',
        }}
      >
        {rows[index]}
      </div>
    );


    const scrollToIndex = _.findLastIndex(
      children,
      child => child.props.isFocused,
    );

    return (
      <List
        height={maxHeight}
        rowHeight={height}
        itemCount={children.length}
        itemSize={height}
        width={350}
        rowCount={rows.length}
        rowRenderer={rowRenderer}
        scrollToIndex={scrollToIndex}
      />
    );
  }
}
