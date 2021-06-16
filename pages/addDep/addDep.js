// pages/addDep/addDep.js
import {my_showToast, request} from "../../request/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:"社会与服务系",
      telephone:'12345678910'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  addDep(){
    if (!this.data.name&&!this.data.telephone){
        my_showToast('内容为空','error')
    }else {
      request({
        url: "/api/department/new",
        data:{
          'department':this.data.name,
          'telephone':this.data.telephone,
        },
        method: "post",
        header: {"Authorization": "Bearer " + wx.getStorageSync('user').token},
      }).then(res => {
        console.log(res);
        if (res.statusCode === 200) {
          my_showToast('添加成功', 'success')
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/department/department'
            })
          }, 500)
        } else if (res.statusCode === 422) {
          my_showToast('部门或号码重复', 'error')
        }
      })
    }
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