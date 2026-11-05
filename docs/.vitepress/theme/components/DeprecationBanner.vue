<!--
Site-wide banner shown above the navigation bar on every page.
Its height is mirrored in --vp-layout-top-height so the fixed
navigation bar and sidebar start below it.
-->

<template>
  <div class="deprecation-banner">
    <span>
      Airnode and these docs are deprecated. Airnode's successors are
      <a href="https://airnodehub.api3.org" target="_blank">AirnodeHub</a>
      and
      <a href="https://github.com/api3dao/signed-api" target="_blank"
        >signed-api</a
      >.
    </span>
  </div>
</template>

<script>
export default {
  name: 'DeprecationBanner',
};
</script>

<style>
:root {
  --vp-layout-top-height: 40px;
}

@media (max-width: 640px) {
  :root {
    --vp-layout-top-height: 60px;
  }
}
</style>

<style scoped>
.deprecation-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--vp-layout-top-height);
  padding: 0 16px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  color: white;
  background-color: #7963b2;
}

.deprecation-banner a {
  color: white;
  font-weight: bold;
  text-decoration: underline;
}
</style>
