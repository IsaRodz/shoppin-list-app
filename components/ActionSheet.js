import React, { Component, createRef } from 'react';
import { StyleSheet, Text } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export default class ActionSheet extends Component {
  constructor(props) {
    super(props);
  }

  bs = createRef();

  open = () => {
    this.bs.current.open();
  };

  close = () => {
    this.bs.current.close();
  };

  render() {
    return (
      <RBSheet
        ref={this.bs}
        closeOnDragDown={true}
        customStyles={{
          container: styles.bottomSheet,
          draggableIcon: styles.draggableIcon,
        }}
        height={this.props.height && this.props.height}
      >
        <Text style={styles.title}>{this.props.title}</Text>
        {this.props.children}
      </RBSheet>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 20,
    color: '#7a7a7a',
    textTransform: 'uppercase',
  },
  bottomSheet: {
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  draggableIcon: {
    height: 4,
    backgroundColor: '#eaeaea',
  },
});
