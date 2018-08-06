// pages/MineralDetail/MineralDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasbaopians: false,
    docs:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      server: app.globalData.round_img_server
    })
    // var that = this
    wx.request({
      url: app.globalData.Server + 'getItemDetailByid?id=' + this.data.id + '&key=nOngSiGuapIzHAnG',
      success: res => {
        console.log(res)
        //找到分类
        this.get_self_class(app.globalData.class_tree, res.data.pid)
        this.scope_setting(res)
        var msg = this.data.result.desc
        this.getUrl(msg)
        //处理desc
        this.dealDesc(msg)
        //处理化学式
        this.dealFormula(this.data.result.formula)
        wx.request({
          url: app.globalData.Server + 'redirect?' + 'key=nOngSiGuapIzHAnG&url=http://catalog.ngac.org.cn/clients/getMetadatas?KeyWord=' + res.data.name,
          success: doc_res => {
            console.log(doc_res)
            this.setData({
              docs:doc_res.data.docs
            })
          }
        })
      }
    })
    
  },
  scope_setting:function(res){
    //获取转盘长图的url
    //判断是否是有

    //检测是否有+N和-N属性res
    var N = null
    var n = null
    var CL = null
    var scope_array_name = new Array()
    var scope_array = new Array()
    if (res.data.baopians.length > 0 || res.data.baopians.length == undefined) {
      for (var name in res.data.baopians) {
        if (res.data.baopians[name]['+N'] != undefined) {
          N = app.globalData.round_img_server + res.data.baopians[name]['+N'].path + '/l.jpg'
          if (res.data.baopians[name]['+N']['gypsum'] != undefined) {
            var real_pic_path = this.resolve_dot_in_string(res.data.baopians[name]['+N']['gypsum'])
            this.setData({
              gypsum: app.globalData.round_img_server + res.data.baopians[name]['+N'].path + '/gypsum/' + real_pic_path
            })
          } else {
            this.setData({
              gypsum: null
            })
          }
          if (res.data.baopians[name]['+N']['mica'] != undefined) {
            var real_pic_path = this.resolve_dot_in_string(res.data.baopians[name]['+N']['mica'])
            this.setData({
              mica: app.globalData.round_img_server + res.data.baopians[name]['+N'].path + '/mica/' + real_pic_path
            })
          } else {
            this.setData({
              mica: null
            })
          }
          scope_array_name.push('正交偏光')
          scope_array.push('N')
        }
        if (res.data.baopians[name]['-N'] != undefined) {
          n = app.globalData.round_img_server + res.data.baopians[name]['-N'].path + '/l.jpg'
          if (res.data.baopians[name]['-N']['up'] != undefined) {
            var real_pic_path = this.resolve_dot_in_string(res.data.baopians[name]['-N']['up'])
            this.setData({
              n_gypsum: app.globalData.round_img_server + res.data.baopians[name]['-N'].path + '/up/' + real_pic_path
            })
          } else {
            this.setData({
              n_gypsum: null
            })
          }
          if (res.data.baopians[name]['-N']['down'] != undefined) {
            var real_pic_path = this.resolve_dot_in_string(res.data.baopians[name]['-N']['down'])
            this.setData({
              n_mica: app.globalData.round_img_server + res.data.baopians[name]['-N'].path + '/down/' + real_pic_path
            })
          } else {
            this.setData({
              n_mica: null
            })
          }
          scope_array_name.push('单偏光')
          scope_array.push('n')
        }
        if (res.data.baopians[name]['CL'] != undefined) {
          CL = app.globalData.round_img_server + res.data.baopians[name]['CL'].path + '/l.jpg'
          if (res.data.baopians[name]['CL']['gypsum'] != undefined) {
            var real_pic_path = this.resolve_dot_in_string(res.data.baopians[name]['CL']['gypsum'])
            this.setData({
              CL_gypsum: app.globalData.round_img_server + res.data.baopians[name]['CL'].path + '/gypsum/' + real_pic_path
            })
          } else {
            this.setData({
              CL_gypsum: null
            })
          }
          if (res.data.baopians[name]['CL']['mica'] != undefined) {
            var real_pic_path = this.resolve_dot_in_string(res.data.baopians[name]['CL']['mica'])
            this.setData({
              CL_mica: app.globalData.round_img_server + res.data.baopians[name]['CL'].path + '/mica/' + real_pic_path
            })
          } else {
            this.setData({
              CL_mica: null
            })
          }
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
    if (this.data.hasbaopians) {
      this.setData({
        current_scope: scope_array[0]
      })
      this.init_scope()
    }
  },
  resolve_dot_in_string:function(text){
    //绿柱石：gypsum: "9.jpg,Thumbs.db"
    if(text.indexOf(',')!=-1){
      return text.split(',')[0]
    }
    else{
      return text
    }
  },
  getUrl: function (msg) {
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
  dealDesc: function (msg) {

    // 代替所有的空格符
    msg = msg.replace(/\s*/g, '');
    //代替所有上下标
    msg = msg.replace(/<\/?sub>/g, '')
    console.log(msg)
    var array = msg.split(/<\/?[A-Za-z]*>/) //用所有文本标签分割



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
    var ImgNum = 31
    var VideoNum = 40

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
    //处理剩下的<p...>符号
    for (var i = 0; i < array.length; i++) {
      if (array[i].toString().match(/<p.*>/)) {
        var j = array[i].indexOf('>')
        array[i] = array[i].substr(j + 1, array[i].length - j)
      }
    }
    //再次去掉数组中的空串
    for (var i = 0; i < array.length; i++) {
      if (array[i] == '') {
        array.splice(i, 1)
        i--
      }
    }
    console.log(array)
    this.setData({
      array: array
    })

  },
  //处理化学式的显示问题
  dealFormula: function (Formula) {
    //处理化学式   转化为字母数组 再惊行一个个输出
    var formula = Formula
    this.setData({
      formula: formula
    })
    if (formula) {

      formula = formula.replace(/<\/?sub>/g, '')

      formula = formula.replace(/<\/?sup>/g, '')
      formula = formula.replace(/&nbsp;/g, '')
      formula = formula.replace(/&middot;/g, '.')

      var arr = []
      for (var i = 0; i < formula.length; i++) {
        if (formula.charAt(i) != '') {
          arr.push(formula.charAt(i))
        }
      }
      console.log(arr.length)
      this.setData({
        arr: arr
      })
    } else {

    }
  },
  doc_tap:function(e){
    var detail = JSON.stringify(e.currentTarget.dataset.doccontent)
    // console.log(e.currentTarget.dataset.doccontent)
    wx.navigateTo({
      url: '/pages/Doc/DocDetail?detail='+detail,
    })
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