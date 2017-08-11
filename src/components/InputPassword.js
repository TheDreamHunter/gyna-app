/**
 * this component is used whenever i want to take a text field as input from user
 */
import React from 'react';
import { View, Text, TextInput, Image, Dimensions,TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

class InputPassword extends React.Component {

    state = { secured: true }

    onPressButton() {
        this.setState({ secured: false })
    }

    render() {
        const { value } = this.props;
        return (
            <View style={styles.containerStyle}>
                <View style={{ flex: 2 }}>
                    <Image
                        style={styles.imageStyle}
                        source={require('../../assets/icons/locked.png')}
                    />
                </View>
                <View style={{ flex: 5 }}>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Password"
                        placeholderTextColor='white'
                        style={styles.inputStyle}
                        value={value}
                        secureTextEntry={this.state.secured}
                    //   onChangeText={onChangeText}
                    />
                </View>
                <View style={{ flex: 3, alignItems: "flex-end",marginRight:10 }}>
                    <TouchableWithoutFeedback
                        onPress={() => this.onPressButton()}
                        style={{
                            backfaceVisibility: 'hidden',
                            overflow: 'hidden'

                        }}
                    >
                    <Entypo
                    name='eye'
                    color="white"
                    size={30}
                  />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}
/**
 * Styles used for ths component , includes the input style
 */
const styles = {
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 0.3,
        borderColor: 'white',
        backgroundColor: '#5c1634',
        height: 60,
        width: 0.9 * SCREEN_WIDTH,
        margin: 10
    },
    inputStyle: {
        color: 'white',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        fontWeight: "200",
        height: 50
    },
    imageStyle: {
        width: 25,
        height: 25,
        margin: 15
    }
}

export { InputPassword };