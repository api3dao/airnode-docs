<!--
Common video display component. 
-->
<template>
  <span>
    <iframe
      :width="width"
      :height="height"
      :src="src"
      title="YouTube video player"
      frameborder="0"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
      "
      allowfullscreen
    ></iframe>
  </span>
</template>

<script>
export default {
  name: 'Video',
  props: {
    src: String,
  },
  data: () => ({
    width: 560,
    height: 315,
  }),
  methods: {
    setPlayerSize() {
      if (window.innerWidth < 930) {
        this.width = null;
        this.height = null;
      } else {
        this.width = 560;
        this.height = 315;
      }
    },
  },
  mounted() {
    this.setPlayerSize();
    window.addEventListener('resize', () => {
      this.setPlayerSize();
    });
  },
};
</script>
