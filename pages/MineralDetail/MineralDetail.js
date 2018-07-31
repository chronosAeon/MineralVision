// pages/MineralDetail/MineralDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasbaopians: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      id: options.id,
    })
    // var that = this
    wx.request({
      url: 'http://www.netdcg.cdut.edu.cn:8080/default/api/getItemDetailByid?id=' + this.data.id + '&key=nOngSiGuapIzHAnG',
      success: res => {
        console.log(res)
        //获取转盘长图的url
        //判断是否是有

        //检测是否有+N和-N属性
        var N = null
        var n = null
        if (res.data.baopians.length > 0 || res.data.baopians.length == undefined) {
          for (var name in res.data.baopians) {
            if (res.data.baopians[name]['+N'] != undefined) {
              var N = 'http://202.115.137.42:8080/' + res.data.baopians[name]['+N'].path + '/l.jpg'
            }
            if (res.data.baopians[name]['-N'] != undefined) {
              var n = 'http://202.115.137.42:8080/' + res.data.baopians[name]['-N'].path + '/l.jpg'
            }
            // if（res.data.baopians[name]['Cl']
          }
          this.setData({
            hasbaopians: true
          })
        } else {
          this.setData({
            hasbaopians: false
          })
        }

        this.setData({
          result: res.data,
          N: N,
          n: n,
        })
        if (N || n) {
          this.init_scope()
        }
        var msg = this.data.result.desc
        //处理<img>逻辑
        var reg = /\/.*jpg/g //匹配图片网址
        var ImgUrlArr = msg.match(reg) //获得图片网址
        var VideoUrlArr = msg.match(/\/.*\.mp4/g) //获取video的网址

        // 代替所有的空格符
        msg = msg.replace(/\s*/g, '');

        var array = msg.split(/<\/?[A-Za-z]*>/) //用所有文本标签分割

        //去掉数组中的空串
        for (var i = 0; i < array.length; i++) {
          if (array[i] == '') {
            array.splice(i, 1)
            i--
          }
        }
        var ImgNum = 1
        var VideoNum = 10
        //处理图片 将数组中含有img的用0-9的数字代替，方便获取图片
        for (var i = 0; i < array.length; i++) {

          var a = array[i].toString().match(/<i.*>/)
          if (a != null) {
            array[i] = ImgNum++
          }

        }

        //同样的方法 用10~xx代替video
        for (var i = 0; i < array.length; i++) {
          var a = array[i].toString().match(/<v.*>/)
          if (a) {
            array[i] = VideoNum++
          }
        }

        //处理化学式   转化为字母数组 再惊行一个个输出
        var formula = this.data.result.formula
        this.setData({
          formula: formula
        })
        if (formula) {
          formula = formula.replace(/<sub>/g, '')
          formula = formula.replace(/<\/sub>/g, '')
          formula = formula.replace(/<sup>/g, '')
          formula = formula.replace(/<\/sup>/g, '')

          var a = 'aaaa'

          var arr = []
          for (var i = 0; i < formula.length; i++) {
            arr.push(formula.charAt(i))
          }

          this.setData({
            arr: arr,
            array: array,
            ImgUrlArr: ImgUrlArr,
            VideoUrlArr: VideoUrlArr
          })
        } 
        else {
          this.setData({
            array: array,
            ImgUrlArr: ImgUrlArr,
            VideoUrlArr: VideoUrlArr
          })
        }
      }
    })




  },
  init_scope: function() {
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#kz').boundingClientRect()
    query.exec(res => {
      //res就是 该元素的信息 数组
      var centerX = res[0].width / 2;
      var centerY = res[0].height / 2;
      this.setData({
        centerX: centerX,
        centerY: centerY
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})