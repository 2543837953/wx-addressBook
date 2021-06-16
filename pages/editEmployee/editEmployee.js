// pages/editEmployee/editEmployee.js
import {my_showToast, request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empData:[],
    departmentList:[],
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
      },
    ],
    comIndex:0,
    index:[],
    isShowC:false,
    isShowD:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEmpData(options.id)
    let user=wx.getStorageSync('user');
      if (!!user){
          user.user.admin===1&&(this.setData({
            isShowC:true,
            isShowD:true
          }))
          user.user.department_admin===1&&(this.setData({
            isShowD:true
          }))
      }
  },
  formSubmit(e){
    let data={
      "name":e.detail.value.name,
      "birth_date":e.detail.value.birth_date,
      "gender":e.detail.value.gender,
      "email":e.detail.value.email,
      "mobile":e.detail.value.mobile,
      "post_title":e.detail.value.post_title,
      "department_id":e.detail.value.department_id,
      "category_id":1,
      "username":e.detail.value.username,
      "competence":e.detail.value.competence
    };
    let user=wx.getStorageSync('user');
    if(user.user.department_admin===1){
      data.competence="user";
    }else if (user.user.department_admin!==1&&user.user.admin!==1){
      data.competence="user";
      data.department_id=this.data.departmentList.filter(d=>d.name===user.user.department)[0].id;
    }
    request({
      url:"/api/employees/list/edit/"+this.data.empData.id,
      data:data,
      method:"PUT",
      header:{"Authorization":'Bearer '+wx.getStorageSync('user').token}
    }).then(res=>{
      if (res.statusCode===200){
        my_showToast('编辑成功','success')
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
  setCompetence(emp){
    if (emp.admin===1){
      this.setData({
        comIndex:0
      })
    }else if (emp.department_admin===1){
      this.setData({
        comIndex:1
      })
    }else {
      this.setData({
        comIndex:2
      })
    }
  },
  setDepartment(emp,dep){
    dep.filter((d,i)=>{
      d.name===emp.department&&(
          this.setData({
            index:i
          })
      )
    })
  },
  getDepData(){
    let user=wx.getStorageSync('user');
    request({
      url:"/api/department/list",
      header:{"Authorization":'Bearer '+wx.getStorageSync('user').token}
    }).then(res=>{
      if (!!user){
        if (user.user.department_admin===1){
          this.setData({
            departmentList:res.data.data.filter(d=>d.name===user.user.department)
          })
        }else {
          this.setData({
            departmentList:res.data.data
          })
        }
      this.setDepartment(this.data.empData,this.data.departmentList)
      }
    })
  },
  getEmpData(id){
    request({
      url:'/api/employees/list/'+id,
      header:{'authorization':'Bearer '+wx.getStorageSync('user').token}
    }).then(res=>{
      this.setData({
        empData:res.data.data
      })
      this.setCompetence(this.data.empData);
      this.getDepData();
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