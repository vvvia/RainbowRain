var postsData = require('../posts/post-detail/posts-data.js')
import {
  Home
} from 'home-model.js';//面向对象 import 类 from 路径
var home = new Home(); //实例化 首页 对象
Page({
  data: {
    loadingHidden: false
  },
  //onLoad为初始化函数 不要把过多函数定义其中 
  onLoad: function() {
    this._loadData();
    this.setData({
      postList: postsData.postList
    });
  },

  /*加载所有数据*/
  //下划线私有方法
  _loadData: function(callback) {
    var that = this;

    // 获得bannar信息
    home.getBannerData((data) => {
      that.setData({
        bannerArr: data,
      });
    });

    /*获取主题信息*/
    home.getThemeData((data) => {
      that.setData({
        themeArr: data,
        loadingHidden: true
      });
    });

    /*获取单品信息*/
    home.getProductorData((data) => {
      that.setData({
        productsArr: data
      });
      callback && callback();
    });
  },


  /*跳转到主题列表*/
  onThemesItemTap: function(event) {
    var id = home.getDataSet(event, 'id');
    var name = home.getDataSet(event, 'name');
    wx.navigateTo({
      url: '../theme/theme?id=' + id + '&name=' + name
    })
  },
  onBigThemeTap:function(event){
    wx.navigateTo({
      url: '../posts/post-detail/post-questions'
    })
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function() {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },
  onPostTap(event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../posts/post-detail/post-detail?id=' + postId
    })

  },
  //分享效果
  onShareAppMessage: function() {
    return {
      title: '彩虹雨 Rainbow Rain',
      path: 'pages/home/home'
    }
  }

})