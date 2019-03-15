<template>
  <div class="box">
    <div id="week">
      <a class="week" href="javascript:;" @click="prev">prev</a>
      <a class="week" href="javascript:;" v-for="(el,index) in week" :key="index">{{ el }}</a>
      <a class="week" href="javascript:;" @click="next">next</a>
    </div>
    <div id="calendar">
      <a
        class="calendar"
        href="javascript:;"
        v-for="(el,index) in data"
        :key="index"
        :class="{'calendar-active': el == 15?true:false}"
      >{{ el }}</a>
    </div>
  </div>
</template>

<script>
var vm = null;
export default {
  name: "HelloWorld",
  data() {
    return {
      week: ["日", "一", "二", "三", "四", "五", "六"],
      data: [
        "25",
        "26",
        "27",
        "28",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ]
    };
  },
  created() {
    vm = this;
    this.monthFirWeek(new Date());
  },
  methods: {
    init() {},
    prev() {
      console.log("prev");
    },
    next() {
      console.log("next");
    },
    monthFirWeek(date) {
      console.log(date);
      var month = date.getMonth() + 1;
      console.log(month);

      date.setDate(1);
      var today = date.getDay();
      console.log(today);
    },
    timeFormat(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      return y + "-" + m + "-" + d;
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100%;
  overflow: hidden;
}
#week {
  width: 440px;
  height: 60px;
  margin: 100px auto 0;
}
.week {
  display: block;
  width: 40px;
  height: 40px;
  float: left;
  background: #ccc;
  margin-right: 10px;
  margin-bottom: 10px;
  color: #000;
  line-height: 40px;
  text-align: center;
}
.week-active {
  background: #000;
  color: #fff;
}
.week:nth-of-type(9n) {
  margin-right: 0;
}
#calendar {
  width: 340px;
  height: 290px;
  margin: 0 auto;
}
.calendar {
  display: block;
  width: 40px;
  height: 40px;
  float: left;
  background: #ccc;
  margin-right: 10px;
  margin-bottom: 10px;
  color: #000;
  line-height: 40px;
  text-align: center;
}
.calendar-active {
  background: #000;
  color: #fff;
}
.calendar:nth-of-type(7n) {
  margin-right: 0;
}
</style>
