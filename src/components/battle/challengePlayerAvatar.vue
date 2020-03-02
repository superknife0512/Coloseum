<template>
  <figure class="challenger">
    <img src="https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg?w=1155&h=1541"
        alt="cat">
    <div class="challenger__info">
      <h2 @click="showModal = !showModal"> 526 </h2>
      <h3> Garen </h3>
      <change-score-tooltip :isShow="showModal" :position="'bottom: -7.2rem !important'" />
    </div>
  </figure>
</template>

<script>
import changeScoreTooltip from '../tooltips/changeScore';


export default {
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    changeScoreTooltip,
  },
};
</script>

<style lang="scss" scoped>
  .challenger{
    display: flex;
    align-items: center;

    &__info{
      position: relative;
      margin-left: 1.5rem;
      text-align: center;
      cursor: pointer;
    }
    h2{
      color: rgb(230, 53, 8);
      padding: .5rem 1.2rem;
      background-color: #fff;
      border-radius: .5rem;
      font-weight: 500;
      transition: all .2s;
      font-size: 2.5rem;

      &:hover {
        transform: scale(1.1);
      }
    }
    h3{
      color: white;
      margin-bottom: 0;
    }
    img{
      width: 14rem;
      height: 14rem;
      object-fit: cover;
      border-radius: 50%;
      margin-left: 1.2rem;
      border: .6rem solid rgb(240, 208, 149);
    }
  }
</style>
