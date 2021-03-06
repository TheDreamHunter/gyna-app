import React, { Component } from 'react';
import { View, Image, Text, ScrollView, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { BackgroundImage, SearchInput, Spinner, ListDataItem, ScreensHeaderTitle } from '../components';
import ListItem from '../components/ListItem';
import LifeData from '../LifeData.json';
import { searchContent, searchWordChanged, emptySearchWord } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class LifeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Your Life',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#5C1634'
    },
    headerBackTitle: 'Back',
    headerTintColor: 'white',
    headerTitle:
    <ScreensHeaderTitle
      title='Your Life'
      iconType='tabBar'
    />
    ,
    tabBarIcon: ({ tintColor }) => (
      // setting the Tab's Icon
      <Image
        source={require('../../assets/icons/Tabs/life.png')}
        style={[styles.icon, { tintColor }]}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = { search: false, keyword: '', searchData: [], data: LifeData };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchData: nextProps.searchData });
  }

  onWordChange(text) {
    this.props.searchWordChanged(text);
  }

  fetchType(item) {
    if (item.type === 'post') {
      if (item.attach) {
        return { category: false, icon: true, type: 'picture-as-pdf' };
      }
      else if (item.images.length !== 0) {
        return { category: false, icon: false, image: item.images[0] };
      }
      else if (item.link) {
        return { category: false, icon: true, type: 'ondemand-video' };
      }
    }
    else if (item.type === 'category') {
      return { category: true, name: item.name };
    }
  }

  onSearchResultPress(item) {
    const { navigate } = this.props.navigation;

    if (item.type === 'category') {
      var oldName = item.name;
      var newName = oldName.replace('-', '_');
      return () => navigate('dataList', { category: newName, title: item.title });
    }
    else if (item.type === 'post') {
      if (item.attach) {
        return () => navigate('pdfScreen', { pdfLink: item.attach, title: item.title });
      }
      else if (item.link) {
        if (item.link.indexOf('youtube') !== -1) {
          var oldLink = item.link;
          var newLink = oldLink.replace('watch?v=', 'embed/');
          return () => navigate('videoScreen', { videoLink: newLink, title: item.title });
        }
        else {
          return () => Linking.openURL(item.link);
        }
      }
      else if (item.content) {
        return () => navigate('webviewScreen',
          {
            contentSource: item.content,
            title: item.title,
            image: item.images[0],
            sub_title: item.sub_title
          });
      }
    }
  }

  navigateLife(item) {
    const { navigate } = this.props.navigation;

    if (item.category === 'fashion_tips') {
      return () => navigate('fashion', { category: item.category, title: item.title })
    }
    else {
      return () => navigate('dataList', { category: item.category, title: item.title })
    }
  }

  renderContent() {
    if (!this.state.search) {
      return (
        <View style={styles.scrollStyle}>
          <ScrollView style={{ width: 0.8 * SCREEN_WIDTH }}>
            <FlatList
              data={LifeData}
              numColumns={3}
              renderItem={({ item }) =>
                <ListItem
                  title={item.title}
                  iconType={item.key}
                  onPress={this.navigateLife(item)}
                />
              }
              key={this.state.search}
              keyExtractor={(item, index) => item.key}
              extraData={this.state.data}
            />
          </ScrollView>
        </View>
      );
    }
    else {
      if (this.props.loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner />
          </View>
        );
      } else if (this.props.success) {
        if (this.props.searchData.length == 0) {
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, backgroundColor: 'transparent', color: 'white' }}>
                No Data matched ur search word
            </Text>
            </View>
          );
        } else {
          return (
            <View style={{ flex: 9 }}>
              <ScrollView>
                <FlatList
                  data={this.props.searchData}
                  renderItem={({ item }) =>
                    <ListDataItem
                      title={(item.title) ? item.title : item.name}
                      iconType={this.fetchType(item)}
                      onArrowPress={this.onSearchResultPress(item)}
                    />
                  }
                  key={this.state.search}
                  keyExtractor={(item, index) => index}
                  extraData={this.state.searchData}
                />
              </ScrollView>
            </View>
          );
        }
      }
      else {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, backgroundColor: 'transparent', color: 'white' }}>
              {this.props.errorMsg}
            </Text>
          </View>
        );
      }
    }
  }

  render() {
    const { scrollStyle, searchContainer, inputStyle } = styles;
    const { navigate } = this.props.navigation;

    return (
      <BackgroundImage>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <SearchInput
              placeholder="Search"
              iconSource={
                (!this.state.search) ?
                  'ios-search-outline' : 'ios-close-circle'
              }
              onIconPress={
                (!this.state.search) ?
                  () => {
                    const { keyword } = this.props;
                    this.setState({ search: true });
                    this.props.searchContent({ keyword });
                  }
                  :
                  () => {
                    this.setState({ search: false });
                    this.props.emptySearchWord();
                  }
              }
              value={this.props.keyword}
              onChangeText={this.onWordChange.bind(this)}
              returnKeyType={"search"}
              onSubmit={(event) => {
                const { keyword } = this.props;
                this.setState({ search: true });
                this.props.searchContent({ keyword });
              }}
            />
          </View>
          {this.renderContent()}
        </View>
      </BackgroundImage>
    );
  }
}

const styles = {
  scrollStyle: {
    flex: 9,
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 6
  }
};

const mapStateToProps = ({ dataList }) => {
  const { loading, searchData, keyword, success, errorMsg } = dataList;
  return { loading, searchData, keyword, success, errorMsg };
};

export default connect(mapStateToProps,
  {
    searchContent,
    searchWordChanged,
    emptySearchWord
  })(LifeScreen);
