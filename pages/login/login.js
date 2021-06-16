// pages/login/login.js
import {login, my_showToast} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'17787449707',
    password:'123456'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getLogin(){
    login({
      url:"/api/login",
      method:"post",
      data:{
        'mobile':this.data.phone,
        'password':this.data.password
      }
    }).then(result=> {
      result.statusCode===500&&(my_showToast('手机或者密码错误','error'))
      if (result.statusCode === 200) {
        let user = result.data;
        wx.setStorageSync('user', user);
        my_showToast('登录成功')
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/home/home'
          })
        }, 500)
      }
    })
  },
  onLoad: function (options) {
      wx.getStorageSync('user')&&(wx.switchTab({
        url:'/pages/home/home'
      }));
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})