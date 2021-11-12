<template>
  <div :style="{ textAlign: 'left' }">
    <a-row>
      <a-col :span="span.img">
        <img :src="img_url" :style="{ width: '100%' }" />
      </a-col>
      <a-col :span="span.detail">
        <div :style="{ minHeight: '100px' }"></div>
        <a-typography>
          <a-typography-title>一个还没想到名字的跑团框架</a-typography-title>
          <a-typography-paragraph>
            这是一个，用go实现的restful风格实现的跑团api +
            用极烂前端水平的vue前端实现的一个跑团框架。<br />
            如果感兴趣的话可以在右上角点击我的同性交友平台链接。<br />
          </a-typography-paragraph>
          <a-typography-title :level="2">怎么玩</a-typography-title>
          <a-typography-paragraph>
            点上面的开跑就可以浏览现在正在跑的团了。<br />
            kp负责编辑整个团。<br />
            而作为pc的你，可以浏览整个团，然后投出你决定性的一票！！！<br />
          </a-typography-paragraph>
          <a-typography-title :level="2">目前以实现功能</a-typography-title>
          <a-typography-paragraph>
            <blockquote>
              1. 守密人编辑 <br />
              2. 守密人故事节点操控 <br />
              3. 玩家投票 <br />
              4. 玩家发言 <br />
              5. 完整故事节点控制记录 <br />
            </blockquote>
          </a-typography-paragraph>
          <a-typography-title :level="2">待实现功能</a-typography-title>
          <a-typography-paragraph>
            <blockquote>
              1. 投骰子功能 <br />
              2. 角色卡计算 <br />
              3. 属性数值计算 <br />
              4. 多房间功能 <br />
            </blockquote>
          </a-typography-paragraph>
        </a-typography>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { common } from "../common"
export default {
  setup() {
    var img_url = require("../assets/board.png");
    var span = {
        img: 12,
        detail: 12,
    };
    if(common.mobile_status) {
        span.img = 24;
        span.detail = 24;
    }
    return {
      img_url,
      span,
    };
  },
};
</script>