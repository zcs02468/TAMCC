<template>
    <div class="video">
        <video :id="videoId" 

            style="width: 100%;height: 100%;"
            class="video-js vjs-default-skin vjs-big-play-centered">
        </video>
        <!-- <video
            :id="videoId"
            class="video-js vjs-default-skin vjs-big-play-centered"
            preload="auto"
            autoplay
            muted
            style="width: 100%;height: 100%;"
            data-setup='{"html5" : { "nativeTextTracks" : false }}'>
            <source :src="videoSrc" type="application/x-mpegURL">
        </video> -->
    </div>
</template>
<script>
  window.videojs = require('video.js')
  videojs = videojs.default || videojs
export default {
    name:'QnvideoPlayer',
    props:{
        videoId:{
            type:String,
            default:'hot',
        },
        videoSrc:{
            type:String,
            default:'rtmp://58.200.131.2:1935/livetv/hunantv'
        },
        videoShow:{
            type:Boolean,
            default:true,
        },
        videoIp:{
            type: String,
            default: ''
        }
   },
    data(){
        return {
            videoPlayer: undefined,
            videoOptions:{
                overNative: true,
                autoplay: true,
                controls: true,
                techOrder: ['html5'],
                sourceOrder: true,
                language: 'en',
                muted: true,
                html5: { hls: { withCredentials: false } },
                sources: [
                    {
                        withCredentials: false,
                        type: 'application/x-mpegURL',
                        src: 'https://open.ys7.com/v3/openlive/E92779075_1_1.m3u8?expire=1611738271&id=272411116930838528&t=ad3e1657bea23fc2056a0fd08780667eb0428550185d06a9661db4dbafc15737&ev=100'
                    }
                ]
            }
        }
    },
    mounted(){ 
       this.$nextTick(()=>{ 
           if(this.videoShow){
                this.selectVideo(); 
           }
       })
    },
    destroyed(){
        this.disposeVideo();
    },
    methods: {
        videoReset() {
            this.videoPlayer.reset();
            this.videoPlayer.src(this.videoSrc);  //重置video的src
            this.videoPlayer.load(this.videoSrc);  //使video重新加载
        },
        selectVideo() {
            this.videoOptions.sources[0].src = this.videoSrc;
            if( this.videoPlayer ) {
                this.videoOptions.autoplay = true
                this.videoPlayer.src(this.videoSrc);  //重置video的src
                this.videoPlayer.load(this.videoSrc);  //使video重新加载
            }else {
                let self =this;
                var emitPlayerState = function(event, value) {}
                this.videoPlayer = videojs(this.videoId,this.videoOptions, function() {
                    // player readied
                    var _this = this
                    self.$emit('ready', self.player)

                    events
                    var events = ['loadeddata',
                                    'canplay', 
                                    'canplaythrough', 
                                    'play', 
                                    'pause', 
                                    'waiting', 
                                    'playing', 
                                    'ended',
                                    'error']
                    for (var i = 0; i < events.length; i++) {
                        (function(event) {
                        _this.on(event, function() {
                            emitPlayerState(event, true)
                        })
                        })(events[i])
                    }

                    this.on('timeupdate', function() {
                        emitPlayerState('timeupdate', this.currentTime())
                    })
                })
                this.videoOptions.autoplay = true
                // this.videoPlayer.play();
            }
        },
        disposeVideo(){
            if(this.videoPlayer){
                this.videoPlayer.dispose()
            } 
       } 
     },
    watch:{
        videoShow(n){ 
           if(n){
               this.selectVideo();
            }else{
                this.disposeVideo();
            } 
        },
        videoIp() {
            this.videoReset();
        }
   }
}
</script>
<style lang="less" scoped>
.video{
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>

