var QQMapWX = require('../../resources/map/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    markers: [],
    longitude: 0,
    latitude: 0,
    distance: '',
    cost: '',
    origin: null,
    destination: null,
    briefAddr: null,
    hospitalName: null,
    navigateImag: "../../imgs/ios7-navigate.png"
  },
  onLoad: function(option) {
   
  },
  onShow() {
    this.getData();
  },
  getData: function() {
    var that = this;
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'YM6BZ-SLJ6U-7IMVF-43EAC-CN7T2-5VF4D'
    });
    //确保人员再次移动进行定位，获取经纬度
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        //console.log(res.accuracy);
        //设置经纬度值
        that.setData({
          latitude: latitude,
          longitude: longitude
        });
        qqmapsdk.search({
          keyword: '疾病预防控制中心',
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            that.setData({
              onLine: true
            });
            var data = res.data;
            that.setList(data);
            wx.hideLoading();
            wx.vibrateLong();
          },
          fail: function() {
            //关闭loading
            wx.hideLoading();
            //有可能是参数有问题或者是网络
            that.setData({
              onLine: false,
              noAuth: false,
              yesAuth: true
            });
          }
        });
      },
      fail: function(json) {
        //关闭loading
        wx.hideLoading();
        //没有权限
        that.setData({
          noAuth: true,
          yesAuth: false
        });
      }
    });
  },
  //组装数据信息
  setList: function(data) {
    var that = this;
    var result = [];
    //循环遍历数据， 其实不做这一步也行
    data.forEach(function(item, index) {
      //替换一些不必要的大信息
      var reg = new RegExp(item.ad_info.province + item.ad_info.city + item.ad_info.district);
      var briefAddr = item.address.replace(reg, "");
      //组装数据
      result.push({
        distance: item["_distance"],
        briefAddr: briefAddr,
        address: item.address,
        category: item.category,
        id: item.id,
        latitude: item.location.lat,
        longitude: item.location.lng,
        name: item.title
      });
    });
    //设置data
    that.setData({
      list: result,
      size: result.length,
      noAuth: false,
      yesAuth: true
    });
  },
  //点击列表显示本地导航信息
  tapItem: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var hospital = that.findMarkerById(id);
    //跳转传输的值
    var param = {
      //基本的信息
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      list: that.data.list,
      //目的地点 基本的信息
      destination: hospital.longitude + "," + hospital.latitude,
      briefAddr: hospital.briefAddr,
      name: hospital.name
    }
    //让用户选择是使用本地自带地图还是小程序地图导航
    wx.showActionSheet({
      itemList: ['高德/百度地图导航', '本地小程序导航'],
      success: function(res) {
        if (res.tapIndex) {
          wx.navigateTo({
            url: '../location/location?param=' + JSON.stringify(param)
          });
        } else {
          //打开本地应用进行导航
          wx.openLocation({
            latitude: param.latitude,
            longitude: param.longitude,
            name: param.name,
            address: param.briefAddr,
            scale: 28
          });
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '你可以选择一个看看效果,行不行再说',
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  //根据marker唯一id查询信息
  findMarkerById: function(id) {
    var that = this,
      result = {};
    var list = that.data.list;
    //查询数据信息
    for (var i = 0; i < list.length; i++) {
      if (id === list[i].id) {
        result = list[i];
        break;
      }
    }
    return result;
  },
  // 数据更新
  doRefresh: function() {
    wx.showLoading({
      title: "数据更新中,别急!"
    });
    this.getData();
  },
  //再次获取权限
  doAuth: function() {
    var that = this;
    wx.openSetting({
      success: (res) => {
        that.doRefresh();
      }
    })
  },
  // 跳转到地图显示信息界面
  doNavToLocation: function() {
    var that = this;
    //跳转传输的值
    var param = {
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      list: that.data.list,
      //目的地点，默认获取最近一个点
      destination: that.data.list[0]["longitude"] + "," + that.data.list[0]["latitude"],
      briefAddr: that.data.list[0]["briefAddr"],
      name: that.data.list[0]["name"]
    }
    //让用户选择是使用本地自带地图还是小程序地图导航
    wx.showActionSheet({
      itemList: ['高德/百度地图导航', '本地小程序导航'],
      success: function(res) {
        if (res.tapIndex) {
          wx.navigateTo({
            url: '../location/location?param=' + JSON.stringify(param)
          });
        } else {
          //打开本地应用进行导航
          wx.openLocation({
            latitude: param.latitude,
            longitude: param.longitude,
            name: param.name,
            address: param.briefAddr,
            scale: 28
          });
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '你可以选择一个看看效果,行不行再说',
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  onBindFocus: function(event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  onPostTap(event) {
    var hosId = event.currentTarget.dataset.hosid;
    wx.navigateTo({
      url: '../map/map-detail/map-detail'
    })
  }
})