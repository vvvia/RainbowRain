import {
  Base
} from '../../utils/base.js'

class My extends Base {
  constructor() {
    super();
  }

  //得到用户信息
  getUserInfo(cb) {
    var that = this
    wx.login({
      success: function() {
        wx.getSetting({
          success: function(res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function(res) {
                  typeof cb == "function" && cb(res.userInfo);
                  if (!that.onPay) {
                    that._updateUserInfo(res.userInfo);
                  }
                },
                fail: function(res) {
                  typeof cb == "function" && cb({
                    avatarUrl: '../../imgs/icon/user@default.png',
                    nickName: '彩虹雨'
                  });
                }
              })
            }
          }
        })
      }
    })

  }



  /*更新用户信息到服务器*/
  _updateUserInfo(res) {
    var nickName = res.nickName;
    delete res.userAvatarUrl; //将昵称去除
    delete res.userNickName; //将昵称去除
    var allParams = {
      url: 'user/wx_info',
      data: {
        nickname: nickName,
        extend: JSON.stringify(res)
      },
      type: 'post',
      sCallback: function(data) {}
    };
    this.request(allParams);

  }
}



export {
  My
}