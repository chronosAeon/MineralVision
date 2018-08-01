// components/moveImg/moveImg.js
Component({
  /**
   * 组件的属性列表
   */
  /*path_mode==true代表是传入缓存路径，false代表是网络路径，由组件去download，但是组件download的话就不能数据绑定传入值，值是会传入，所有的代码是不会再次刷新的不管是draw还是download，而组件的attach和ready都是会比
页面早加载的所以代码运行的时候肯定是没有加载好的，所以肯定是无法传入的*/
  properties: {
    mica: String,
    gypsum: String,
    img_url: String,
    angle: Number,
    centerX: Number,
    centerY: Number,
    gypsum: String,
    mica: String,
  },

  /**
   * 组件的初始数据
   */
  //5度为阈值
  //还有特定角度升降物台的功能
  data: {
    view_angle: 0,
    angle_threshold_value: 5,
    gypsum_path: null,
    add_gypsum_flag: false,
    mica_path: null,
    add_mica_flag: false,
    getfocus:true
  },
  
  attached: function() {
    console.log(this.data.gypsum)
    console.log(this.data.mica)
    const ctx = wx.createCanvasContext('mycanvas', this)
    console.log(this.data.img_url)
    // console.log(this.data.centerX)
    this.setData({
      ctx: ctx,
      ready: false
    })
    //网络下载图片
    wx.downloadFile({
      url: this.data.img_url,
      success: res => {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        //每次下载一次都要有缓存机制，就不用每次微信服务器都取下载一次图片
        //最好是大图
        if (res.statusCode === 200) {
          var rr = res.tempFilePath;
          this.setData({
            tempFilePath: rr,
            ready: true
          })
          ctx.drawImage(rr, 0, 0, 586, 416.666, 0, 0, 400, 285)
          ctx.draw()
        }
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    add_gypsum: function (e) {
      var gypsum_page = this.data.gypsum.replace(/(.*\/)*([^.]+).*/ig, "$2");
      console.log(gypsum_page)
      this.setData({
        view_angle: gypsum_page * 5
      })
      if (!this.data.add_gypsum_flag) {
        this.draw_gypsum()
        this.setData({
          add_gtpsum_flag: true
        })
      }
      else {
        this.data.ctx.drawImage(tempFilePath, 0, 0, 586, 416.666, 0, 0, 400, 285)
        this.data.ctx.draw()
      }
    },
    draw_gypsum: function () {
      if (!this.data.gypsum_path) {
        wx.downloadFile({
          url: this.data.gypsum,
          success: res => {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            //每次下载一次都要有缓存机制，就不用每次微信服务器都取下载一次图片
            //最好是大图
            if (res.statusCode === 200) {
              var gypsum_path = res.tempFilePath;
              this.setData({
                gypsum_path: gypsum_path,
                ready: true
              })
              this.data.ctx.drawImage(gypsum_path, 0, 0, 586, 416.666, 0, 0, 400, 285)
              this.data.ctx.draw()
            }
          }
        })
      } else {
        this.data.ctx.drawImage(this.data.gypsum_path, 0, 0, 586, 416.666, 0, 0, 400, 285)
        this.data.ctx.draw()
      }
    },
    add_mica: function (e) {
      // var n = this.data.mica.search(/（[0-9]+.jpg/g);
      var mica_page = this.data.mica.replace(/(.*\/)*([^.]+).*/ig, "$2");
      console.log(mica_page)
      this.setData({
        view_angle:mica_page*5
      })
      if (!this.data.add_mica_flag) {
        this.draw_mica()
        this.setData({
          add_mica_flag: true
        })
      }
      else {
        this.data.ctx.drawImage(tempFilePath, 0, 0, 586, 416.666, 0, 0, 400, 285)
        this.data.ctx.draw()
      }
    },
    draw_mica:function(){
      if (!this.data.mica_path) {
        wx.downloadFile({
          url: this.data.mica,
          success: res => {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            //每次下载一次都要有缓存机制，就不用每次微信服务器都取下载一次图片
            //最好是大图
            if (res.statusCode === 200) {
              var mica_path = res.tempFilePath;
              this.setData({
                mica_path: mica_path,
                ready: true
              })
              this.data.ctx.drawImage(mica_path, 0, 0, 586, 416.666, 0, 0, 400, 285)
              this.data.ctx.draw()
            }
          }
        })
      } else {
        this.data.ctx.drawImage(this.data.mica_path, 0, 0, 586, 416.666, 0, 0, 400, 285)
        this.data.ctx.draw()
      }
    },
    touchstart: function(e) {
      //important：这个地方应该是有当前角度的记忆功能
      //开始的时候计算线函数
      // console.log(e.touches[0])
      this.setData({
        getfocus: true
      })
      if (!this.data.angle) {
        //如果是第一滑动就赋值为零,开始点击就开始设置初始点击位置点
        this.setData({
          angle: 0,
          startX: e.touches[0].x,
          startY: e.touches[0].y
        })
      }
      var slope = this.calculate_slope(this.data.startX, this.data.startY, this.data.centerX, this.data.centerY)
      var b = this.calculate_b(slope, this.data.centerX, this.data.centerY)
      var is_reverse = this.is_start_point_in_reverse_location(this.data.startX)
      this.setData({
        slope: slope,
        b: b,
        is_reverse: is_reverse
      })
    },
    touchmove: function(e) {
      console.log('x:' + this.data.centerX + 'y:' + this.data.centerY)
      this.setData({
        angle: this.data.angle + 1,
        currentX: e.touches[0].x,
        currentY: e.touches[0].y
      })
      var get_position = this.calculate_point_location(this.data.slope, this.data.b, this.data.currentX, this.data.currentY)
      console.log('currentX:' + this.data.currentX + 'currentY:' + this.data.currentY)
      //这里拿到弧度值
      var hd = this.calculate_Angel(this.data.startX, this.data.startY, this.data.currentX, this.data.currentY)
      var angle = Math.ceil(180 / Math.PI * hd);
      if (this.data.is_reverse) {
        angle = 360 - angle;
      }
      //获得角度
      if (get_position) {
        angle = 180 + (180 - angle)
      }
      console.log(angle)
      this.setData({
        view_angle: angle
      })
      this.draw_long_img(angle, this.data.angle_threshold_value, 200, 100)
      //要实现360度而不是180度旋转就必须做屏幕切分，每次点击开始的时候把开始点连接中心线，然后做这条线的垂线然后判断当前触碰区域是否在第三第四象限，如果在就是角度累加180
    },

    touchend: function(e) {
      console.log('end')
      this.setData({
        getfocus: false
      })
    },
    draw_long_img(angle, angle_threshold_value, eachImgwidth, eachImgHeight) {
      var page = parseInt(angle / angle_threshold_value)
      var clipY = eachImgHeight * page
      var weight = eachImgwidth
      console.log(page)

      if (this.data.page != page) {
        this.data.ctx.drawImage(this.data.tempFilePath, 0, 416.666 * page, 586, 416.666, 0, 0, 400, 285)
        this.data.ctx.draw()
      }
      this.setData({
        page: page
      })
    },
    is_start_point_in_reverse_location: function(startX) {
      if (startX <= this.data.centerX) {
        console.log('true')
        return true
      } else {
        console.log('false')
        return false
      }
    },
    calculate_point_location: function(slope, b, CurrentX, CurrentY) {
      // 返回false表示点在线段的左边或下边,如果true表示点在线段右边或者上边
      console.log('lineY:' + (CurrentX * slope + b))
      if ((CurrentX * slope + b) <= CurrentY) {

        console.log('false')
        return false
      } else {
        console.log('true')
        return true
      }
    },
    calculate_slope: function(first_pointX, first_pointY, second_pointX, second_pointY) {
      // 斜率计算是有问题的
      var slope = (first_pointY - second_pointY) / (first_pointX - second_pointX)
      return slope
    },
    calculate_b: function(slope, pointX, pointY) {
      var b = pointY - (slope * pointX)
      return b
    },
    calculate_y: function(pointX, slope, b) {
      return slope * pointX + b
    },
    calculate_Angel: function(startX, startY, currentX, currntY) {
      // console.log(this.data.centerY)
      var c = this.calculate_Distance(this.data.startX, this.data.startY, this.data.currentX, this.data.currentY)

      var a = this.calculate_Distance(this.data.startX, this.data.startY, this.data.centerX, this.data.centerY)
      var b = this.calculate_Distance(this.data.currentX, this.data.currentY, this.data.centerX, this.data.centerY)
      var cosc = (a * a + b * b - c * c) / (2 * a * b)
      // console.log(cosc)
      var angle = Math.acos(cosc)
      // console.log(angle)
      // 返回角度
      return angle
    },
    //计算两点之间的距离
    calculate_Distance: function(startX, startY, endX, endY) {
      var x_abs = Math.abs(startX - endX)
      var y_abs = Math.abs(startY - endY)
      var distance = Math.sqrt(x_abs * x_abs + y_abs * y_abs)
      return distance
    }
  }
})