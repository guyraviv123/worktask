<template>
 
<div class="topnav">

  <div class="search">

      <input  type="text" class="searchTerm" v-model="inputVmodel" @keyup="myFunctionSearch(inputVmodel)" placeholder="חיפוש...">
     
   </div>
 

</div>
<br><br><br><br><br>


<div class="sidebar">
  <a  class="active" @click="showAll()">כל המוצרים</a>
  <a  @click="filter(`אבא`)">סמארטפונים</a>
  <a @click="filter(`טאבלטים`)">טאבלטים</a>
  <a @click="filter(`שעונים`)">שעונים</a>
  <a @click="filter(`אביזרים`)">אביזרים</a>
  <a @click="filter(`לייפסטייל`)">לייפסטייל</a>
  <a @click="filter(`אביזרים לטלפונים`)">אביזרים לטלפונים</a>
  <a @click="filter(`טלווזיות LED`)">טלווזיות LED</a>
  <a @click="filter(`זכרונות`)">זכרונות</a>
  <a @click="filter(`עדשות ומסננים`)">עדשות ומסננים</a>
  <a @click="filter(`טיונרים`)">טיונרים</a>
  <a @click="filter(`שעונים חכמים`)">שעונים חכמים</a>
  <a @click="filter(`מכשירי כריכה ולמינציה`)">מכשירי כריכה ולמינציה</a>
  <a @click="filter(`קלטות גיבוי`)">קלטות גיבוי</a>
  <a @click="filter(`מקרן קול/סאונד-בר`)">מקרן קול/סאונד-בר</a>
  <a @click="filter(`מסגרות דיגיטליות`)">מסגרות דיגיטליות</a>
  <a @click="filter(`טלפונים`)">טלפונים</a>
  <a @click="filter(`מצלמות דיגיטליות`)">מצלמות דיגיטליות</a>
  <a @click="filter(`קוראי כרטיסים`)">קוראי כרטיסים</a>
  <a @click="filter(`מחשבי כף-יד`)">מחשבי כף-יד</a>
  <a @click="filter(`DVD`)">DVD</a>
  <a @click="filter(`מחשבי כף-יד`)">מחשבי כף-יד</a>
</div>

<div class="content">

 
  <div v-if="ProductsT.length" class="main" >
     <h1>{{ category_title }}</h1>
  <ul class="cards">
         <li v-for="product in ProductsT" :key="product.created_at" class="cards_item" >
         <!-- Show the first image -->
        <div v-for="j in product.images.slice(0, 1)" :key="j.id" >
              
        <div class="card">
        <div class="card_image"><img :src= "j.url" ></div>
        <div class="card_content">
          <h2 class="card_title">{{ product.title }}</h2>
          <p class="card_text"> מחיר: {{ product.price }} ש"ח</p>
            
           
               <router-link class="btn card_btn" :to="{ name: 'Products', params: { id: j.id,price: product.price, category_title:product.title,imgUrl:j.url } }">
            לרכישה
      </router-link>
  
        </div>
      </div>
          </div>
     </li>
    </ul>
    </div>
       <div v-if="searchT&&!ProductsT.length">
    <h1>חיפוש - לא נמצאו תוצאות</h1>
  </div>  
     <div v-if="!searchT&&!ProductsT.length">
    
    <h1>Loading ...</h1>
  </div>
  </div>
 
  <br>
  <form v-if="submitfrom" @submit.prevent="submitForm">
     <h1>Contact Us</h1>
    <div class="form-control">
      
      <input  name="user-name" type="text" v-model="userName" placeholder="שם:" />
    </div>
    <div class="form-control">
    
      <input  name="useremail" type="email" v-model="useremail" placeholder="Email:" />
    </div>
     <div class="form-control">
     
      <input  name="usernum" type="text" v-model="usernum"  placeholder="טלפון:"/>
    </div>
    <div>
   
      <input type="submit" value="שליחה">
    </div>
  </form>
  <form v-else>
     <h1>הטופס נשלח בהצלחה!</h1>
   
  </form>


 
</template>

<script>


export default {
  data() {
    return {
      ProductsT: [],
      source: [],
      category_title: "כל המוצרים",
      inputVmodel:"",
      userName: '',
      useremail: null,
      usernum: null,
      submitfrom:true,
      searchT:false
    };
  },
    methods: {
    filter(category) {
      //Shows results by category
      this.ProductsT=this.source.filter(source => source.store_category_title == category);
      if(category=="אבא")
    {
         this.category_title="סמארטפונים";

    }else{

      this.category_title=category;
    }
     

    },
     showAll() {
        //Shows all results 
      this.ProductsT=this.source;
      this.category_title="כל המוצרים";

    },
    //Search
   myFunctionSearch(inputModel) {
 
  let filter = inputModel.toLowerCase();;
  let newk = [];
  let temp =this.source;
  for (let x in temp) {
    
    if (temp[x].title.toLowerCase().includes(filter)) {
        
      newk.push(temp[x]); 
    
    } 
  }
  this.ProductsT=newk;
  this.searchT=true;
}, submitForm() {


       fetch('https://webhook.site/6c20dc1e-8353-45ed-bfac-44af6d090b41', {
        method: 'POST',
        headers: {
           "Content-Type": "application/json",
         
        },
        body: JSON.stringify({
          name: this.userName,
          email: this.useremail,
          phone: this.usernum
        }),
      }).catch((err) => console.log(err.message));;
      this.userName= '';
      this.useremail= null;
      this.usernum= null;
      this.submitfrom= false;


    },
  },
  mounted() {
    fetch("https://api.konimbo.co.il/v1/items?token=9c1a92bf8cefc59e4ec9fa7c53bba0f90dd8b15850bef1062dbf32c5e8fd3a08")
      .then((res) => res.json())
      .then((data) => (this.ProductsT = data)).then((data) => (this.source=data))
      .catch((err) => console.log(err.message));
      

  },
  
};
</script>

<style>

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background-color: #f0f9ff;
}

body {
  color: #272727;
  direction: rtl;

}
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
  
 
 
}



.main{
  max-width: 1200px;
  margin:  auto;
}

h1 {
    font-size: 24px;
    font-weight: 400;
    text-align: center;
}

img {
  /* height: auto;
  max-width: 100%;
  vertical-align: middle; */
  width:100%;
  height:180px; 
  object-fit: cover; 
  vertical-align: middle;
}

.btn {
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: 400;
  display: block;
  width: 100%;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
}

.btn:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;

}

.cards_item {
  display: flex;
  padding: 1rem;
 
 
 
}

@media (min-width: 600px) {
  .cards_item {
    width: 400px;
    
  }
}

@media (min-width: 800px) {
  .cards_item {
    width: 550px;
    margin-right: auto;
  }

}

@media (min-width:  1200px) {
  .cards_item {
    width: 400px;
    
  }
}

.card {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 350px;
  height: 350px;
  
}

.card_content {
  padding: 1rem;
  height:170px; 
  background: linear-gradient(to bottom left, #0975f0 40%, #bfd0ff 100%);
  object-fit: cover; 
}

.card_title {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin: 0px;
}

.card_text {
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;    
  font-weight: 400;
}
.sidebar {

  width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background: linear-gradient(to bottom left, #0975f0 40%, #bfd0ff 100%);
  position: fixed;
  height: 100%;
  overflow: auto;
  margin-left: 100px;
  
}
.sidebar::-webkit-scrollbar {
    display: none;
}
.content::-webkit-scrollbar {
    display: none;
}
.sidebar a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #ffffff;
  font-size: 1rem;  
 
  /* font-weight: 700; */
}
 
.sidebar a.active {
  background-color: #024088;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

.content {
  margin-right: 150px;
  /* padding: 1px 10px; */
  height: 100%;
}

@media screen and (max-width: 1100px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    
  }
  .sidebar a {float: right;}
  div.content {margin-right: 0;}
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
    width: 100%;
  }
   .sidebar {
    width: 100%;
    height: 300px;
    position: relative;
    overflow-y: scroll;
    
  }
 .content{
/* top: 70px; */
/* margin-top: 50px; */
padding-top: 20px;
height: 350px;
overflow-y: scroll;
margin:auto;
width: 100%;
position: relative;


}
}
.search {
  width: 70%;
  position: relative;
  display: flex;
  right:  20%;
}

.searchTerm {
  width: 100% !important;
  border: none!important;
  padding: 15px !important;
  height: 36px !important;
  border-radius: 15px 15px 15px 15px !important;
  margin: 15px !important;
  outline: none !important;
  color: #050505 !important;
  box-shadow: 0 2px 8px rgba(48, 46, 46, 0.26) !important;
}

.searchTerm:focus{
  color: #00B4CC;
}

.searchButton {
  width: 70px;
  height: 36px;
  border: 1px solid #00B4CC;
  background: #00B4CC;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap{
  width: 30%;
  position: absolute;
  
  left: 50%;
  transform: translate(-50%, -50%);
}
/* .Product{
 flex-direction: row;
} */

input[type=text], input[type=email] {
  font-size: 17px;
  line-height: 1.23543;
  font-weight: 400;

  vertical-align: top;
  width: 100%;
  height: 3.3em;
  margin-bottom: 14px;
  padding-top: 18px;
  padding-left: 16px;
  padding-right: 16px;
  color: #333;
  text-align:right;
  border: 1px solid #dedede;
  border-radius: 4px;
  background-clip: padding-box;
}
input[type=text]:hover, input[type=email]:hover, textarea:hover {
  background-color: #eeeeee;
}

input[type=submit] {
    font-size: 17px;
    font-weight: 400;
    background-color: #0070c9;
    background: linear-gradient(#42a1ec,#0070c9);
    border-color: #07c;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    display: inline-block;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    padding: 13px 15px 14px;
}

input[type=submit]:hover {
    background-color: #147bcd;
    background: linear-gradient(#51a9ee,#147bcd);
    border-color: #1482d0;
    text-decoration: none;
}

.topnav {

  overflow: hidden;
  position: fixed;
  width: 100%;
}

.content{
/* top: 70px; */
/* margin-top: 50px; */
padding-top: 20px;
height: 650px;
overflow-y: scroll;
margin-right: 150px;

}

</style>