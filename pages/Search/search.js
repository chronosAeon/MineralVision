const app = getApp()

Page({
  data: {
    
  },
  onLoad: function () {

  },
  onFocus: function (event) {
    console.log('focus')
    this.setData({
      focus: true
      //"searchPageShow": true,
      // "currentPageShow": false
    })
  },
  blurFocus: function (event) {
    //失去聚焦
    var inputContent = event.detail.value;
    console.log('blur')
  },
  cancelTap: function (event) {
    console.log('cancel')
    this.setData({
      focus: false
      //"searchPageShow": false,
      // "currentPageShow": true
    })
  }
})
