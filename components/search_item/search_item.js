// components/search_item/search_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    focus: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onFocus: function (event) {
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
  }
})
