import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import moment from 'moment';
export default class TravelItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShare: false,
    };
  }
  componentWillMount() {
    this.setState({
      isShare: this.props.data.isShare,
    });
  }
  render() {
    const {data, onPressConfirm, onPressItem, isLeader} = this.props;
    const {isShare} = this.state;
    let background = null;
    background =
      data.background !== null
        ? data.background
        : data.destination.destination_image;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPressItem(data, isLeader)}>
        <View style={styles.header}>
          <Image
            source={{uri: background}}
            style={{
              flex: 1,
              width: '100%',
              borderTopLeftRadius: EStyleSheet.value('19rem'),
              borderTopRightRadius: EStyleSheet.value('19rem'),
              marginBottom: EStyleSheet.value('7rem'),
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.textPlace}>
              {data.departure.destination_name} -{' '}
              {data.destination.destination_name}
            </Text>
          </View>
          <View style={styles.textItem}>
            <Image
              source={constants.Images.IC_MONEY}
              style={styles.iconVector}
            />
            <Text style={styles.subText}>
              {constants.currencyFormatter.format(data.price)}đ̲
            </Text>
          </View>
          <View style={styles.textItem}>
            <Image
              source={constants.Images.IC_TIME}
              style={styles.iconVector}
            />
            <Text style={styles.subText}>
              {moment(data.start_day).format('DD/MM/YYYY')}&nbsp;-&nbsp;
              {moment(data.end_day).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        {isLeader ? (
          isShare ? (
            <View style={styles.sharedBox}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('15rem'),
                  fontFamily: constants.Fonts.medium,
                  color: '#34D374',
                }}>
                Đã chia sẻ
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => onPressConfirm(data, isLeader)}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('15rem'),
                  fontFamily: constants.Fonts.medium,
                  color: 'white',
                }}>
                Chia sẻ
              </Text>
            </TouchableOpacity>
          )
        ) : null}
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
    borderWidth: 1,
    borderColor: '#DADDE1',
    paddingBottom: '10rem',
    //shadow
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 8,

    // elevation: 4,
  },
  header: {
    flex: 1,
    borderRadius: '20rem',
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
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.medium,
  },
  textDayLeft: {
    fontSize: constants.FontSizes.normal,
    fontFamily: constants.Fonts.light,
    color: '#8E8E8E',
  },
  textItem: {
    flexDirection: 'row',
    marginTop: '5rem',
    alignItems: 'center',
  },
  iconVector: {
    height: '22rem',
    width: '22rem',
    resizeMode: 'contain',
  },
  subText: {
    fontSize: constants.FontSizes.normal,
    fontFamily: constants.Fonts.light,
    color: '#686868',
    marginLeft: '7rem',
  },
  confirmButton: {
    backgroundColor: '#34D374',
    width: '75rem',
    height: '28rem',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '62rem',
    right: '6rem',
  },
  sharedBox: {
    width: '75rem',
    height: '28rem',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '62rem',
    right: '10rem',
  },
});
