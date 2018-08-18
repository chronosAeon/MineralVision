const app = getApp()

Page({
  data: {
    example: '铁矿石，石英'
  },
  onLoad: function () {
    wx.request({
      url: app.globalData.Server + 'getClassesTree?' + app.globalData.const_key,
      success: res => {
        var class_tree_data
        if (app.globalData.is_simulate) {
          //检测全局变量是否开启模拟数据模式
          class_tree_data = simulate_data.classes_tree
        } else {
          class_tree_data = res.data
        }
        var tree = new this.treeUtil(class_tree_data, 'id', 'pid');

        this.setData({
          tree_data: tree.toTree()
        })
        app.globalData.class_tree = this.data.tree_data
        console.log(this.data.tree_data)
      }
    })

  },
  treeUtil: function (data, key, parentKey, map) {
    this.data = data;
    this.key = key;
    this.parentKey = parentKey;
    this.treeParentKey = parentKey; //parentKey要转换成什么属性名称
    this.treeKey = key; //key要转换成什么属性名称
    this.map = map;
    if (map) {
      if (map[key]) this.treeKey = map[key];
    }
    this.toTree = function () {
      var data = this.data;
      var pos = {};
      var tree = [];
      var i = 0;
      while (data.length != 0) {
        if (data[i][this.parentKey] == 0) {
          var _temp = this.copy(data[i]);
          tree.push(_temp);
          pos[data[i][this.key]] = [tree.length - 1];
          data.splice(i, 1);
          i--;
        } else {
          var posArr = pos[data[i][this.parentKey]];
          if (posArr != undefined) {
            var obj = tree[posArr[0]];
            for (var j = 1; j < posArr.length; j++) {
              obj = obj.children[posArr[j]];
            }
            var _temp = this.copy(data[i]);
            obj.children.push(_temp);
            pos[data[i][this.key]] = posArr.concat([obj.children.length - 1]);
            data.splice(i, 1);
            i--;
          }
        }
        i++;
        if (i > data.length - 1) {
          i = 0;
        }
      }
      return tree;
    }
    this.copy = function (item) {
      var _temp = {
        children: []
      };
      _temp[this.treeKey] = item[this.key];
      for (var _index in item) {
        if (_index != this.key && _index != this.parentKey) {
          var _property = item[_index];
          if ((!!this.map) && this.map[_index])
            _temp[this.map[_index]] = _property;
          else
            _temp[_index] = _property;
        }
      }
      return _temp;
    }
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
    console.log('ok')
    this.setData({
      focus: false
    })
  },
  // cancelTap: function (event) {
  //   console.log('cancel')
  //   this.setData({
  //     focus: false
  //   })
  // },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })

  },
  search: function () {
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
      url: app.globalData.Server +'searchItemByName?name=' + inputValue + '&key=nOngSiGuapIzHAnG',
      success: function (res) {
        //搜索完成，取消加载
        wx.hideLoading()
        console.log(res.data)
        //如果用户输入不正确就提示，输入正确就显示相应的值
        if (res.data == null) {
          wx.showToast({
            title: '请检查输入名！',
            icon: 'none',
            duration: 2000
          })
        } else {
          that.setData({
            result: res.data
          })
        }
      },

    })


  },
  showDetail: function (e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/MineralDetail/MineralDetail?id=' + id
    })
  }

})
