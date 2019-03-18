Page({
  onTap: function (event) {
    //navigateTo
     wx.redirectTo({
         url:"../posts/posts"
     });
    //冒泡与非冒泡
   //  wx.switchTab({
   //   url: "../posts/posts"
  //  });

  },
  onReachBottom: function (event) {
    console.log('asfasdfa')
  }
})