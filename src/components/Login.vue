<template>
  <div v-if="!common.mobile_status">
    <a-row v-if="!showStatus">
      <a-col :span="16">
        <a-input
          placeholder="给一个你的身份标识！"
          v-model:value="form.token"
        />
      </a-col>
      <a-col :span="8">
        <a-button type="primary" @click="login_submit()" block>给你！</a-button>
      </a-col>
    </a-row>
    <a-row v-if="showStatus">
      <a-col :span="16">
        <p style="color: #a6adb4">你好：{{ form.token }}</p>
      </a-col>
      <a-col :span="8">
        <a-button type="primary" @click="logout_submit()" block>走了</a-button>
      </a-col>
    </a-row>
  </div>
  <div v-if="common.mobile_status" :style="{ textAlign: 'right' }">
    <div v-if="!showStatus" :style="{ textAlign: 'right', color: '#a6adb4' }">
      <a-input :style="{ width: '70px' }" v-model:value="form.token" />
      <a-button type="link" @click="login_submit()">给你</a-button>
    </div>
    <div v-if="showStatus" :style="{ textAlign: 'right', color: '#a6adb4' }">
      <a-button type="link" @click="logout_submit()">走了</a-button>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { common } from "../common";
import axios from "axios";
export default {
  setup() {
    var form = reactive({
      token: common.token,
    });
    var showStatus = ref(false);
    var show_status_set = function () {
      if (common.token === null) {
        showStatus.value = false;
      } else {
        showStatus.value = true;
      }
    };
    show_status_set();
    var login_status_set = function () {
      axios.get("/auth/status").then(function (response) {
        var data = JSON.stringify(response.data.data);
        localStorage.setItem("trpg-auth-status", data);
        common.login_status = response.data.data;
      });
    };
    var login_status_delete = function () {
      localStorage.setItem("trpg-auth-status", null);
      common.login_status = null;
    };
    var login_submit = function () {
      localStorage.setItem("trpg-token", form.token);
      axios.defaults.headers.common["Authorization"] = form.token;
      common.token = form.token;
      axios.get("/auth/check").then(function () {
        login_status_set();
        show_status_set();
      });
    };
    var logout_submit = function () {
      form.token = null;
      localStorage.setItem("trpg-token", form.token);
      axios.defaults.headers.common["Authorization"] = form.token;
      common.token = form.token;
      show_status_set();
      login_status_delete();
    };
    return {
      form,
      showStatus,
      login_submit,
      logout_submit,
      common,
    };
  },
};
</script>