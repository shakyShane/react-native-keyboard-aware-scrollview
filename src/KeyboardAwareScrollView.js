import React, { PropTypes } from 'react';

import {
  ScrollView
} from 'react-native';

import KeyboardAwareBase from './KeyboardAwareBase'

export default class KeyboardAwareScrollView extends KeyboardAwareBase {
  render() {
    const contentInset = {
        bottom: this.state.keyboardHeight,
        top: this.props.statusBar ? -20 : 0
    };
    return (
      <ScrollView {...this.props} {...this.style}
        contentInset={contentInset}
        ref={(r) => {
          this._keyboardAwareView = r;
        }}
        onLayout={(layoutEvent) => {
          this._onKeyboardAwareViewLayout(layoutEvent.nativeEvent.layout);
        }}
        onScroll={(event) => {
          this._onKeyboardAwareViewScroll(event.nativeEvent.contentOffset);
          if(this.props.onScroll) {
            this.props.onScroll(event);
          }
        }}
        onContentSizeChange={() => {
          this._updateKeyboardAwareViewContentSize();
        }}
        scrollEventThrottle={200}
      />
    );
  }
}

KeyboardAwareScrollView.propTypes = {
  getTextInputRefs: PropTypes.func,
  onScroll: PropTypes.func,
  statusBar: PropTypes.bool
};
KeyboardAwareScrollView.defaultProps = {
  ...KeyboardAwareBase.defaultProps,
  getTextInputRefs: () => {
    return [];
  }
};
