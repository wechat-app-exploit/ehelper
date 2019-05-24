// pages/mine/highest/highest.js

const app = getApp()

Page({

  data: {
    totalNum: 30, //总日程数目
    highestNum: 10, //重要性高的日程数目  priority:2
    higher: 10, //重要性中等的日程数目  priority:1
    high: 10, //重要性低的日程数目  priority:0
  },

  onLoad: function(options) {
    const db = wx.cloud.database({}); //获取数据库的引用
    const table = db.collection('schedule'); //获取该集合的引用
    let openid = app.globalData.openid;
    let _this = this;

    //highestNum
    table.where({
      _openid: openid,
      priority: 2
    }).count().then(res => {
      this.setData({
        highestNum: res.total
      })
    });
    //higherNum
    table.where({
      _openid: openid,
      priority: 1
    }).count().then(res => {
      this.setData({
        higherNum: res.total
      })
    });
    //highNum
    table.where({
      _openid: openid,
      priority: 0
    }).count().then(res => {
      this.setData({
        highNum: res.total
      })
    });
  },

})