import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SignUpAccount extends React.Component {
  render() {
    const { onButtonPress } = this.props;
    const {
      containerStyle,
      TextViewStyle,
      noAccountTextStyle,
      SignUpContainer,
      SignUpButtonStyle,
      buttonTextStyle
   } = styles;

    return (
      <View style={containerStyle}>

        <View style={TextViewStyle}>
          <Text style={noAccountTextStyle}>
            Don't Have an account ?
          </Text>
        </View>

        <Button
          onPress={onButtonPress}
          title="Sign Up"
          buttonStyle={SignUpButtonStyle}
          color='white'
          fontWeight='normal'
          textStyle={buttonTextStyle}
          containerViewStyle={SignUpContainer}
        />

      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    margin: 10
  },
  SignUpButtonStyle: {
    borderRadius: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  SignUpContainer: {
    flex: 3,
    alignItems: 'center',
    marginTop: -11
  },
  buttonTextStyle: {
    fontSize: 0.045 * SCREEN_WIDTH,
    color: '#00C1FF',
    textAlign: 'left',
    fontWeight: 'normal'
  },
  noAccountTextStyle: {
    color: 'white',
    fontSize: 0.047 * SCREEN_WIDTH,
    fontWeight: '400'
  },
  TextViewStyle: {
    flex: 7,
    alignItems: 'center'
  }
};

export { SignUpAccount };