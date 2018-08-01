// pages/Classes/Classes.js
var simulate_data = require('../../simulate_data/simulate_data.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: app.globalData.Server + 'getClassesTree?' + app.globalData.const_key,
      success:res=>{
        var class_tree_data
        if (app.globalData.is_simulate) {
          //检测全局变量是否开启模拟数据模式
          class_tree_data = simulate_data.classes_tree
        }
        else{
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

  struct_classes_tree: function(array) {

  },
  treeUtil: function(data, key, parentKey, map) {
    this.data = data;
    this.key = key;
    this.parentKey = parentKey;
    this.treeParentKey = parentKey; //parentKey要转换成什么属性名称
    this.treeKey = key; //key要转换成什么属性名称
    this.map = map;
    if (map) {
      if (map[key]) this.treeKey = map[key];
    }
    this.toTree = function() {
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
    this.copy = function(item) {
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
  }
})