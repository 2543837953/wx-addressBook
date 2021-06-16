// pages/home/home.js

import { my_showToast, request} from "../../request/index";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        teacherList: []
    },
    QueryParams: {
        page: 1
    },
    totalPages: 1,
    /**
     * 生命周期函数--监听页面加载
     */
    getTeacherInfoData() {
        request({
            url: "/api/employees/list",
            data: this.QueryParams,
            header: {
                'authorization': 'Bearer ' + wx.getStorageSync('user').token
            }
        }).then(res => {
            this.totalPages = res.data.pageCount
            this.setData({
                teacherList: [...this.data.teacherList, ...res.data.data]
            })
            wx.stopPullDownRefresh();
        })
    },
    onLoad: function (options) {
        this.getTeacherInfoData();
    },
    onReachBottom() {
        this.QueryParams.page++;
        this.QueryParams.page > this.totalPages ?my_showToast('没有数据了','none') : this.getTeacherInfoData();
    },
    onPullDownRefresh() {
        this.setData({
            teacherList: [],
        })
        this.QueryParams.page = 1
        this.getTeacherInfoData();
    }
})