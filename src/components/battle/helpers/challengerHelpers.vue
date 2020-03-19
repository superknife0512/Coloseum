<template>
  <div class="helpers">
    <challenger-helper
      v-for="(objValue, key, index) in power"
      :key="index"
      :img="key"
      :helperPower="objValue"
      @chooseHelper="chooseHelper(key)"
      />
  </div>
</template>
<script>
import challengerHelper from './helper';
import eventBus from '../../util/bus';

export default {
  created() {
    this.initPower();
  },
  mounted() {
    eventBus.$on('initPower', () => {
      this.initPower();
    });
  },
  data() {
    return {
      power: null,
    };
  },
  components: {
    challengerHelper,
  },
  watch: {
    stateOfHelper(val) {
      if (!val) {
        for (const key in this.power) {
          if (key !== null) {
            this.power[key].isOn = false;
          }
        }
        this.initPower();
      }
    },
  },
  methods: {
    initPower() {
      const storedPower = { ...this.$store.state.challenger.power };
      for (const key in storedPower) {
        if (key !== null) {
          const newObj = {
            point: storedPower[key],
            isOn: false,
          };
          storedPower[key] = newObj;
        }
      }
      this.power = storedPower;
    },
    chooseHelper(helperName) {
      for (const key in this.power) {
        if (key !== null) {
          this.power[key].isOn = false;
        }
      }
      this.power[helperName].isOn = true;
      this.$store.commit('setHelper', { point: this.power[helperName].point, name: helperName });
    },
  },
  computed: {
    stateOfHelper() {
      return this.$store.state.helperPower;
    },
  },
};
</script>
<style lang="scss" scoped>
  .helpers{
    margin-top: 3.3rem;
    height: 3rem;
    width: 75%;
    background-color: #fcdfc8;
    display: flex;
    align-items: center;
    justify-self: flex-end;
    border-radius: 50px;
    padding: 0 2rem;
    justify-content: center;
  }
</style>
