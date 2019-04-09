var mapData = require('../../data/map-data.js')
Page({
  data: {
    latitude: 30.3145799272,
    longitude: 120.3433799744,
    markers: [{
      id: 1,
      latitude: 30.3145799272,
      longitude: 120.3433799744,
    }],
    covers: [{
      latitude: 30.3169879791,
      longitude: 120.3470492363,
      iconPath: '/images/location.png'
    }]
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    

    // this.data.postList = postsData.postList
      this.setData({
        hosList: mapData.hosList
      });
  },
  intoMap: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {  //因为这里得到的是你当前位置的经纬度
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({        //所以这里会显示你当前的位置
          latitude: latitude,
          longitude: longitude,
         
        })
      }
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  }, onPostTap(event) {
    var hosId = event.currentTarget.dataset.hosid;
    wx.navigateTo({
      url: '../map/map-detail/map-detail'
    })
  }


})
