var app = getApp();
var utils = require("../../../utils/utils.js");
Page({
  data: {
    category: "",
    dataUrl: "",
    currentCount: 0,
    isEmpty: true
  },
  onLoad: function(options) {
    this.setData({
      category: options.category
    });
    var dataUrl;
    switch (this.data.category) {
      case "正在热映":
        {
          dataUrl = app.global_data.doubanBase + "/v2/movie/in_theaters";
          utils.http(dataUrl, this.processData);
        }
        break;
      case "即将上映":
        {
          dataUrl = app.global_data.doubanBase + "/v2/movie/coming_soon";
          utils.http(dataUrl, this.processData);
        }
        break;
      case "豆瓣top250":
        {
          dataUrl = app.global_data.doubanBase + "/v2/movie/top250";
          utils.http(dataUrl, this.processData);
        }
        break;
    }
    this.setData({
      dataUrl: dataUrl
    });
  },
  processData: function(data) {
    var movies = [];
    var subjects = data.subjects;
    for (var index in subjects) {
      var movieId = subjects[index].id;
      var movieImg = subjects[index].images.large;
      var movieAverage = subjects[index].rating.average;
      var movieTitle = subjects[index].title;
      var stars = utils.starsOperation(subjects[index].rating.stars);
      if (movieTitle.length > 6) {
        movieTitle = movieTitle.substring(0, 6) + "...";
      }
      var temp = {
        movieId: movieId,
        movieImg: movieImg,
        movieAverage: movieAverage,
        stars: stars,
        movieTitle: movieTitle
      }
      movies.push(temp);
    }
    var totalMovies;
    if (this.data.isEmpty) {
      var isEmpty = !this.data.isEmpty;
      totalMovies = movies;
      this.setData({
        isEmpty: isEmpty
      });
    } else {
      totalMovies = this.data.movies.concat(movies);
    }
    var moviesList = {};
    moviesList = {
      movies: totalMovies
    };
    this.setData(moviesList);
    console.log(this.data.movies)
    var currentCount = this.data.currentCount;
    currentCount += 20;
    this.setData({
      currentCount: currentCount
    });
    wx.hideNavigationBarLoading();
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    this.setData({
      movies: {}
    });
    this.setData({
      isEmpty: true
    });
    var dataUrl = this.data.dataUrl + "?start=0&count=20";
    utils.http(dataUrl, this.processData);
  },
  onReachBottom: function() {
    wx.showNavigationBarLoading();
    var dataUrl = this.data.dataUrl + "?start=" + this.data.currentCount + "&count=20";
    utils.http(dataUrl, this.processData);
  },
  //对movieTap事件的点击事件
  movieTap: function(event) {
    wx.navigateTo({
      url: '/pages/MineralDetail/MineralDetail?id=' + event.currentTarget.dataset.id
    })
  },
  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.category,
      success: function(res) {}
    })
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})