// pages/posts/post-ceshi/post-ceshi.js
const WxParse = require('../../../wxParse/wxParse.js');
Page({

data: {
  article: '<div style="text-align:center;">awsl<img src="../../../images/hiv/h1.jpeg" alt="" /><img src="../../../images/hiv/h2.jpeg" alt="" /><img src="../../../images/hiv/h3.jpeg" alt="" /><img src="../../../images/hiv/h4.jpeg" alt="" /><img src="../../../images/hiv/h5.gif" alt="" /><img src="../../../images/hiv/h6.jpeg" alt="" /><img src="../../../images/hiv/h7.jpeg" alt="" /><img src="../../../images/hiv/h8.jpeg" alt="" /><img src="../../../images/hiv/h9.jpeg" alt="" /><img src="../../../images/hiv/h10.jpeg" alt="" /></div>',
},
/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
  var that = this;
  WxParse.wxParse('article', 'html', that.data.article, that, 5);

},
})