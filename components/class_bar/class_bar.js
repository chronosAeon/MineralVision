// components/class_bar/class_bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classes: {
      type: Object
    },
    indent:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    movies: [{
      movieId: 326,
      movieImg: "/image/mineral/gangyu.jpg",
      movieTitle: "刚玉"
    }, {
      movieId: 305,
      movieImg: "/image/mineral/fangjieshi.jpg",
      movieTitle: "方解石"
    }, {
      movieId: 313,
      movieImg: "/image/mineral/fangnashi.jpg",
      movieTitle: "方钠石"
    }, {
      movieId: 314,
      movieImg: "/image/mineral/youlianshi.jpg",
      movieTitle: "黝帘石"
    }]
  },
  //  , {
  //   movieId: 315,
  //   movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2519631933.jpg",
  //   movieAverage: 6.5,
  //   stars: [1, 1, 1, 0, 0],
  //   movieTitle: "玛丽与魔女之..."
  // }, {
  //   movieId: 302,
  //   movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2520198192.jpg",
  //   movieAverage: 6.4,
  //   stars: [1, 1, 1, 0, 0],
  //   movieTitle: "黄金花"
  // }, {
  //   movieId: 333,
  //   movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2516079193.jpg",
  //   movieAverage: 6.7,
  //   stars: [1, 1, 1, 0, 0],
  //   movieTitle: "狂暴巨兽 R..."
  // }, {
  //   movieId: 335,
  //   movieImg: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2516578307.jpg",
  //   movieAverage: 8.9,
  //   stars: [1, 1, 1, 0, 0],
  //   movieTitle: "头号玩家 R..."
  // }, {
  //   movieId: 330,
  //   movieImg: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2518945837.jpg",
  //   movieAverage: 5.3,
  //   stars: [1, 1, 1, 0, 0],
  //   movieTitle: "21克拉"
  // }, {
  //   movieId: 320,
  //   movieImg: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2518236317.jpg",
  //   movieAverage: 0,
  //   stars: [1, 1, 1, 0, 0],
  //   movieTitle: "午夜十二点"
  // }, {
  //   movieId: 334,
  //   movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2518856022.jpg",
  //   movieAverage: 8.4,
  //   stars: [1, 1, 1, 0, 0],
  //   movieTitle: "犬之岛 Is..."
  // }, {
  //   movieId: 336,
  //   movieImg: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2517033932.jpg",
  //   movieAverage: 4.4,
  //   stars: [1, 1, 1, 0, 0],
  //   movieTitle: "冰雪女王3：..."
  // }, {
  //   movieId: 331,
  //   movieImg: "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2517518428.jpg",
  //   movieAverage: 8,
  //   stars: [1, 1, 1, 0, 0],
  //   movieTitle: "起跑线 Hi..."
  // }
  attached: function() {
    console.log(this.data.classes)
    var next_margin_left = this.data.indent+30
    this.setData({
      self_object: this.data.classes,
      margin_left: this.data.indent,
      next_m_l: next_margin_left
    })
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    show_list: function() {
      
      this.setData({
        isshowfriend: !this.data.isshowfriend
      })
    },
    movieTap: function (event) {
      wx.navigateTo({
        url: '/pages/MineralDetail/MineralDetail?id=' + event.currentTarget.dataset.id
      })
    }
  }
})