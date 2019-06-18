import React, { Component } from 'react';
import { FixedSizeList as List } from 'react-window';

const height = 50;

class MenuList extends Component {
  render() {
    const {
      options, children, maxHeight, getValue,
    } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    console.log(this.props);

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

export default MenuList;
