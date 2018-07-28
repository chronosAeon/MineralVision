const app = getApp()

Page({
  data: {
    example:'铁矿石，石英'
  },
  onLoad: function () {

  },
  onFocus: function (event) {
    console.log('focus')
    this.setData({
      focus: true
    })
  },
  blurFocus: function (event) {
    //失去聚焦
    var inputContent = event.detail.value;
    this.setData({
      focus: false
    })
  },
  cancelTap: function (event) {
    console.log('cancel')
    this.setData({
      focus: false
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue:e.detail.value
    })

  },
  search:function(){
    this.setData({
      focus: true
    })

    console.log(this.data.inputValue)
    var inputValue = this.data.inputValue
    //点击搜索之后出现加载
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: 'http://www.netdcg.cdut.edu.cn:8080/default/api/searchItemByName?name=' + inputValue +'&key=nOngSiGuapIzHAnG',
      success: function (res) {
        //搜索完成，取消加载
        wx.hideLoading()
        console.log(res.data)
        //如果用户输入不正确就提示，输入正确就显示相应的值
        if(res.data == null){
          wx.showToast({
            title: '请检查输入名！',
            icon: 'none',
            duration: 2000
          })
        }else{
          that.setData({
            result: res.data
            })        
          }
      },

    })


  },
  showDetail:function(e){
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/MineralDetail/MineralDetail?id='+ id
    })
  }
  
})
