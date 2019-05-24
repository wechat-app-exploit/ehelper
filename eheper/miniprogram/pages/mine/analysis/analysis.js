// pages/mine/analysis/analysis.js

const app = getApp()

Page({

  data: {
    todoNum: 10, //待完成日程数目  status:0
    doneNum: 10, //已完成日程数目  status:1
    undoneNum: 10, //未完成日程数目  status:2
  },

  onLoad: function (options) {
    const db = wx.cloud.database({}); //获取数据库的引用
    const table = db.collection('schedule'); //获取该集合的引用
    let openid = app.globalData.openid;
    let _this = this;
    //todoNum
    table.where({
      _openid: openid,
      status: 0
    }).count().then(res => {
      this.setData({
        todoNum: res.total
      })
      app.globalData.priorityArr[0] = this.data.todoNum
    });
    //doneNum
    table.where({
      _openid: openid,
      status: 1
    }).count().then(res => {
      this.setData({
        doneNum: res.total
      })
      app.globalData.priorityArr[1] = this.data.doneNum
    });
    //undoneNum
    table.where({
      _openid: openid,
      status: 2
    }).count().then(res => {
      this.setData({
        undoneNum: res.total
      })
      app.globalData.priorityArr[2] = this.data.undoneNum
    });

    console.log(app.globalData.priorityArr[0])
    
  },

  onReady: function () {

    

    var context = wx.createCanvasContext('Canvas');
    var array = [20, 50, 60];
    var colors = ["#228B22", "#008B8B", "#ADFF2F"];
    var total = 0;
    for (var val = 0; val < array.length; val++) {
      total += array[val];
    }
    var point = { x: 160, y: 120 };
    var radius = 100;
    for (var i = 0; i < array.length; i++) {
      context.beginPath();
      var start = 0;
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          start += array[j] / total * 2 * Math.PI;
        }
      }
      context.arc(point.x, point.y, radius, start, start + array[i] / total * 2 * Math.PI, false);
      context.setLineWidth(2)
      context.lineTo(point.x, point.y);
      context.setStrokeStyle('#F5F5F5');
      context.setFillStyle(colors[i]);
      context.fill();
      context.closePath();
      context.stroke();
    }
    context.draw();
  },

})