<template>
    <div class="video">
        <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate">
        </video-player>
    </div>
</template>
<script>

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
            playerOptions: {
                overNative: true,
                autoplay: true,
                controls: true,
                techOrder: ['html5'],
                sourceOrder: true,
                html5: { hls: { withCredentials: false } },
                sources: [
                    {
                        withCredentials: false,
                        type: 'application/x-mpegURL',
                        src: this.props.videoSrc
                    }
                ]
            }
        }
    },
    computed:{
        player() {
            return this.$refs.videoPlayer.player
        },
    },
    methods: {
        onPlayerReadied() {
            if (!this.initialized) {
                this.initialized = true
                this.currentTech = this.player.techName_
            }
        },
        videoReset() {
            this.playerOptions.sources[0].src = this.videoSrc
            this.playerOptions.autoplay = true
        },
        disposeVideo(){
            if(this.videoPlayer){
                this.videoPlayer.dispose()
            } 
       } 
     },
    watch:{
        videoIp() {
            this.videoReset();
        }
   }
}
</script>
<style lang="less" scoped>
.vjs-custom-skin{
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>

