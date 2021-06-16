// pages/addEmployee/addEmployee.js
import {my_showToast, request} from "../../request/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    departmentList:[],
    index:0,
    comIndex:0,
    competenceList:[],
    name:null,
    birth_date:null,
    phone:null,
    post_title:null,
    username:null,
    email:null
  },
  setCompetenceList(){
    let user=wx.getStorageSync('user');
    if (user.user.admin===1){
      this.setData({
        competenceList:[
          {
            name:'超级管理员',
            value:'root'
          },
          {
            name:'部门管理员',
            value:'admin'
          },
          {
            name:'员工',
            value:'user'
          }
        ]
      })
    }else if (user.user.department_admin===1){
      this.setData({
        competenceList:[
          {
            name:'员工',
            value:'user'
          }
        ]
      })
    }
  },
  formSubmit(e){
     request({
       url:"/api/employees/list/new",
       data:{
         "name":this.data.name,
         "birth_date":this.data.birth_date,
         "gender":e.detail.value.gender,
         "email":this.data.email,
         "mobile":this.data.phone,
         "post_title":this.data.post_title,
         "department_id":e.detail.value.department_id,
         "category_id":1,
         "username":this.data.username,
         "competence":e.detail.value.competence
       },
       method:"POST",
       header:{"Authorization":'Bearer '+wx.getStorageSync('user').token}
     }).then(res=>{
       if (res.statusCode===200){
         my_showToast('添加成功','success')
         setTimeout(()=>{
            wx.switchTab({
              url:'/pages/home/home'
            })
         },500)
       }else if (res.statusCode===422){
         my_showToast('内容不能为空','error')
       }else if (res.statusCode===402){
          my_showToast('电话号码重复','error')
       }else if (res.statusCode===423){
         my_showToast('邮箱重复','error')
       }
     })
  },
  getDepData(){
    let user=wx.getStorageSync('user');
    request({
      url:"/api/department/list",
      header:{"Authorization":'Bearer '+wx.getStorageSync('user').token}
    }).then(res=>{
      if (!!user) {
        if (user.user.department_admin === 1) {
          this.setData({
            departmentList: res.data.data.filter(d => d.name === user.user.department)
          })
        } else {
          this.setData({
            departmentList: res.data.data
          })
        }
      }
    })
  },
  // radioChange(e){
  //   this.setData({
  //     garde:e.detail.value
  //   })
  //   console.log(this.data.gender)
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDepData();
    this.setCompetenceList();
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