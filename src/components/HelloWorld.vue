<template>
  <div class="box">
    <div id="title">{{ date }}</div>
    <div id="week">
      <a class="week" href="javascript:;" @click="prev">prev</a>
      <a class="week" href="javascript:;" v-for="(el,index) in week" :key="index">{{ el }}</a>
      <a class="week" href="javascript:;" @click="next">next</a>
    </div>
    <div id="calendar">
      <a
        class="calendar calendar-else"
        href="javascript:;"
        v-for="(prev,index1) in prevData"
        :key="'index1'+index1"
        v-if="(index1+1)<weekNum"
      >{{ prevData[prevData.length - (weekNum - index1 - 1)] }}</a>
      <a
        class="calendar"
        href="javascript:;"
        v-for="(el,index2) in thisData"
        :key="'index2'+index2"
        :class="{'calendar-active': el == today?true:false}"
      >{{ el }}</a>
      <a
        class="calendar calendar-else"
        href="javascript:;"
        v-for="(next,index3) in nextData"
        :key="'index3'+index3"
        v-bind:data-key="index3"
        v-if="index3 < (42 - thisData.length - (weekNum - 1))"
      >{{ next }}</a>
    </div>
  </div>
</template>

<script>
var vm = null;
export default {
  name: "HelloWorld",
  data() {
    return {
      week: ["一", "二", "三", "四", "五", "六", "日"],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      today: new Date().getDate(),
      prevData: [],
      thisData: [],
      nextData: [],
      weekNum: null,
      date: null
    };
  },
  created() {
    vm = this;
    this.init();
  },
  methods: {
    init() {
      vm.prevData = [];
      vm.thisData = [];
      vm.nextData = [];
      this.monthFirWeek(new Date(vm.year, vm.month - 1, 1));
      this.monthDayData(
        this.thisMonthLastDay(this.year, this.month - 1),
        "prev"
      );
      this.monthDayData(this.thisMonthLastDay(this.year, this.month), "this");
      this.monthDayData(
        this.thisMonthLastDay(this.year, this.month + 1),
        "next"
      );
    },
    prev() {
      this.month--;
      if (this.month == 0) {
        this.year--;
        this.month = 12;
      }
      this.init();
    },
    next() {
      this.month++;
      if (this.month == 13) {
        this.year++;
        this.month = 1;
      }
      this.init();
    },
    // 每月第一天是周几
    monthFirWeek(date) {
      console.log(this.timeFormat(date));
      date.setDate(1);
      var num = date.getDay();
      if (num == 0) {
        num == 7;
      }
      this.weekNum = num;
    },
    // 每月最后一天
    thisMonthLastDay(year, month) {
      return new Date(year, month, 0).getDate();
    },
    // 每月的天数数组
    monthDayData(day, btn) {
      for (var i = 0; i < day; i++) {
        if (btn == "prev") {
          vm.prevData.push(i + 1);
        } else if (btn == "this") {
          vm.thisData.push(i + 1);
        } else if (btn == "next") {
          vm.nextData.push(i + 1);
        }
      }
    },
    // 日期格式化
    timeFormat(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      this.date = y + "/" + m + "/" + d;
      return y + "/" + m + "/" + d;
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
#title {
  width: 440px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 100px auto 20px;
}
#week {
  width: 440px;
  height: 60px;
  margin: 0 auto;
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
.calendar-else {
  color: #eee;
}
.calendar:nth-of-type(7n) {
  margin-right: 0;
}
</style>
