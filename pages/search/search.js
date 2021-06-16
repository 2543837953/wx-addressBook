// pages/search/search.js
import {my_showToast, request} from "../../request/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    teacherList:[]
  },
  QueryParams:{
    page:1
  },
  totalPages:1,
  onSearch(e){
    if (!!e.detail){
      this.setData({
        value:e.detail,
        teacherList:[]
      })
      this.QueryParams.page=1
      this.getTeacherInfoData()
    }else {
      this.setData({
        teacherList:[]
      })
      my_showToast('内容为空','none')
    }
  },
  getTeacherInfoData(){
    request({
      url:'/api/employees/search/'+this.data.value,
      data:this.QueryParams,
      header:{'authorization':'Bearer '+wx.getStorageSync('user').token}
    }).then(res=>{
     !res.data.data[0]&&(my_showToast('搜索信息不存在','none'))
      this.totalPages=res.data.pageCount;
      this.setData({
        teacherList:[...this.data.teacherList,...res.data.data]
      })
    });
  },
  onReachBottom(){
      this.QueryParams.page++;
      this.QueryParams.page>this.totalPages?my_showToast('没有数据了','none'):this.getTeacherInfoData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})