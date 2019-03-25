var postsData = require('../../../data/posts-data.js')

Page({
  data: {
    isPlayingMusic: false
  },

  onLoad: function(option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    console.log(postId);
    var postData = postsData.postList[postId];
    console.log(postData);
    console.log(postsData);
    this.setData({
      postData: postData
    })

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

  onColletionTap: function(event) {
    this.getPostsCollectedSyc();
    //this.getPostsCollectedAsy();
  },

  onMusicTap: function(event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    var currentPostId = this.data.postId;
    var postData = postsData.postList[currentPostId];
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic : false
      })
    } else {
      wx.playBackgroundAudio({
        url: postData.music.url,
        title: postData.music.title,
        coverImg: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic : true
      })
    }

  },

  getPostsCollectedAsy: function() {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function(res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      }
    })
  }, //异步

  getPostsCollectedSyc: function() {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);
  }, //同步


  showToast: function(postsCollected, postCollected) {
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

  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
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
          content: "用户是否取消？" + res.cancel + "现在好像不支持分享，什么时候支持呢？",

        })
      }
    })
  }


})