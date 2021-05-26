<template>
  <div class="main">
  <div class="cards">
    <div class="cards_item">
      <div class="card">
         <div class="card_image"><img :src="imgUrl"></div>
        <div class="card_content">
          <h2 class="card_title">{{ category_title }}</h2>
          <p class="card_text"> מחיר: {{ price }} ש"ח</p>
          
          <button class="btn card_btn">הוסף לסל</button>
        </div>
       
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ["id","price","category_title","imgUrl"],
  data() {
    return {
      product: null,
    };
  },
};
</script>

<style  scoped>

.card_content {
 
  background: linear-gradient(to bottom left, #111011 40%, #555352 100%);
  object-fit: cover; 
}





</style>