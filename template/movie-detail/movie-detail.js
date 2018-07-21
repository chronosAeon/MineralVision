var app=getApp();
var utils=require("../../../utils/utils.js");
Page({
  data:{},
  onLoad:function(options){
  var url = app.global_data.doubanBase+"/v2/movie/subject/"+options.id;
  utils.http(url,this.processDetailData);
  },
  processDetailData:function(data)
  {
    if(!data)
    {
      return;
    }
    console.log(data)
    var director={
      avatar:"",
      name:"",
      id:""
    }
    if(data.directors[0]!=null)
    {
      if(data.directors[0].avatar!=null)
      {
        director.avatar=data.directors[0].avatars.large;
      }
      director.name=data.directors[0].name;
      director.id=data.directors[0].id;
    }
    var movie = {
      movieImg:data.images?data.images.large:"",
      country:data.countries[0],
      title:data.title,
      originalTitle:data.original_title,
      wishcount:data.wish_count,
      commentCount:data.comments_count,
      year:data.year,
      genres:data.genres.join("、"),
      stars:utils.starsOperation(data.rating.stars),
      score:data.rating.average,
      director:director,
      casts:utils.convertToCastString(data.casts),
      castsInfo:utils.convertToCastsInfos(data.casts),
      summary:data.summary
    }
    this.setData({
      movie:movie
    })
  },
  viewMoviePostImg:function(data){
    var src=data.currentTarget.dataset.src;
    wx.previewImage({
      current: 'src', // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [src],
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})