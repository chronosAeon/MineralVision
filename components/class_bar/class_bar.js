// components/class_bar/class_bar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classes: {
      type: Object
    },
    indent: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // items: [{
    //   id: 326,
    //   item_img: "/image/mineral/gangyu.jpg",
    //   title: "刚玉"
    // }, {
    //   id: 305,
    //   item_img: "/image/mineral/fangjieshi.jpg",
    //   title: "方解石"
    // }, {
    //   movieId: 313,
    //   item_img: "/image/mineral/fangnashi.jpg",
    //   title: "方钠石"
    // }, {
    //   movieId: 314,
    //   item_img: "/image/mineral/youlianshi.jpg",
    //   title: "黝帘石"
    // }]
    show_list_flag:false
  },
  attached: function() {
    // console.log(this.data.classes)
    // this.get_items_data()
    this.set_indent()

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取当前分类下的数据
    get_items_data: function (id) {
      wx.request({
        url: app.globalData.Server + 'getItemListByid?' + app.globalData.const_key+'&id='+id,
        success:res=>{
          console.log(res)
          this.setData({
            items:res.data
          })
        }
      })
    },
    set_indent: function (indent = 30) {
      var next_margin_left = this.data.indent + indent
      this.setData({
        self_object: this.data.classes,
        margin_left: this.data.indent,
        next_m_l: next_margin_left
      })
    },
    show_list: function(e) {
      if(!this.data.show_list_flag){
        //当前是关闭状态打开就会去获取数据
        this.get_items_data(e.currentTarget.dataset.id)
      }
      //把flag标志反转
      var flag = !this.data.show_list_flag
      this.setData({
        show_list_flag:flag
      })
  
      console.log(e)
      
      this.setData({
        isshowfriend: !this.data.isshowfriend
      })
    },
    DetailTap: function(event) {
      wx.navigateTo({
        url: '/pages/MineralDetail/MineralDetail?id=' + event.currentTarget.dataset.id
      })
    }
  }
})