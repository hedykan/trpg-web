<template>
  <canvas id="pic" width="600" height="600" />
</template>
<script>
import { nextTick } from "vue";
import axios from "axios";
export default {
  setup() {
    var list = [];
    var get_list = function () {
      axios.get("story/list").then(function (response) {
        list = response.data.data;
        return list;
      });
    };
    list = get_list();

    // var drawList = function (list) {
    //   for (var i = 0; i < list.Output.length; i++) {
    //     console.log(list.Id);
    //     drawList(list[list.Output[i].Id]);
    //   }
    // };
    console.log(list);

    var drawCir = function (context, start_x, start_y, end_x, end_y, r, text) {
      context.moveTo(start_x + r, start_y);
      context.lineTo(end_x - r, end_y);
      context.moveTo(end_x + r, end_y);
      context.arc(end_x, end_y, r, 0, Math.PI * 2, false);
      context.fillText(text, end_x - 3, end_y + 4);
    };
    // 通过获取的节点画圆，再通过节点连接画路径线
    var draw = async function () {
      await nextTick();
      var can = document.querySelector("#pic");
      var context = can.getContext("2d");
      var x = 20,
        y = 60,
        r = 10;
      context.fillStyle = "rgb(200,0,0)";
      var dpr = window.devicePixelRatio;
      context.scale(dpr, dpr);
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, true);
      // 更新新的x坐标
      //   x = x + lineLength + 2 * r;
      for (var i = 0; i < 10; i++) {
        x = x + 40;
        drawCir(context, x - 40, y, x, y, r, i);
      }

      context.stroke();
      //   context.fill();
    };
    draw();
    return;
  },
};
</script>