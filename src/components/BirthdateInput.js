/**
 * this component is used whenever i want to take a text field as input from user
 */
import React from 'react';
import {
  View,
  DatePickerAndroid,
  DatePickerIOS,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import DatePicker from 'react-native-datepicker';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class BirthdateInput extends React.Component {
  constructor(props) {
    super(props);
  }

  onDateChange(date) {
    this.props.onDateChange(date);
  }

  renderPicker() {
    let today = new Date();
    const { style, inputStyle, show } = this.props;
    return (
      <DatePicker
        style={[styles.pickerStyle, style]}
        mode="date"
        date={this.props.date}
        placeholder={'Aniversary Date'}
        format="MM-DD-YYYY"
        minDate="01-01-1930"
        showIcon={show}
        maxDate={today}
        androidMode='spinner'
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconSource={require('../../assets/icons/Forms/14.png')}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 10,
            top: 3,
            width: 0.1 * SCREEN_WIDTH,
            height: 0.1 * SCREEN_WIDTH
          },
          dateInput: [{
            borderColor: 'white',
            backgroundColor: 'rgba(0,0,0,0)',
            borderRadius: 0.06 * SCREEN_HEIGHT,
            borderWidth: 0.3,
            height: 0.095 * SCREEN_HEIGHT,
            backgroundColor: '#5c1634',
            alignItems: 'flex-start',
            paddingLeft: 53,
            marginBottom: 10
          }, inputStyle],
          dateText: {
            fontSize: 0.055 * SCREEN_WIDTH,
            color: 'white',
            fontWeight: '200',
          },
          placeholderText: {
            fontSize: 0.055 * SCREEN_WIDTH,
            color: 'white',
            fontWeight: '200',
            textAlign: 'left',
            paddingLeft: 53,
            backgroundColor: '#5c1634',
          }
        }}
        onDateChange={(date) => this.onDateChange(date)}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        {this.renderPicker()}
      </View>

    );
  }
};

const styles = {
  pickerStyle: {
    width: 0.8 * SCREEN_WIDTH,
    paddingTop: 20
  }
};

export { BirthdateInput };
