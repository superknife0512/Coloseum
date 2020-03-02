<template>
  <div>
    <div class="bar">
      <figure class="avatar" v-for="i in 3" :key="i">
        <h6> Leesin </h6>
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg"
            alt="cat">
        <h5> 550 </h5>
        <change-score-tooltip :isShow="true"></change-score-tooltip>
      </figure>
      <figure class="challenger">
        <img src="https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg?w=1155&h=1541"
            alt="cat">
        <div class="challenger__info">
          <h2> 526 </h2>
          <h3> Garen </h3>
        </div>
      </figure>
    </div>
  </div>
</template>
<script>
import changeScoreTooltip from './tooltips/changeScore';

export default {
  components: {
    changeScoreTooltip,
  },
};
</script>
<style lang="scss" scoped>
  .bar {
    background-color: rgb(175, 0, 52);
    display: flex;
    border-radius: 40rem;
    padding-left: 2.5rem;
    margin-top: 3rem;
    height: 10rem;
  }
  .avatar{
    margin-right: 3rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 1rem;
    position: relative;
    h6{
      color: rgb(255, 255, 255);
      font-weight: 600;
      margin-bottom: 0.2rem;
      font-style: italic
    }
    img {
      height: 5.5rem;
      width: 5.5rem;
      object-fit: cover;
      border-radius: 50%;
    }
    h5 {
      padding: .1rem 1.2rem;
      background-color: #fff;
      border-radius: 25rem;
      margin-top: -1rem;
    }
  }
  .challenger{
    display: flex;
    align-items: center;

    &__info{
      margin-left: 1.5rem;
      text-align: center;
    }
    h2{
      color: rgb(230, 53, 8);
      padding: .5rem 1.2rem;
      background-color: #fff;
      border-radius: .5rem;
      font-weight: 500
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
