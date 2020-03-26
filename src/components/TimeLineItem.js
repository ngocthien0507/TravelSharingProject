import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import Dash from 'react-native-dash';

export default class TimeLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderInfo = () => {
    if (!this.props.lastDay) {
      return (
        <View
          style={{
            flexDirection: 'column',
            marginBottom: EStyleSheet.value('10rem'),
          }}>
          <View style={styles.detailTextView}>
            <Text style={{...styles.detailText, ...styles.text}}>
              T/g tham quan:
            </Text>
            <Text style={{...styles.timeDetailText, ...styles.text}}>
              2h 15p
            </Text>
          </View>
          <View style={styles.detailTextView}>
            <Text style={{...styles.detailText, ...styles.text}}>
              T/g di chuyển:
            </Text>
            <Text style={{...styles.timeDetailText, ...styles.text}}>30p</Text>
          </View>
          <View style={styles.detailTextView}>
            <Text style={{...styles.detailText, ...styles.text}}>
              Khoảng cách:
            </Text>
            <Text style={{...styles.timeDetailText, ...styles.text}}>
              30 km
            </Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };
  render() {
    const {data} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.Col1}>
          <View>
            <Text
              style={{
                fontFamily: constants.Fonts.medium,
                fontSize: EStyleSheet.value('16rem'),
                color: '#127138',
              }}>
              {data.time}
            </Text>
          </View>
          {this.renderInfo()}
        </View>
        <View style={styles.Col2}>
          <Image
            source={constants.Images.IC_CAR}
            style={{
              height: EStyleSheet.value('30rem'),
              width: EStyleSheet.value('30rem'),
            }}
          />
          {this.props.lastDay ? null : (
            <Dash
              style={{
                width: EStyleSheet.value('1rem'),
                height: EStyleSheet.value('72rem'),
                flexDirection: 'column',
              }}
              dashGap={4}
              dashLength={7}
              dashThickness={0.8}
              dashColor={'#34DC78'}
            />
          )}
        </View>
        <View style={styles.Col3}>
          <View style={styles.pictureView}>
            <Image
              source={require('../assets/images/vinhbaitulong.jpg')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: EStyleSheet.value('20rem'),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: EStyleSheet.value('105rem'),
              marginLeft: EStyleSheet.value('10rem'),
            }}>
            <Text
              style={{
                fontFamily: constants.Fonts.medium,
                fontSize: EStyleSheet.value('16rem'),
                color: '#127138',
                marginBottom: EStyleSheet.value('3rem'),
              }}>
              Tên của địa danh
            </Text>
            <Text style={{...styles.detailText}}>Địa chỉ của địa danh đó</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    height: '105rem',
    flexDirection: 'row',
  },
  Col1: {
    height: '100%',
    width: '135rem',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Col2: {
    height: '100%',
    width: '30rem',
    alignItems: 'center',
  },
  Col3: {
    height: '100%',
    width: '195rem',
    marginLeft: '5rem',
    marginRight: '5rem',
    flexDirection: 'row',
  },
  detailTextView: {
    flexDirection: 'row',
    marginVertical: '3rem',
  },
  text: {
    fontSize: constants.FontSizes.smalltext,
  },
  timeDetailText: {
    color: '#0BAC4C',
    marginLeft: '5rem',
  },
  detailText: {
    color: '#7DA18C',
  },
  pictureView: {
    width: '82rem',
    height: '82rem',
    borderRadius: '20rem',
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,

    elevation: 6,
  },
});