var postsData = require('post-detail/posts-data.js')


Page({
  data: {

  },

  onLoad: function () {

    // this.data.postList = postsData.postList
    this.setData({
      postList: postsData.postList
    });
  },

  onPostTap(event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })

  },
  
})