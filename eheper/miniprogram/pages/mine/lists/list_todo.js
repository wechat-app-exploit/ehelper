// pages/mine/lists/list_todo.js

const app = getApp()

Page({

  data: {
    sche_list: []
  },

  onLoad: function (options) {
    const db = wx.cloud.database({}); //获取数据库的引用
    const table = db.collection('schedule'); //获取该集合的引用
    let openid = app.globalData.openid;
    let _this = this;
    table.where({
      _openid: openid,
      status: 0
    }).get({
      success: res => {
        // console.log(res.data);
        // console.log(this);
        this.setData({
          sche_list: res.data
        })
      }
    });
  },

})