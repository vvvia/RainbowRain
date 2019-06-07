const WxParse = require('../../../wxParse/wxParse.js');

Page({
  data: {
    isPlayingMusic: false,
    article: '<div style="text-align:center;"><img src="http://39.108.162.197/text/images/questions/1.png" alt="" /><img src="http://39.108.162.197/text/images/questions/2.png" alt="" /><img src="http://39.108.162.197/text/images/questions/3.png" alt="" /><img src="http://39.108.162.197/text/images/questions/4.png" alt="" /><img src="http://39.108.162.197/text/images/questions/5.png" alt="" /><img src="http://39.108.162.197/text/images/questions/6.png" alt="" /><img src="http://39.108.162.197/text/images/questions/7.png" alt="" /><img src="http://39.108.162.197/text/images/questions/8.png" alt="" /><img src="http://39.108.162.197/text/images/questions/9.png" alt="" /><img src="http://39.108.162.197/text/images/questions/10.png" alt="" /><img src="http://39.108.162.197/text/images/questions/11.png" alt="" /><img src="http://39.108.162.197/text/images/questions/12.png" alt="" /><img src="http://39.108.162.197/text/images/questions/13.png" alt="" /><img src="http://39.108.162.197/text/images/questions/14.png" alt="" /><img src="http://39.108.162.197/text/images/questions/15.png" alt="" /><img src="http://39.108.162.197/text/images/questions/16.png" alt="" /><img src="http://39.108.162.197/text/images/questions/17.png" alt="" /><img src="http://39.108.162.197/text/images/questions/18.png" alt="" /><img src="http://39.108.162.197/text/images/questions/19.png" alt="" /><img src="http://39.108.162.197/text/images/questions/20.png" alt="" /><img src="http://39.108.162.197/text/images/questions/21.png" alt="" /><img src="http://39.108.162.197/text/images/questions/22.png" alt="" /><img src="http://39.108.162.197/text/images/questions/23.png" alt="" /></div>',
  },

  onLoad: function(option) {
    
    var that = this;
    WxParse.wxParse('article', 'html', that.data.article, that, 5);
     
  },

  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        //res.cancel;
        //res.tapIndex;//数组元素 从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: "是否取消？分享功能尚未开发完成orz",

        })
      }
    })
  }


})