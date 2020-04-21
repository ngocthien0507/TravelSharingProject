import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/managerGroupReducer';

import SearchBar from '../../components/SearchBar';
import {BASE_URL} from '../../services/URL';

class AddMemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Chọn thành viên',
      searchText: '',
      loadingVisible: false,
      loadingCompleted: false,
      idUserPick: [],
      friend: [],
    };
  }
  UNSAFE_componentWillMount = () => {
    this.setState({
      idUserPick: this.props.navigation.getParam('member', []),
      friend: this.props.user.data.user_info.friend,
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.groupInfo.type === types.PUT_UPDATE_MEMBER ||
      nextProps.groupInfo.type === types.PUT_UPDATE_MEMBER_FAIL
    ) {
      if (nextProps.groupInfo.type === types.PUT_UPDATE_MEMBER) {
        this.setState({
          loadingVisible: false,
          loadingCompleted: true,
          message: 'Đã cập nhật! đang chuyển màn hình',
        });
        this.props.reset_member();
        setTimeout(() => {
          this.setState({
            loadingCompleted: false,
          });
          this.props.navigation.navigate('TripDetail', {
            data: nextProps.groupInfo.data[0],
          });
        }, 1500);
      } else {
        this.setState({
          loadingVisible: false,
          loadingCompleted: true,
          message: 'Lỗi tạo hành trình!',
        });
      }
    }
  }
  onSearchChangeText = text => {
    this.setState({searchText: text});
  };
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressDone = async () => {
    const type = this.props.navigation.getParam('type', 'create');
    const location = this.props.navigation.getParam('location', '');
    const idHanhTrinh = this.props.navigation.getParam('idHanhTrinh');
    const {idUserPick} = this.state;
    if (type === 'create') {
      await this.props.update_mem(this.state.idUserPick);
      if (location !== '') {
        this.props.navigation.navigate(location);
      } else {
        this.props.navigation.goBack();
      }
    } else if (type === 'update') {
      this.setState({
        loadingVisible: true,
      });
      await this.props.put_update_member(idHanhTrinh, idUserPick);
    }
  };
  onSelectItem = item => {
    let array = this.state.idUserPick;
    array.push(item._id);
    this.setState({
      idUserPick: array,
    });
  };
  onUnselectItem = item => {
    let array = this.state.idUserPick;
    let index = array.indexOf(item._id);
    array.splice(index, 1);
    this.setState({
      idUserPick: array,
    });
  };
  _renderItem = item => {
    let array = this.state.idUserPick;
    let found = array.find(e => e === item._id);
    let isSelect = found === undefined ? false : true;
    let avatar = item.avatar;
    if (avatar !== null) {
      avatar = BASE_URL + '/' + avatar;
    }
    return (
      <View style={styles.flatListItem}>
        <Image
          source={avatar === null ? constants.Images.IC_AVATAR1 : {uri: avatar}}
          style={{
            width: EStyleSheet.value('54rem'),
            height: EStyleSheet.value('54rem'),
          }}
        />
        <View style={styles.infoCol}>
          <Text style={styles.textName}>{item.display_name}</Text>
          <Text style={styles.textemail}>{item.email}</Text>
        </View>
        {isSelect ? (
          <TouchableOpacity
            style={styles.selectedButton}
            onPress={() => this.onUnselectItem(item)}>
            <Text style={{color: 'white'}}>Bỏ chọn</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => this.onSelectItem(item)}>
            <Text style={{color: 'white'}}>chọn</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  render() {
    const {title, searchText, friend} = this.state;
    return (
      <View style={styles.container}>
        <Dialog visible={this.state.loadingVisible}>
          <DialogContent>
            <View style={styles.loadingCompleted}>
              <ActivityIndicator
                size={EStyleSheet.value('60rem')}
                color="#34D374"
              />
              <Text
                style={{
                  fontFamily: constants.Fonts.light,
                  fontSize: EStyleSheet.value('15rem'),
                  letterSpacing: 1,
                  marginLeft: EStyleSheet.value('5rem'),
                }}>
                Đang tạo hành trình...
              </Text>
            </View>
          </DialogContent>
        </Dialog>
        <Dialog visible={this.state.loadingCompleted}>
          <DialogContent>
            <View style={styles.loadingCompleted}>
              <ActivityIndicator
                size={EStyleSheet.value('60rem')}
                color="#34D374"
              />
              <Text
                style={{
                  fontFamily: constants.Fonts.light,
                  fontSize: EStyleSheet.value('15rem'),
                  letterSpacing: 1,
                  marginLeft: EStyleSheet.value('5rem'),
                }}>
                {this.state.message}
              </Text>
            </View>
          </DialogContent>
        </Dialog>
        <View style={styles.header}>
          <SearchBar
            title={title}
            onChangeText={this.onSearchChangeText}
            value={searchText}
            isBack={true}
            onPressBack={this.onPressBack}
            placeHolder={'Tìm thành viên'}
          />
        </View>
        <View style={styles.content}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{...styles.textName}}>Danh sách bạn bè</Text>
            <TouchableOpacity onPress={() => this.onPressDone()}>
              <Text style={{color: '#1161D8'}}>HOÀN TẤT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flatList}>
            <FlatList
              contentContainerStyle={{
                paddingBottom: EStyleSheet.value('40rem'),
                flex: 0,
              }}
              data={friend}
              renderItem={({item}) => this._renderItem(item)}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({groupInfo, user}) => {
  return {
    groupInfo: groupInfo,
    user: user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    update_mem: parrams => dispatch(actions.update_mem(parrams)),
    put_update_member: (idHanhTrinh, member) =>
      dispatch(actions.put_update_member(idHanhTrinh, member)),
    reset_member: () => dispatch(actions.reset_member()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMemberScreen);

const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '60rem',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CDCDCD',
    paddingHorizontal: '13rem',
    marginTop: '10rem',
    justifyContent: 'center',
  },
  content: {paddingTop: '10rem', paddingHorizontal: '23rem'},
  textName: {
    letterSpacing: '1rem',
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.regular,
  },
  textemail: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.light,
    color: '#797979',
  },
  flatList: {marginTop: '10rem'},
  flatListItem: {
    flexDirection: 'row',
    marginVertical: '15rem',
  },
  infoCol: {justifyContent: 'space-around', paddingLeft: '10rem'},
  selectButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65rem',
    height: '25rem',
    backgroundColor: '#76B5FF',
    borderRadius: '17rem',
    top: '15rem',
    right: '0rem',
  },
  selectedButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65rem',
    height: '25rem',
    backgroundColor: '#34D374',
    borderRadius: '17rem',
    top: '15rem',
    right: '0rem',
  },
});
