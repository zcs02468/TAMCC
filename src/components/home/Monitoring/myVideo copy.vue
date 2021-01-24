<template>
    <div class="video">
        <video
            :id="videoId"
            class="video-js vjs-default-skin vjs-big-play-centered"
            preload="auto"
            autoplay
            muted
            style="width: 100%;height: 100%;"
            data-setup='{"html5" : { "nativeTextTracks" : false }}'>
            <source :src="videoSrc" type="application/x-mpegURL">
        </video>
    </div>
</template>
<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
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
            if( this.videoPlayer ) {
                this.videoPlayer.src(this.videoSrc);  //重置video的src
                this.videoPlayer.load(this.videoSrc);  //使video重新加载
            }else {
                this.videoPlayer = videojs(this.videoId);// 关联video标签的id
                this.videoPlayer.src({
                    src: this.videoSrc,
                    loop : true
                });
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

