// pages/MineralDetail/MineralDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init_scope()
  
  },
  onPullDownRefresh: function () {
    this.setData({
      loadingHidden: false
    });
    var that = this;
    // wx.request({
    //   url: 'https://www.geekxz.com/action/works/recWorks',
    //   data: {
    //     num: '5',
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data.data.works);
    //     that.setData({
    //       recWorks: res.data.data.works,
    //     })
    //   },
    //   complete: function () {        // complete
    //     wx.hideNavigationBarLoading() //完成停止加载
    //     wx.stopPullDownRefresh()      //停止下拉刷新
    //   }
    // })
     setTimeout(function () {
       that.setData({
         loadingHidden: true
       });
     }, 2000);
  },

  init_scope:function(){
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#kz').boundingClientRect()
    query.exec(res => {
      //res就是 该元素的信息 数组
      console.log(res);
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
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})