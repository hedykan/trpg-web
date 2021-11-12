<template>
  <div v-if="!mobile_status" :style="{width: '90%'}">
    <a-card size="small" title="在线热聊！">
      <a-row>
        <a-col :span="24">
          <div style="height: 300px; overflow: auto" id="foot">
            <a-list size="small" bordered>
              <a-list-item v-for="(item, index) in data" :key="index">
                {{ item.data }}
              </a-list-item>
            </a-list>
          </div>
        </a-col>
        <a-col :span="16">
          <a-input placeholder="开跑！" v-model:value="msg"></a-input>
        </a-col>
        <a-col :span="8">
          <a-button type="primary" @click="send(msg)">send</a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
  <div v-if="mobile_status">
    <a-affix :offset-top="top">
      <a-button type="primary" @click="show_drawer">在线热聊</a-button>
    </a-affix>
    <a-drawer
      title="在线热聊"
      placement="right"
      :closable="false"
      v-model:visible="visible"
    >
      <a-row>
        <a-col :span="24">
          <div style="height: 500px; overflow: auto" id="foot">
            <a-list size="small" bordered>
              <a-list-item v-for="(item, index) in data" :key="index">
                {{ item.data }}
              </a-list-item>
            </a-list>
          </div>
        </a-col>
        <a-col :span="16">
          <a-input placeholder="开跑！" v-model:value="msg"></a-input>
        </a-col>
        <a-col :span="8">
          <a-button type="primary" @click="send(msg)">send</a-button>
        </a-col>
      </a-row>
    </a-drawer>
  </div>
</template>
<script>
import { reactive, toRefs, nextTick, ref } from "vue";
export default {
  props: {
    mobile_status: Boolean,
  },
  setup(props) {
    var ws = new WebSocket("wss://trpg.juhuan.store:2000");
    var msgList = reactive({
      msg: null,
      data: [],
    });
    var visible = ref(false);
    var top = ref(100);
    var show_drawer = function () {
      visible.value = true;
    };
    var foot = async function () {
      await nextTick();
      var div = document.getElementById("foot");
      div.scrollTop = div.scrollHeight;
    };
    ws.onopen = function () {
      console.log("open");
    };
    ws.onerror = function () {
      console.log("error");
    };
    ws.onmessage = function (res) {
      var data = JSON.parse(res.data);
      switch (data.status) {
        case "init":
          msgList.data = data.data.list;
          break;
        case "say":
          msgList.data.push(data.data);
          break;
      }
      foot();
    };
    var send = function (msg) {
      if (msg !== null) {
        ws.send(msg);
        msgList.msg = null;
      } else {
        alert("请输入内容！");
      }
      // foot();
    };
    return {
      send,
      ...toRefs(msgList),
      ...toRefs(props),
      visible,
      top,
      show_drawer,
    };
  },
};
</script>