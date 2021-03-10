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
import "xgplayer";
import FlvPlayer from "xgplayer-flv";

export default {
  name: "QnvideoPlayer",
  props: {
    videoId: {
      type: String,
      default: "hot"
    },
    videoSrc: {
      type: String,
      default: "rtmp://58.200.131.2:1935/livetv/hunantv"
    },
    videoIp: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      videoPlayer: undefined
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.loadVideo();
    });
  },
  destroyed() {
    this.disposeVideo();
  },
  methods: {
    loadVideo() {
      this.disposeVideo();
      console.warn("播放器初始化");
      let self = this;
      try {
        this.videoPlayer = new FlvPlayer({
          id: this.videoId,
          url: this.videoSrc,
          isLive: true,
          playsinline: true,
          autoplay: true,
          width: "100%",
          height: "100%",
          volume: 0
        });
        this.videoPlayer.on("ended", function(config) {
          setTimeout(() => {
            console.warn("ended", config);
            self.loadVideo();
          }, 1000);
        });
        this.videoPlayer.on("error", function(config) {
          setTimeout(() => {
            console.warn("error", config);
            self.loadVideo();
          }, 1000);
        });
      } catch (error) {
        this.loadVideo();
      }
    },
    disposeVideo() {
      if (this.videoPlayer) {
        this.videoPlayer.destroy();
      }
    }
  },
  watch: {
    videoIp(value) {
      console.warn("ip变化", value);
      this.loadVideo();
    }
  }
};
</script>
<style lang="less" scoped>
.video {
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
