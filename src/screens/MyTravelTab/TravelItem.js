import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({$rem: constants.WIDTH / 380});

export default class TravelItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {data, onPressItem} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPressItem(data.id)}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/dalat2.jpg')}
            style={{
              flex: 1,
              width: '100%',
              borderRadius: EStyleSheet.value('19rem'),
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.textPlace}>TP. Hồ Chí Minh - Đà Lạt</Text>
            <Text style={styles.textDayLeft}>3 ngày nữa</Text>
          </View>
          <View style={styles.textItem}>
            <Image
              source={constants.Images.IC_MONEY}
              style={styles.iconVector}
            />
            <Text style={styles.subText}>3.000.000đ̲</Text>
          </View>
          <View style={styles.textItem}>
            <Image
              source={constants.Images.IC_TIME}
              style={styles.iconVector}
            />
            <Text style={styles.subText}>20/03/2020 - 22/03/2020</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    height: '235rem',
    marginHorizontal: '15rem',
    borderRadius: '20rem',
    marginVertical: '10rem',
    flexDirection: 'column',
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 4,
  },
  header: {
    height: '120rem',
    borderRadius: '19rem',
    margin: '6rem',
  },
  content: {
    marginHorizontal: '11rem',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textPlace: {
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.medium,
  },
  textDayLeft: {
    fontSize: constants.FontSizes.normal,
    fontFamily: constants.Fonts.light,
    color: '#797979',
  },
  textItem: {
    flexDirection: 'row',
    marginTop: '5rem',
    alignItems: 'center',
  },
  iconVector: {
    height: '30rem',
    width: '30rem',
  },
  subText: {
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.light,
    color: '#686868',
    marginLeft: '10rem',
  },
});