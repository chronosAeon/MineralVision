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
        console.log(msg)
        //获取路径
        this.getUrl(msg)
        //处理desc
        this.dealDesc(msg)
       //处理化学式
        this.dealFormula(this.data.result.formula)
      }
    })

  },

//获取图片路径和视频路径
  getUrl:function(msg){
    //处理<img>逻辑
    var reg = /\/.{0,50}jpg/g //匹配图片网址
    var ImgUrlArr = msg.match(reg) //获得图片网址
    var VideoUrlArr = msg.match(/\/v.*\.mp4/g) //获取video的网址

    console.log(ImgUrlArr)
    console.log(VideoUrlArr)
    this.setData({
      ImgUrlArr: ImgUrlArr,
      VideoUrlArr: VideoUrlArr
    })
  },
//对描述文本进行处理
  dealDesc:function(msg){

    // 代替所有的空格符
    msg = msg.replace(/\s*/g, '');

    var array = msg.split(/<\/?[A-Za-z]*>/) //用所有文本标签分割
    console.log(array)
    for (var i = 0; i < array.length; i++) {
      if (array[i].toString().match(/<p.*>/)) {
        array.splice(i, 1)
        i--
      }
    }

    //去掉数组中的空串
    for (var i = 0; i < array.length; i++) {
      if (array[i] == '') {
        array.splice(i, 1)
        i--
      }
    }
    console.log(array)

    //处理'【】'不连贯问题
    for (var i = 0; i < array.length; i++) {
      if (array[i] == '【') {
        array[i] = array[i] + array[i + 1] + array[i + 2]
        array.splice(i + 1, 2)
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
    this.setData({
      array:array
    })

  },
  //处理化学式的显示问题
  dealFormula:function(Formula){
    //处理化学式   转化为字母数组 再惊行一个个输出
    var formula = Formula
    this.setData({
      formula: formula
    })
    if (formula) {
      // formula = formula.replace(/<sub>/g, '')
      formula = formula.replace(/<\/?sub>/g, '')
      //  formula = formula.replace(/<sup>/g, '')
      formula = formula.replace(/<\/?sup>/g, '')
      formula = formula.replace(/&nbsp;/g, '')

      var arr = []
      for (var i = 0; i < formula.length; i++) {
        arr.push(formula.charAt(i))
      }
      console.log(formula.length)
      this.setData({
        arr: arr

      })
    }
    else {

    }
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