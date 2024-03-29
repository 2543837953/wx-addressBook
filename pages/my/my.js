// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    authority:null,
    addE:false,
    addD:false,
    department:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user=wx.getStorageSync('user');
    !!user&&(this.setData({
      user:user.user
    }))
    this.setAuthority();
    this.setShow();
  },
  setShow(){
      this.data.user.admin===1&&(this.setData({
        addE:true,
        addD:true,
        department:true
      }))
    this.data.user.department_admin===1&&(this.setData({
      addE:true
    }))
  },
  setAuthority(){
    this.data.user.admin===1&&(this.setData({
      authority:"超级管理员"
    }))
    this.data.user.department_admin===1&&(this.setData({
      authority:"部门管理员"
    }))
    this.data.user.department_admin!==1&&this.data.user.admin!==1&&(this.setData({
      authority:"普通员工"
    }))
  },
  Logout(){
    wx.removeStorageSync('user');
    wx.redirectTo({
      url:"/pages/login/login"
    })
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