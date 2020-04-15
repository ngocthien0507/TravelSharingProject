import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import TitleBarCustom from '../../components/TitleBarCustom';

import TimeLineDetailPersonal from '../../components/TimeLineDetailPersonal';
import CustomTabBar from '../../components/CustomTabBar';
import moment from 'moment';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/detailLichTrinhReducer.js';
const tabStyle = {};
class ShareTimeLineDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeData: [],
      isLoading: true,
    };
  }

  async componentWillMount() {
    const data = await this.props.navigation.getParam('data');
    const totalDay = await this.props.navigation.getParam('totalDay');
    this.props.get_location_info(data, totalDay);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      routeData: nextProps.detailLichTrinh.data,
      isLoading: false,
    });
  }
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  _renderItem = () => {
    let array = [];
    let countday = 0;
    const data = this.props.navigation.getParam('data');
    const totalDay = this.props.navigation.getParam('totalDay');
    let startDate = this.props.navigation.getParam('start');
    const {routeData} = this.state;
    const isGone = this.props.navigation.getParam('isGone', false);
    for (let i = 1; i <= totalDay; i++) {
      let dataItem = data['day_' + i];
      let routeDataItem = routeData[i - 1];
      let date = moment(startDate).format('DD/MM/YYYY');
      let day = date.split('/')[0];
      let month = date.split('/')[1];
      let lable = day + '.' + month;
      startDate = moment(startDate).add(1, 'day');
      countday++;
      array.push(
        <TimeLineDetailPersonal
          key={'day_' + i}
          data={dataItem}
          routeData={routeDataItem}
          tabLabel={lable}
          day={countday}
          isGone={isGone}
        />,
      );
    }
    return array;
  };
  onPressNext = () => {
    this.props.navigation.navigate('CreatePost');
  };
  onPressCompleted = () => {
    this.props.navigation.navigate('TripDetail');
  };
  onPressAddPlace = () => {
    this.props.navigation.navigate('AddPlaceDetail');
  };
  render() {
    const action = this.props.navigation.getParam('action', 'default');
    const page = this.props.navigation.getParam('page', 1) - 1;
    const {isLoading} = this.state;
    //trừ 1 vì Tính từ 0, nhưng page lấy từ 1
    return (
      <View style={styles.container}>
        <View style={styles.backgroundHeader}>
          <ImageBackground
            source={require('../../assets/images/vinhhalong.jpeg')}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <TitleBarCustom onPress={this.onPressBack} />
          </ImageBackground>
        </View>
        <ScrollableTabView
          initialPage={page}
          renderTabBar={() => (
            <CustomTabBar
              activeTextColor={'#34D374'}
              inactiveTextColor={'#B7B7B7'}
              tabStyle={tabStyle}
              backgroundColor={'white'}
            />
          )}>
          {isLoading ? (
            <ActivityIndicator
              size={EStyleSheet.value('60rem')}
              color="#34D374"
            />
          ) : (
            this._renderItem()
          )}
        </ScrollableTabView>
        <View style={styles.footer}>
          {action === 'sharing' ? (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.onPressNext()}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('15rem'),
                  fontFamily: constants.Fonts.medium,
                  color: 'white',
                }}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          ) : action === 'creating' ? (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.onPressCompleted()}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('15rem'),
                  fontFamily: constants.Fonts.medium,
                  color: 'white',
                }}>
                Hoàn thành
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({detailLichTrinh}) => {
  return {
    detailLichTrinh: detailLichTrinh,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_location_info: (params, number) =>
      dispatch(actions.get_location_info(params, number)),
    reset: () => dispatch(actions.reset()),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareTimeLineDetailScreen);
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  backgroundHeader: {
    height: '120rem',
  },
  confirmButton: {
    width: '300rem',
    height: '35rem',
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40rem',
  },
});
