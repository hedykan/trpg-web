<template>
  <a-layout id="components-layout-demo-fixed">
    <div style="position: relative; top: 60px">
      <GithubCorner
        url="https://github.com/hedykan/trpg"
        rightCorner
      ></GithubCorner>
    </div>
    <a-layout-header
      :style="{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: '#001529',
      }"
    >
      <a-row>
        <a-col :span="18" style="text-align: center">
          <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="['1']"
            :style="{ lineHeight: '64px' }"
          >
            <a-menu-item key="1">
              <router-link to="/">Home</router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <router-link to="/edit">Edit</router-link>
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :span="6" style="text-align: center">
          <Login />
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '650px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }"> </a-layout-footer>
  </a-layout>
</template>

<script>
// import List from "./components/List.vue"
import Login from "./components/Login.vue";
import GithubCorner from "vue-github-corners";
// import NodePic from "./components/NodePic.vue";
export default {
  name: "App",
  components: { GithubCorner, Login },
};
</script>

<style>
</style>
