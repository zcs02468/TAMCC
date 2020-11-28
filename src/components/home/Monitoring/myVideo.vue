<template>
    <div class="video">
        <video :id="videoId"
               class="video-js vjs-default-skin vjs-big-play-centered"
                 preload="auto"
                 autoplay
                 style="width: 100%;height: 100%;"
                 data-setup='{"html5" : { "nativeTextTracks" : false }}'>
            <source :src="videoSrc" type="rtmp/flv">
        </video>
    </div>
</template>
<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import SWF_URL from 'videojs-swf/dist/video-js.swf'
videojs.options.flash.swf = SWF_URL
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
        } 
   },
    data(){
        return {
           videoPlayer: undefined,
        }
    },
    created(){
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
            this.videoPlayer = videojs(this.videoId);// 关联video标签的id
            this.videoPlayer.src({
               src: this.videoSrc,
               type: 'rtmp/flv'
            });
            this.videoPlayer.play();
            this.videoPlayer.pause();
        },
        disposeVideo(){
            if(this.videoPlayer){
                this.videoPlayer.dispose()
            } 
       } 
     },
    components:{            }, 
    watch:{
        videoShow(n){ 
           if(n){
               this.selectVideo();
            }else{
                this.disposeVideo();
            } 
       },
       videoSrc(){
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
}
</style>

