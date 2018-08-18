// pages/MineralDetail/MineralDetail.js
const app = getApp()
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
      img_server: app.globalData.round_img_server
    })
    // var that = this
    wx.request({
      url: app.globalData.Server+'getItemDetailByid?id=' + this.data.id + '&key=nOngSiGuapIzHAnG',
      success: res => {
        console.log(res)
        //找到分类
        this.get_self_class(app.globalData.class_tree, res.data.pid)
        //获取转盘长图的url
        //判断是否是有

        //检测是否有+N和-N属性
        var N = null
        var n = null
        var CL = null
        var scope_array_name = new Array()
        var scope_array = new Array()
        if (res.data.baopians.length > 0 || res.data.baopians.length == undefined) {
          for (var name in res.data.baopians) {
            if (res.data.baopians[name]['+N'] != undefined) {
              N = app.globalData.round_img_server + res.data.baopians[name]['+N'].path + '/l.jpg'      
              if(res.data.baopians[name]['+N']['gypsum']!=undefined){
                this.setData({
                  gypsum: app.globalData.round_img_server + res.data.baopians[name]['+N'].path+'/gypsum/'+res.data.baopians[name]['+N']['gypsum']
                })
              }
              else{
                this.setData({
                  gypsum: null
                })
              }
              if (res.data.baopians[name]['+N']['mica'] != undefined) {
                this.setData({
                  mica: app.globalData.round_img_server + res.data.baopians[name]['+N'].path + '/mica/'+res.data.baopians[name]['+N']['mica']
                })
              }
              else {
                this.setData({
                  mica: null
                })
              }
              scope_array_name.push('正交偏光')
              scope_array.push('N')
            }
            if (res.data.baopians[name]['-N'] != undefined) {
              n = app.globalData.round_img_server + res.data.baopians[name]['-N'].path + '/l.jpg'
              scope_array_name.push('单偏光')
              scope_array.push('n')
            }
            if (res.data.baopians[name]['CL'] != undefined) {
              CL = app.globalData.round_img_server + res.data.baopians[name]['CL'].path + '/l.jpg'
              scope_array_name.push('锥光')
              scope_array.push('CL')
            }
          }
          this.setData({
            hasbaopians: true,
            scope_array_name: scope_array_name,
            scope_index: 0,
            scope_array: scope_array

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
          CL: CL
        })
        this.setData({
          current_scope: scope_array[0]
        })
        this.init_scope()
        var msg = this.data.result.desc
        this.getUrl(msg)
        //处理desc
        this.dealDesc(msg)
        //处理化学式
        this.dealFormula(this.data.result.formula)
      }
    })
  },
  getUrl: function(msg) {
    //处理<img>逻辑
    var reg = /\/.{0,50}jpg/g //匹配图片网址
    var ImgUrlArr = msg.match(reg) //获得图片网址
    var VideoUrlArr = msg.match(/\/v.*\.mp4/g) //获取video的网址
    this.setData({
      ImgUrlArr: ImgUrlArr,
      VideoUrlArr: VideoUrlArr
    })
  },
  //对描述文本进行处理
  dealDesc: function(msg) {

    // 代替所有的空格符
    msg = msg.replace(/\s*/g, '');

    var array = msg.split(/<\/?[A-Za-z]*>/) //用所有文本标签分割
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
      array: array
    })

  },
  //处理化学式的显示问题
  dealFormula: function(Formula) {
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
      this.setData({
        arr: arr

      })
    } else {

    }
  },

  bindPickerChange: function(e) {
    this.setData({
      current_scope: this.data.scope_array[e.detail.value],
      scope_index: e.detail.value
    })
    this.init_scope()
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
  get_self_class: function(tree_array, id) {
    // console.log(id)
    //通过当前id在分类树里面查找分类
    //tree 里面的id等于id
    // console.log(this.tree_serach(tree_array[1], 650, tree_array[1].name))
    for (var i = 0; i < tree_array.length; i++) {
      this.tree_serach(tree_array[i], id, tree_array[i].name)
    }
  },
  tree_serach: function(tree, id, name, flag = false) {
    // console.log(tree)

    for (var i = 0; i < tree.children.length; i++) {
      if (parseInt(tree.children[i].id) == id) {
        // console.log(name)
        //要拿到数据必须是用全局变量，不能通过return获得
        this.setData({
          belong: name + '/' + tree.children[i].name
        })
        return name + '/' + tree.children[i].name

      } else {
        this.tree_serach(tree.children[i], id, name + '/' + tree.children[i].name)
      }
    }
    if (!tree.children.length) {
      //没有子节点
      return null
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})