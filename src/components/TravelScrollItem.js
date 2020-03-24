import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

export default class TravelScrollItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.pictureView}>
            <Image
              style={{
                width: '100%',
                height: EStyleSheet.value('150rem'),
                borderRadius: EStyleSheet.value('12rem'),
              }}
              source={require('../assets/images/vinhhalong.jpeg')}
            />
          </View>
          <View style={styles.dayNum}>
            <Text
              style={{
                fontFamily: constants.Fonts.light,
                color: 'white',
                fontSize: EStyleSheet.value('11rem'),
                marginLeft: EStyleSheet.value('7rem'),
              }}>
              {/* FakeDate */}
              Ngày {this.props.data}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.infoTravelItem}>
          <View style={styles.infoText}>
            <Image source={constants.Images.IC_LOCATION} style={styles.icon} />
            <Text>4 địa điểm</Text>
          </View>
          <View style={styles.infoText}>
            <Image
              source={constants.Images.IC_VEHICLE_GRAY}
              style={styles.icon}
            />
            <Text>Xe máy, 30km</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    marginLeft: '12rem',
    width: '125rem',
    height: '195rem',
    marginTop: '5rem',
  },
  pictureView: {
    backgroundColor: 'white',
    width: '100%',
    height: '150rem',
    borderRadius: '12rem',
  },
  dayNum: {
    width: '45rem',
    height: '17rem',
    backgroundColor: 'rgba(0,0,0,0.48)',
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: '25rem',
    borderTopLeftRadius: '10rem',
    borderBottomLeftRadius: '10rem',
  },
  icon: {
    width: '15rem',
    height: '15rem',
    marginRight: '10rem',
  },
  infoText: {
    marginTop: '3rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
