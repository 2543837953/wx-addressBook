// pages/department/department.js
import {my_showToast, request} from '../../request/index';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    departmentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDepData();
  },

  onClose(event) {
    const { position,instance} = event.detail;
    switch (position) {
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          request({
            url:"/api/department/del/"+event.detail.name,
            header:{"Authorization":'Bearer '+wx.getStorageSync('user').token}
          }).then(res=>{
            if (res.statusCode===200){
                this.getDepData();
            }else if (res.statusCode===406){
               my_showToast('部门还存在成员','error');
               instance.close();
             }
          })
        });
        break;
    }
  },
  getDepData(){
      request({
        url:"/api/department/list",
        header:{"Authorization":'Bearer '+wx.getStorageSync('user').token}
      }).then(res=>{
        this.setData({
          departmentList:res.data.data
        })
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