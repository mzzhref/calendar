<template>
  <div class="box">
    <div id="title">{{ date +'/'+ today }}</div>
    <div id="week">
      <a class="week" href="javascript:;" @click="prev">prev</a>
      <a class="week" href="javascript:;" v-for="(el,index) in week" :key="index">{{ el }}</a>
      <a class="week" href="javascript:;" @click="next">next</a>
    </div>
    <div id="calendar">
      <a
        class="calendar calendar-else calendar-prev"
        href="javascript:;"
        v-for="(prev,index1) in prevData"
        :key="'index1'+index1"
        v-if="(index1+1)<weekNum"
        @click="dateClick"
      >{{ prevData[prevData.length - (weekNum - index1 - 1)] }}</a>
      <a
        class="calendar"
        href="javascript:;"
        v-for="(el,index2) in thisData"
        :key="'index2'+index2"
        :class="{'calendar-active': el == today?true:false}"
        @click="dateClick"
      >{{ el }}</a>
      <a
        class="calendar calendar-else calendar-next"
        href="javascript:;"
        v-for="(next,index3) in nextData"
        :key="'index3'+index3"
        v-bind:data-key="index3"
        v-if="index3 < (42 - thisData.length - (weekNum - 1))"
        @click="dateClick"
      >{{ next }}</a>
    </div>
    <div id="btn">
      <a class="btn" href="javascript:;" @click="todayClick">today</a>
    </div>
  </div>
</template>

<script>
let vm = null;
export default {
  name: "Calendar",
  data() {
    return {
      week: ["一", "二", "三", "四", "五", "六", "日"],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      today:
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate(),
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
    // 返回到今天
    todayClick() {
      vm.year = new Date().getFullYear();
      vm.month = new Date().getMonth() + 1;
      vm.today =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      this.init();
    },
    // 上个月
    prev() {
      this.month--;
      if (this.month == 0) {
        this.year--;
        this.month = 12;
      }
      this.init();
    },
    // 下个月
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
      this.timeFormat(date);
      date.setDate(1);
      let num = date.getDay();
      if (num == 0) {
        num = 7;
      }
      this.weekNum = num;
    },
    // 每月最后一天
    thisMonthLastDay(year, month) {
      return new Date(year, month, 0).getDate();
    },
    // 每月的天数数组
    monthDayData(day, btn) {
      for (let i = 0; i < day; i++) {
        if (btn == "prev") {
          vm.prevData.push(i + 1);
        } else if (btn == "this") {
          vm.thisData.push(i + 1);
        } else if (btn == "next") {
          vm.nextData.push(i + 1);
        }
      }
    },
    dateClick(e) {
      let arr = e.target.classList;
      console.log(arr);
      for (
        let i = 0;
        i < document.getElementsByClassName("calendar").length;
        i++
      ) {
        document
          .getElementsByClassName("calendar")
          [i].classList.remove("calendar-active");
      }
      arr.add("calendar-active");

      if (this.arrIsNot(arr, "calendar-prev")) {
        this.prev();
        e.target.classList.remove("calendar-active");
      } else if (this.arrIsNot(arr, "calendar-next")) {
        this.next();
        e.target.classList.remove("calendar-active");
      }
      let num = e.target.innerText;
      if (num < 10) {
        num = "0" + num;
      }
      this.today = num;
    },
    // 数组中是否存在某个值
    arrIsNot(arr, el) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == el) {
          return true;
        }
      }
    },
    // 日期格式化
    timeFormat(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      this.date = y + "/" + m;
      return y + "/" + m;
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
  font-size: 20px;
}
#week {
  width: 440px;
  height: 50px;
  margin: 0 auto;
}
.week {
  display: block;
  width: 40px;
  height: 30px;
  float: left;
  background: #e8b685;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
.week:first-child{
  width: 70px;
  margin-right: 10px;
}
.week:last-child{
  width: 70px;
  margin-left: 10px;
}
.week-active {
  background: #000;
  color: #fff;
}
.week:nth-of-type(9n) {
  margin-right: 0;
}
#calendar {
  width: 280px;
  height: 240px;
  margin: 0 auto;
  border-left: 1px solid #e8b685;
  border-bottom: 1px solid #e8b685;
}
.calendar {
  display: block;
  width: 40px;
  height: 40px;
  float: left;
  color: #000;
  line-height: 40px;
  text-align: center;
  border-right: 1px solid #e8b685;
  border-top: 1px solid #e8b685;
  box-sizing: border-box;
}
.calendar-else {
  color: #ccc;
}
.calendar-active {
  background: #f5f5f5;
  color: red;
}
.calendar:nth-of-type(7n) {
  margin-right: 0;
}
#btn{
  width: 280px;
  height: 30px;
  margin: 20px auto 0;
}
.btn{
  display: block;
  width: 80px;
  height: 30px;
  float: right;
  background: #deb887;
  color: #fff;
  line-height: 30px;
  text-align: center;
}
</style>
