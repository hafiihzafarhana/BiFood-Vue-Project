<template>
  <div class="home">
    <NavbarComponent />
    <div class="container">
      <HeroComponent />
      <BestFoodComponent />

      <div class="row mb-4">
        <div
          class="col-md-4 mt-d"
          v-for="product in products"
          :key="product.id"
        >
          <CardProductComponent :data="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./../components/Navbar.vue";
import HeroComponent from "./../components/Hero.vue";
import BestFoodComponent from "./../components/BestFood.vue";
import CardProductComponent from "./../components/CardProduct.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    NavbarComponent,
    HeroComponent,
    BestFoodComponent,
    CardProductComponent,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProduct(data) {
      this.products = data;
    },
  },
  mounted() {
    axios({
      method: "get",
      url: "http://localhost:3000/best-products",
    })
      .then((response) => {
        this.setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
