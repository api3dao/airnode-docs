<!--.vitepress/theme/Api3Layout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme';
import SidebarHeader from './components/SidebarHeader.vue';
import LegacyDocs from './components/LegacyDocs.vue';
import Market from './components/Market.vue';
import DeprecationBanner from './components/DeprecationBanner.vue';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #layout-top>
      <DeprecationBanner />
    </template>
    <template #sidebar-nav-before>
      <SidebarHeader />
    </template>
    <template #aside-outline-after> <Market /> <LegacyDocs /> </template>
  </Layout>
</template>
