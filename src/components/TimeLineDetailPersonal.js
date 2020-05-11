/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({$rem: constants.WIDTH / 380});

import TimeLineItem from './TimeLineItem';
import DraggableFlatList from 'react-native-draggable-flatlist';
const exampleData = [...Array(20)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`,
}));
export default class TimelineDetailPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: exampleData,
      routeData: null,
      isGone: false,
      keyDay: null,
      action: null,
      day: null,
      isLeader: false,
    };
  }
  count = 0;
  hour = 8;
  minute = 0;
  UNSAFE_componentWillReceiveProps(nextprops) {
    this.count = 0;
    this.hour = 8;
    this.minute = 0;
  }
  renderItem = ({item, index, drag = null, isActive = false}) => {
    const {data, routeData, isGone, keyDay, action} = this.props;
    if (this.count === data.length) {
      this.count = 0;
    }
    let lastPlace = false;
    let timeText = '';
    if (this.count === data.length - 1) {
      lastPlace = true;
    }
    if (this.count > 0) {
      var secs = routeData.leg[this.count - 1].travelTime + 5400;
      let minutes = Math.floor(secs / 60);
      if (minutes > 60) {
        let hours = Math.floor(minutes / 60);
        this.hour += hours;
        minutes = minutes - hours * 60;
      }
      this.minute += minutes;
      if (this.minute > 60) {
        this.hour = this.hour + Math.floor(this.minute / 60);
        this.minute = this.minute - Math.floor(this.minute / 60) * 60;
      }
    }
    if (this.hour <= 24) {
      timeText = `${this.hour < 10 ? '0' + this.hour : this.hour}:${
        this.minute < 10 ? '0' + this.minute : this.minute
      }`;
    } else {
      timeText = 'Qua ngày';
    }
    this.count++;
    return (
      <TimeLineItem
        data={item}
        timeText={timeText}
        key={this.count - 1}
        lastPlace={lastPlace}
        route={
          this.count - 1 < routeData.leg.length
            ? routeData.leg[this.count - 1]
            : null
        }
        isDelete={isGone ? false : true}
        onPressDeleteItem={this.props.onPressDeleteItem}
        keyDay={keyDay}
        isLeader={this.props.isLeader}
        action={action}
        onLongPress={drag}
        isActive={isActive}
        isGone={isGone}
      />
    );
  };
  render() {
    const {
      onPressAddPlace,
      onDragEnd,
      day,
      isGone,
      keyDay,
      isLeader,
      action,
    } = this.props;
    return (
      <View style={isLeader ? styles.container : styles.containerSub}>
        <View style={styles.title}>
          <Text
            style={{
              ...styles.text,
              ...styles.titleText,
            }}>
            Ngày {day}
          </Text>
          {isGone ? null : isLeader || action === 'creating' ? (
            <TouchableOpacity onPress={() => onPressAddPlace(keyDay)}>
              <Text
                style={{
                  ...styles.titleText,
                  color: '#259CDF',
                }}>
                Thêm địa điểm
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.content}>
          {isGone ? (
            <FlatList
              contentContainerStyle={{
                paddingBottom: EStyleSheet.value('0rem'),
              }}
              data={this.props.data}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
            />
          ) : (
            // <Flatlist
            //   data={this.props.data}
            //   renderItem={this.renderItem}
            //   keyExtractor={(item, index) => item._id}
            // />
            <DraggableFlatList
              data={this.props.data}
              extraData={this.props}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `draggable-item-${item._id}`}
              onDragEnd={({data}) => {
                onDragEnd(data, keyDay);
              }}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  container: {
    height: '420rem',
  },
  containerSub: {
    height: '470rem',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5rem',
    marginHorizontal: '13rem',
  },
  text: {
    color: '#127138',
  },
  titleText: {
    fontSize: constants.FontSizes.regular,
  },
  content: {
    marginTop: '10rem',
    marginLeft: '13rem',
    flex: 1,
  },
});
