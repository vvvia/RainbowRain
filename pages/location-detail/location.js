 // 引入SDK核心类
var amapFile = require('../../resources/map/amap-wx.js');
Page({
  data: {
    steps: {}
  },
  onLoad: function (option) {
    var param = JSON.parse(option.param);
    var that = this;
    var amapInstance = new amapFile.AMapWX({ key: "7ac51f9ccd389e46b0db6b7c2d6b7a97" });
    //进行路径规划查询
    amapInstance.getWalkingRoute({
      origin: param.origin,
      destination: param.destination,
      success: function (data) {
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          that.setData({
            steps: data.paths[0].steps
          });
        }
      },
      fail: function (info) {

      }
    })
  }
})