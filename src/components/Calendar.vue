<template>
  <div class="box">
    <div id="title">
      <a class="week prev" href="javascript:;" @click="prev">prev</a>
      {{ date +'/'+ today + '(' + this.$utils.calendar(date +'/'+ today, true) + ')' }}
      <a class="week next" href="javascript:;" @click="next">next</a>
    </div>
    <div id="week">
      <a class="week" href="javascript:;" v-for="(el,index) in week" :key="index">{{ el }}</a>
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
      <input type="number" min="1" class="txt" placeholder="year" v-model="year" @input="init">
      <input type="number" min="1" class="txt" placeholder="month" v-model="month" @input="init">
      <input type="number" min="1" class="txt" placeholder="day" v-model="today" @input="init">
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
      month:
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1,
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
  mounted() {
    console.log(this.$utils.calendar('2019/03/26'))
    console.log(this.$utils.calendar('2019/03/27', true))
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100%;
  overflow: hidden;
}
#title {
  width: 500px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin: 100px auto 20px;
  font-size: 20px;
  border-right: 1px solid #e8b685;
}
#week {
  width: 500px;
  height: 50px;
  margin: 0 auto;
  border-right: 1px solid #e8b685;
}
.week {
  display: block;
  width: calc(500px / 7);
  height: 50px;
  float: left;
  background: #e8b685;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
.week-active {
  background: #000;
  color: #fff;
}
.week:nth-of-type(9n) {
  margin-right: 0;
}
.prev {
  width: 60px;
  float: left;
}
.next {
  width: 60px;
  float: right;
}
#calendar {
  width: 500px;
  height: 360px;
  margin: 0 auto;
  border-left: 1px solid #e8b685;
  border-bottom: 1px solid #e8b685;
}
.calendar {
  display: block;
  width: calc(500px / 7);
  height: 60px;
  float: left;
  color: #000;
  line-height: 60px;
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
#txt,
#btn {
  width: 500px;
  height: 30px;
  margin: 20px auto 0;
}
.txt {
  width: 70px;
  height: 30px;
  outline: none;
  box-sizing: border-box;
  text-indent: 10px;
  float: left;
}
.txt:nth-of-type(2){
  margin: 0 10px;
}
.btn {
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
