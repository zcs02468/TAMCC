<template>
    <div class="video">
        <div class="vdieoBox" :id="videoId"></div>
        <!-- <video :id="videoId"></video> -->
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
import 'xgplayer';
import FlvPlayer from 'xgplayer-flv';

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
            videoPlayer: undefined
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
        selectVideo() {
            if( this.videoPlayer ) {
                this.videoPlayer.destroy()
            }
            this.videoPlayer = new FlvPlayer({
                id: this.videoId,
                url: 'http://1011.hlsplay.aodianyun.com/demo/game.flv',
                isLive: true,
                playsinline: true,
                autoplay: true,
                width: "100%",
                height: "100%",
		        volume: 0
            });
        },
        disposeVideo(){
            if(this.videoPlayer){
                this.videoPlayer.destroy()
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
.vdieoBox {
    width: 100%;
    height: 100%;
}
</style>

