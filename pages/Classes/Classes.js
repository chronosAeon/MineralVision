// pages/Classes/Classes.js
var simulate_data = require('../../simulate_data/simulate_data.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [{
      movieId: 326,
      movieImg: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2519994468.jpg",
      movieAverage: 7,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "后来的我们"
    }, {
      movieId: 305,
      movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2518645794.jpg",
      movieAverage: 6.9,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "幕后玩家"
    }, {
      movieId: 313,
      movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2519726014.jpg",
      movieAverage: 0,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "战神纪"
    }, {
      movieId: 314,
      movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2520457270.jpg",
      movieAverage: 0,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "低压槽：欲望..."
    }, {
      movieId: 315,
      movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2519631933.jpg",
      movieAverage: 6.5,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "玛丽与魔女之..."
    }, {
      movieId: 302,
      movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2520198192.jpg",
      movieAverage: 6.4,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "黄金花"
    }, {
      movieId: 333,
      movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2516079193.jpg",
      movieAverage: 6.7,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "狂暴巨兽 R..."
    }, {
      movieId: 335,
      movieImg: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2516578307.jpg",
      movieAverage: 8.9,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "头号玩家 R..."
    }, {
      movieId: 330,
      movieImg: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2518945837.jpg",
      movieAverage: 5.3,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "21克拉"
    }, {
      movieId: 320,
      movieImg: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2518236317.jpg",
      movieAverage: 0,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "午夜十二点"
    }, {
      movieId: 334,
      movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2518856022.jpg",
      movieAverage: 8.4,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "犬之岛 Is..."
    }, {
      movieId: 336,
      movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2517033932.jpg",
      movieAverage: 4.4,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "冰雪女王3：..."
    }, {
      movieId: 331,
      movieImg: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2517518428.jpg",
      movieAverage: 8,
      stars: [1, 1, 1, 0, 0],
      movieTitle: "起跑线 Hi..."
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var class_tree_data
    if (app.globalData.is_simulate) {
      //检测全局变量是否开启模拟数据模式
      class_tree_data = simulate_data.classes_tree
    }
    console.log(class_tree_data)
    var tree = new this.treeUtil(class_tree_data, 'id', 'pid');
    this.setData({
      tree_data: tree.toTree()
    })
    // console.log(this.data.tree_data);
    //模拟访问服务器获取分组数据
    //假设获取如下数据
    // var group_list = [{
    //     "id": "1",
    //     "pid": "0",
    //     "name": "铁矿类",
    //     "class": "title"
    //   },
    //   {
    //     "id": "24",
    //     "pid": "0",
    //     "name": "铬矿类",
    //     "class": "title",
    //   },
    //   {
    //     "id": "28",
    //     "pid": "1",
    //     "name": "磁铁矿",
    //     "class": "title",
    //   },
    //   {
    //     "id": "29",
    //     "pid": "1",
    //     "name": "黄铁矿",
    //     "class": "title",
    //   }
    // ]

    // this.setData({
    //   group_list: group_list
    // })
    // console.log(group_list[0].id)
    // var group_list = JSON.parse(group_list)
    // console.log(group_list)
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