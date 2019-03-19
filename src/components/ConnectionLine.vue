<template>
  <div id="box">
    <textarea id="data" placeholder="请输入坐标：(1,2);(2,4)" v-model="data"></textarea>
    <div id="data-btn">
      <a href="javascript:;" class="data-btn" @click="suspend">暂停</a>
      <a href="javascript:;" class="data-btn" @click="go">继续</a>
      <a href="javascript:;" class="data-btn" @click="init">开始</a>
    </div>
    <canvas id="canvas" width="1000px" height="500px"></canvas>
  </div>
</template>
<script>
let vm = null;
let canvas = null;
let context = null;
let iTimer = null;
export default {
  name: "ConnectionLine",
  data() {
    return {
      msg: "nihao",
      data:
        "(300,100);(600,100);(610,110);(600,120);(300,400);(300,410);(600,410);(610,400);(610,390);(600,380);(360,380);(640,110);(640,100);(630,90);(610,70);(280,70);(270,80);(270,90);(280,100);(300,100)",
      arr: []
    };
  },
  created() {
    vm = this;
  },
  methods: {
    init(start, end) {
      let arr = this.data.split(";");
      let newArr = [];
      vm.arr = [];
      for (let i = 0; i < arr.length; i++) {
        newArr = arr[i]
          .replace(/\(/, "")
          .replace(/\)/, "")
          .split(",");
        console.log(newArr);
        vm.arr[i] = {
          x: newArr[0],
          y: newArr[1]
        };
      }
      canvas = document.getElementById("canvas");
      console.log(canvas);
      context = canvas.getContext("2d");
      console.log(vm.arr);
      context.clearRect(0, 0, 1000, 500);
      iTimer = setInterval(function() {
        if (vm.arr.length == 1) {
          clearInterval(iTimer);
        } else {
          vm.move(vm.arr[0], vm.arr[1]);
          vm.arr.shift();
        }
      }, 100);
    },
    go() {
      clearInterval(iTimer);
      iTimer = setInterval(function() {
        if (vm.arr.length == 1) {
          clearInterval(iTimer);
        } else {
          vm.move(vm.arr[0], vm.arr[1]);
          vm.arr.shift();
        }
      }, 100);
    },
    suspend() {
      clearInterval(iTimer);
    },
    move(start, end) {
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.stroke();
      context.closePath();
    }
  }
};
</script>
<style scoped>
#box {
  width: 1000px;
  margin: 30px auto 0;
}
#data {
  width: 100%;
  height: 100px;
  padding: 10px;
  line-height: 20px;
  outline: none;
  box-sizing: border-box;
  resize: none;
  font-size: 20px;
}
#data-btn {
  width: 100%;
  overflow: hidden;
}
.data-btn {
  float: right;
  display: block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #e8b685;
  color: #f5f5f5;
  margin-left: 10px;
}
#canvas {
  margin-top: 30px;
}
</style>
