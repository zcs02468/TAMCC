<template>
    <div class="video">
        <video :id="videoId"></video>
        <!-- <video :id="videoId" 

            style="width: 100%;height: 100%;"
            class="video-js vjs-default-skin vjs-big-play-centered">
        </video> -->
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
import flvjs from 'flv.js'
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
        // videoReset() {
        //     this.videoPlayer.reset();
        //     this.videoPlayer.src(this.videoSrc);  //重置video的src
        //     this.videoPlayer.load(this.videoSrc);  //使video重新加载
        // },
        selectVideo() {
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById(this.videoId);
                var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    // url: "http://1011.hlsplay.aodianyun.com/demo/game.flv"
                    url: this.videoSrc
                });
                flvPlayer.attachMediaElement(videoElement);
                flvPlayer.load();
                flvPlayer.play();
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
            this.selectVideo();
        }
   }
}
</script>
<style lang="less" scoped>
.video{
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: #000;
}
video {
    width: 100%;
    height: 100%;
}
</style>

