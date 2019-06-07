
const WxParse = require('../../../wxParse/wxParse.js');

Page({
  data: {
    isPlayingMusic: false,
    article: '<div style="text-align:center;"><img src="http://39.108.162.197/text/images/hiv/h1.jpeg" alt="" /><img src="http://39.108.162.197/text/images/hiv/h2.jpeg" alt="" /><img src="http://39.108.162.197/text/images/hiv/h3.jpeg" alt="" /><img src="http://39.108.162.197/text/images/hiv/h4.jpeg" alt="" /><img src="http://39.108.162.197/text/images/hiv/h5.gif" alt="" /><img src="http://39.108.162.197/text/images/hiv/h6.jpeg" alt="" /><img src="http://39.108.162.197/text/images/hiv/h7.jpeg" alt="" /><img src="http://39.108.162.197/text/images/hiv/h8.jpeg" alt="" /><img src="http://39.108.162.197/text/images/hiv/h9.jpeg" alt="" /><img src="http://39.108.162.197/text/images/hiv/h10.jpeg" alt="" /></div>',
  },

  onLoad: function (option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    console.log(postId);
    var postData = postsData.postList[postId];
    console.log(postData);
    console.log(postsData);
    this.setData({
      postData: postData
    })
    var that = this;
    if (postId == 0) {
      WxParse.wxParse('article', 'html', that.data.article, that, 5);
    }
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected === undefined) {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

  },

  onColletionTap: function (event) {
    this.getPostsCollectedSyc();
    //this.getPostsCollectedAsy();
  },

  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      // app.globalData.g_currentMusicPostId = null;
      app.globalData.g_isPlayingMusic = false;
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
      app.globalData.g_isPlayingMusic = true;
    }
  },

  getPostsCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      }
    })
  }, //异步

  getPostsCollectedSyc: function () {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);
  }, //同步


  showToast: function (postsCollected, postCollected) {
    // 更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },

  onShareTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        //res.cancel;
        //res.tapIndex;//数组元素 从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + "分享功能尚未开发完成orz",

        })
      }
    })
  }


})