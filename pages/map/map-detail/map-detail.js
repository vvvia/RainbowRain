// pages/map/map-detail/map-detail.js
Page({

  /**
   * 页面的初始数据
   */
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
    }],
    polyline: [{
      points: [{
        latitude: 30.3145799272,
        longitude: 120.3433799744,
      }, {
        latitude: 30.3169879791,
        longitude: 120.3470492363,
      }],
      color: "#0000ffDD",
      width: 5
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})