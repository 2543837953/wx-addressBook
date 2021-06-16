// pages/detail/detail.js
import {my_showToast, request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherInfo:[],
    showEdit:false,
    showDel:false,
    delId:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getTeacherInfoData(options.id);
  },
  playPhone(){
    wx.makePhoneCall({
      phoneNumber:this.data.teacherInfo.mobile
    })
  },
  delEmp(){
    let user=wx.getStorageSync('user');
    request({
      url:'/api/employees/del/'+user.user.id+'/'+this.data.delId,
      header:{'authorization':'Bearer '+wx.getStorageSync('user').token}
    }).then(res=>{
        if (res.statusCode===200){
          my_showToast('删除人员成功','success')
          setTimeout(()=>{
            wx.switchTab({
              url:'/pages/home/home'
            })
          },500)
        }else if(res.statusCode===403){
          my_showToast('没有权限操作','error')
        }
    })
  },
  getTeacherInfoData(id){
    this.setData({
      delId:id
    })
    request({
      url:'/api/employees/list/'+id,
      header:{'authorization':'Bearer '+wx.getStorageSync('user').token}
    }).then(res=>{
      // console.log(res.data.data)
      this.isShowEditFun(res.data.data);
      this.isShowDelFun(res.data.data);
      this.setData({
        teacherInfo:res.data.data
      })
    })
  },
  isShowEditFun(currentUser){
    let user=wx.getStorageSync('user');
    if(user.user.admin===1||
    user.user.department_admin===1&&currentUser.department===user.user.department&&currentUser.admin!==1||
        currentUser.id===user.user.id
    ){
      this.setData({
        showEdit:true
      })
    }
  },
  isShowDelFun(currentUser){
    let user=wx.getStorageSync('user');
    if(user.user.admin===1&&currentUser.id!==user.user.id||
        user.user.department_admin===1&&currentUser.department===user.user.department&&currentUser.admin!==1&&currentUser.id!==user.user.id
    ){
      this.setData({
        showDel:true
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