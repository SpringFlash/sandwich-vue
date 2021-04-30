<template>
  <div class="popup_bg" v-if="show">
    <div class="popup" >
      <div class="popup_header">
        <button class="close_popup" @click="hide">&times;</button>
        <h2>{{header}}</h2>
      </div>
      <div class="popup_content">
        <div class="popup_nav">
          <ul class="popup_nav_points">
            <li v-for="(point, key) in settings" :key="key" :class="{active: key==stage}"
            @click="stage=key">{{point.name}}</li>
          </ul>
          <div class="popup_nav_btns">
            <button v-if="!firstStage" @click="prevStage" class="btn popup_prev">НАЗАД</button>
            <button v-if="!lastStage" @click="nextStage" class="btn popup_next">ВПЕРЕД</button>
          </div>
        </div>
        <div class="popup_choose">
          <div class="popup_card" v-for="(card, key) in cards" :key="key" 
          :class="{active: inComp(stage, key)}" @click="toggleComp(stage, key, components[stage].includes(key))">
            <img :src="require('../assets'+card.image)" alt="pop_img" class="product-pic">
            <h3>{{card.name}}</h3>
            <p>Цена: <span >{{ stage === 'size' ? card.price+item.price : card.price}}</span> руб.</p>
          </div>
          <div class="popup_finish" v-if="stage=='finish'">
            <img :src="item.img" alt="" class="product-pic">
            <div class="popup_descr">
              <h3>Проверьте и добавьте в корзину</h3>
              <div class="popup_options">
                <p v-for="(comp, key) in components" :key="key">
                  <u>{{settings[key].name}}</u>: 
                  {{getComp(key)}} 
                </p>
              </div>
              <h3 class="popup_product">{{item.name}}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="popup_footer">
        <h3>Итого: 
          <span class="popup_price">{{stage=='finish'?price*$store.getters.getPopQty:price}}</span>
          руб.
        </h3>
        <div v-if="stage=='finish'">
          <Counter :idPar="item.name" type="'custom'"/>
          <button class="btn" @click="buy">В корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from '@/components/counter.vue';
export default {
  components: { Counter },
  data() {
    let firstStage = 'null';
    if (this.settings) firstStage = Object.keys(this.settings)[0];
    return {
      stage: firstStage,
      components: {},
    }
  },
  computed: {
    settings() { return this.$store.getters.getData.settings },
    item() { return this.$store.getters.getPopItem },
    cards() { return this.list[this.stage] },
    header() { return this.settings[this.stage].title },
    list() {
      let result = {};
      for (let key in this.settings) {
        result[key] = this.$store.getters.getData[this.settings[key].object]
      }
      return result;
    },
    show() { 
      let s = this.$store.getters.getPopShow;
      if (s == true) this.init();
      return s;
    },
    lastStage: function() {
      let keys = Object.keys(this.settings);
      return this.stage == keys[keys.length-1];
    },
    firstStage: function() {
      return this.stage == Object.keys(this.settings)[0];
    },
    price: function() {
      let result = this.item.price;
      for (let key_comp in this.components) {
        if (this.components[key_comp] instanceof Array) {
          for (let el of this.components[key_comp]) {
            result += this.list[key_comp][el].price
          }
        } else result += this.list[key_comp][this.components[key_comp]].price
      }
      return result;
    }
  },
  methods: {
    hide: function() {
      this.$store.commit('hidePop');
    },
    init() {
      this.stage = Object.keys(this.settings)[0];
      this.components = {}; 
      let components = this.item.components;
      for (const key in components) {
        if (components[key] instanceof Array) {
          this.$set(this.components, key, Array.from(components[key]));
        } else if (components[key] instanceof Object) {
          this.$set(this.components, key, Object.assign({}, components[key]));
        } else {
          this.$set(this.components, key, components[key]);
        }
      }
    },
    nextStage: function() {
      this.stage = Object.keys(this.settings)[Object.keys(this.settings).indexOf(this.stage)+1];
    },
    prevStage: function() {
      this.stage = Object.keys(this.settings)[Object.keys(this.settings).indexOf(this.stage)-1];
    },
    toggleComp: function(st, k, choosen) {
      if (this.components[st] instanceof Array) {
        if (!choosen) {
          if (st == 'sauce' && this.components[st].length >= 3) return alert('Максимум 3 соуса!');
          this.components[st].push(k);
        }
        else this.components[st].splice(this.components[st].indexOf(k), 1);
      } else this.components[st] = k;
    },
    inComp: function(st, k) {
      if (this.components[st] instanceof Array) return this.components[st].includes(k);
      else return this.components[st] == k;
    },
    getComp: function(key) {
      if (this.components[key] instanceof Array) {
        if (this.components[key].length == 0) return 'Нет';
        let result = [];
        for (let c of this.components[key]) {
          result.push(this.list[key][c].name);
        }
        return String(result);
      } else return this.list[key][this.components[key]].name;
    },
    buy: function() {
      this.$store.commit('addToCart', {
        ...this.item,
        name: this.item.name + ' (custom) [' + this.price + 'р.]', 
        quantity: this.$store.getters.getPopQty,
        price: this.price
      });
      this.hide();
    }
  }
}
</script>