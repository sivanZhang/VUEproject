<style scoped lang='less'>
  @media screen and (min-width: 460px) {
    .wh_item_date:hover {
      background: rgb(0, 153, 153);
      cursor: pointer;
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .wh_container {
    max-width: 410px;
    margin: auto;
  }

  li {
    list-style-type: none;
  }

  .wh_top_changge {
    display: flex;
  }

  .wh_top_changge li {
    cursor: pointer;
    display: flex;
    color: rgb(0, 153, 153);
    font-size: 16px;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 47px;
  }

  .wh_top_changge .wh_content_li {
    cursor: auto;
    flex: 3;
  }

  .wh_content_all {
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
      "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    width: 100%;
    overflow: hidden;
    padding-bottom: 8px;
  }

  .wh_content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .wh_content:first-child .wh_content_item_tag,
  .wh_content:first-child .wh_content_item {
    color: #ddd;
    font-size: 16px;
  }

  .wh_content_item,
  .wh_content_item_tag {
    font-size: 14px;
    width: 100/7%;
    text-align: center;
    color: #000;
    position: relative;
  }

  .wh_content_item {
    height: 3.6rem;
  }

  .wh_top_tag {
    line-height: 3.6rem;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .wh_item_date {
    position: relative;
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(245, 245, 245);
    border: 1px solid #fff;
  }

  .wh_jiantou1 {
    width: 10px;
    height: 10px;
    border-top: 2px solid rgb(197, 197, 197);
    border-left: 2px solid rgb(197, 197, 197);
    transform: rotate(-45deg);
  }

  .wh_jiantou1:active,
  .wh_jiantou2:active {
    border-color: #ddd;
  }

  .wh_jiantou2 {
    width: 10px;
    height: 10px;
    border-top: 2px solid rgb(197, 197, 197);
    border-right: 2px solid rgb(197, 197, 197);
    transform: rotate(45deg);
  }

  .wh_content_item>.wh_isMark {
    margin: auto;
    z-index: 2;
    position: relative;

    &::after {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: rgb(255, 87, 34);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5px;
    }
  }

  .wh_content_item .wh_other_dayhide {
    color: rgb(197, 197, 197);
  }

  .wh_content_item .wh_want_dayhide {
    color: rgb(197, 197, 197);
  }

  .wh_content_item .wh_isToday {

    background: rgb(155, 207, 216);
    color: #fff;
  }

  .wh_content_item .wh_chose_day {
    background: rgb(0, 153, 153);
    color: #fff;
  }
</style>
<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click.passive="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click.passive="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="tag in textTop">
          <div class="wh_top_tag">
            {{tag}}
          </div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list" @click.passive="clickDay(item,index)">
          <div class="wh_item_date" v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]">
            {{item.id}}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import timeUtil from './calendar';
  export default {
    data() {
      return {
        myDate: [],
        list: [],
        historyChose: [],
        dateTop: ''
      };
    },
    props: {
      markDate: {
        type: Array,
        default: () => []
      },
      markDateMore: {
        type: Array,
        default: () => []
      },
      textTop: {
        type: Array,
        default: () => ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      },
      sundayStart: {
        type: Boolean,
        default: () => false
      },
      agoDayHide: { type: String, default: `0` },
      futureDayHide: { type: String, default: `2554387200` }
    },
    created() {
      this.intStart();
      this.myDate = new Date();
    },
    methods: {
      intStart() {
        timeUtil.sundayStart = this.sundayStart;
      },
      setClass(data) {
        let obj = {};
        obj[data.markClassName] = data.markClassName;
        return obj;
      },
      clickDay: function(item, index) {
        if (item.otherMonth === 'nowMonth' && !item.dayHide) {
          this.getList(this.myDate, item.date);
        }
        if (item.otherMonth !== 'nowMonth') {
          item.otherMonth === 'preMonth' ?
            this.PreMonth(item.date) :
            this.NextMonth(item.date);
        }
      },
      ChoseMonth: function(date, isChosedDay = true) {
        date = timeUtil.dateFormat(date);
        this.myDate = new Date(date);
        this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
        if (isChosedDay) {
          this.getList(this.myDate, date, isChosedDay);
        } else {
          this.getList(this.myDate);
        }
      },
      PreMonth: function(date, isChosedDay = true) {
        date = timeUtil.dateFormat(date);
        this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth');
        this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
        if (isChosedDay) {
          this.getList(this.myDate, date, isChosedDay);
        } else {
          this.getList(this.myDate);
        }
      },
      NextMonth: function(date, isChosedDay = true) {
        date = timeUtil.dateFormat(date);
        this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth');
        this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
        if (isChosedDay) {
          this.getList(this.myDate, date, isChosedDay);
        } else {
          this.getList(this.myDate);
        }
      },
      forMatArgs: function() {
        let markDate = this.markDate;
        let markDateMore = this.markDateMore;
        markDate = markDate.map((k) => {
          return timeUtil.dateFormat(k);
        })
        markDateMore = markDateMore.map((k) => {
          k.date = timeUtil.dateFormat(k.date)
          return k;
        })
        return [markDate, markDateMore];
      },
      getList: function(date, chooseDay, isChosedDay = true) {
        const [markDate, markDateMore] = this.forMatArgs();
        let enMouth = date.toDateString().split(" ");
        this.dateTop = `${enMouth[1]} ${enMouth[3]}`;
        let arr = timeUtil.getMonthList(this.myDate);
        for (let i = 0; i < arr.length; i++) {
          let markClassName = '';
          let k = arr[i];
          k.chooseDay = false;
          const nowTime = k.date;
          const t = new Date(nowTime).getTime() / 1000;
          //看每一天的class
          for (const c of markDateMore) {
            if (c.date === nowTime) {
              markClassName = c.className || '';
            }
          }
          //标记选中某些天 设置class
          k.markClassName = markClassName;
          k.isMark = markDate.indexOf(nowTime) > -1;
          //无法选中某天
          k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
          if (k.isToday) {
            this.$emit('isToday', nowTime);
          }
          let flag = !k.dayHide && k.otherMonth === 'nowMonth';
          if (chooseDay && chooseDay === nowTime && flag) {
            this.$emit('choseDay', nowTime);
            this.historyChose.push(nowTime);
            k.chooseDay = true;
          } else if (
            this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag
          ) {
            k.chooseDay = true;
          }
        }
        this.list = arr;
      }
    },
    mounted() {
      this.getList(this.myDate);
    },
    watch: {
      markDate: {
        handler(val, oldVal) {
          this.getList(this.myDate);
        },
        deep: true
      },
      markDateMore: {
        handler(val, oldVal) {
          this.getList(this.myDate);
        },
        deep: true
      },
      agoDayHide: {
        handler(val, oldVal) {
          this.agoDayHide = parseInt(val);
          this.getList(this.myDate);
        },
        deep: true
      },
      futureDayHide: {
        handler(val, oldVal) {
          this.futureDayHide = parseInt(val);
          this.getList(this.myDate);
        },
        deep: true
      },
      sundayStart: {
        handler(val, oldVal) {
          this.intStart();
          this.getList(this.myDate);
        },
        deep: true
      }
    }
  };
</script>