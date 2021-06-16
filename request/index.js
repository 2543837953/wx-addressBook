let ajaxTimes = 0;
export const request = (params) => {
    ajaxTimes++;
    wx.showLoading({
        title: '加载中',
        mask: true//现实蒙版
    });
    const baseUrl="https://www.gotoweb.top";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: (result) => {
                return resolve(result)
            },
            fail: (err) => {
                return reject(err);
            },
            complete: () => {
                ajaxTimes--;
                ajaxTimes===0&&(wx.hideLoading())
            }
        })
    });
}
export const login = (params) => {
    wx.showLoading({
        title: '登录中',
        mask: true//现实蒙版
    });
    const baseUrl="https://www.gotoweb.top";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: (result) => {
                return resolve(result)
            },
            fail: (err) => {
                return reject(err);
            },
            complete: () => {
                wx.hideLoading();
            }
        })
    });
}
// export const my_showLoading=()=>{
//     return new Promise(resolve => {
//         wx.showLoading({
//             title:'加载中',
//             success:resolve
//         })
//     })
// }
// export const my_hiedLoading=()=>{
//     return new Promise(resolve => {
//         wx.hideLoading({
//             success:resolve
//         })
//     })
// }
export const my_showToast = (title, icon) => {
    return new Promise(resolve => {
        wx.showToast({
            title: title,
            icon: icon,
            success: resolve
        })
    })
}