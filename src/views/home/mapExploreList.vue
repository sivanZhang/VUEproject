<template>
  <div id="search" class="warp-pb">
    <div class="input-group container">
      <i class="fa fa-chevron-left" @touchend="back" aria-hidden="true"></i>
      <i class="fa fa-search" @touchend="search(searchText)" aria-hidden="true"></i>
      <input
        class="form-control"
        v-model="searchText"
        @keyup.enter="search(searchText)"
        type="text"
      >
      <span class="input-group-addon">
        <i @touchend="showFilters" class="fa fa-sliders" aria-hidden="true"></i>
      </span>
    </div>
    <div
      class="container keywords"
      v-show="isShow"
    >{{axiosData.length||0}} properties found:"{{keyword||' '}}"</div>
    <template v-if="axiosData.length">
      <router-link
        tag="div"
        v-for="(item,index) in axiosData"
        class="suggest"
        :key="index"
        :to="{name:'property',params:{pid:item[0].propertyId}}"
      >
        <div class="suggest-title">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          {{clockTime}}
        </div>
        <div class="suggest-details">
          <img :src="item[0].images[0]" alt>
        </div>
        <div class="suggest-info">
          <div>{{item[0].title}}</div>
          <div>
            <i class="fa fa-picture-o" aria-hidden="true"></i>
            {{item[0].images.length}}
          </div>
        </div>
        <div class="container">
          <h5>Modern Apartment</h5>
          <div class="price">From ${{item[0].attributes.real_estate_property_price}}</div>
          <div class="outfit">
            {{item[0].attributes.real_estate_property_bedrooms}}
            <i
              class="fa fa-bed"
              aria-hidden="true"
            ></i>
            {{item[0].attributes.real_estate_property_bathrooms}}
            <i
              class="fa fa-bath"
              aria-hidden="true"
            ></i>
            {{item[0].attributes.real_estate_property_garage}}
            <i
              class="fa fa-car"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </router-link>
    </template>
    <div class="container">
      <footer-menu/>
    </div>

    <!-- <filters v-show="filtersShow"></filters> -->
  </div>
</template>
<script>
import { getSearch } from "@/api/home";
export default {
  data() {
    return {
      isShow: false,
      /* filtersShow: false, */
      searchText: "",
      axiosData: "",
      keyword: ""
    };
  },
  methods: {
    showFilters() {
      this.$router.push("/filters");
    },
    search(keyword) {
      if (!keyword) {
        return;
      }
      this.isShow = true;
      let params = {
        title: keyword
      };

      getSearch(params)
        .then(res => {
          this.axiosData = res.data.properties.concat();
          this.keyword = keyword;
          this.axiosData.forEach(item=>{
            item[0].inspections_calendar?this.clockTime=`${item[0].inspections_calendar[0].inspection.split(' ')[1]} ${item[0].inspections_calendar[0].inspection.split(' ')[2]} ${item[0].inspections_calendar[0].inspection.split(' ')[3]}`:
            this.clockTime=`Today 1:00 PM - 5:00 PM`
          })
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.axiosData = this.$store.state.viewList;
    this.axiosData.forEach(item=>{
            item[0].inspections_calendar?this.clockTime=`${item[0].inspections_calendar[0].inspection.split(' ')[1]} ${item[0].inspections_calendar[0].inspection.split(' ')[2]} ${item[0].inspections_calendar[0].inspection.split(' ')[3]}`:
            this.clockTime=`Today 1:00 PM - 5:00 PM`
          })
    this.keyword = this.$store.state.keyword;
    if(this.axiosData){
      this.isShow = true;
    }
  },
  mounted() {
  }
};
</script>
<style lang="less" scoped>
.suggest {
  & {
    margin: 20px 15px;
  }

  .outfit {
    color: rgb(91, 91, 91);

    .fa {
      margin: 0 2px 0 6px;
    }
  }

  .price {
    color: rgb(177, 69, 55);
  }

  .suggest-info {
    display: flex;
    justify-content: space-between;
    background: #000;
    color: #fff;
    padding: 4px 15px;
  }

  .suggest-details {
    height: 190px;
    overflow: hidden;

    img {
      height: auto;
      width: 100%;
    }
  }

  .suggest-title {
    color: #fff;
    background: rgb(255, 87, 34);
    padding: 2px 15px;
  }
}

.input-group {
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 10px;
  width: 100%;

  .input-group-addon {
    margin-left: 15px;
    background-color: unset;
    border: unset;
  }

  input.form-control {
    display: table-cell;
    width: 100%;
    border-radius: unset;
    border: 0px;
    padding: 10px 30px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  }

  .fa-chevron-left {
    position: absolute;
    top: 13px;
    left: 25px;
    z-index: 4;
  }

  .fa-search {
    position: absolute;
    top: 13px;
    right: 50px;
    z-index: 4;
  }
}

.ivu-slider-button {
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  cursor: move;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

#search {
  padding-top: 60px;

  .keywords {
    color: #aaa;
  }
}
</style>