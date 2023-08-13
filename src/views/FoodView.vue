<template>
  <div class="food">
    <NavbarComponent />
    <div class="container">
      <!--  -->
      <div class="row mt-4">
        <div class="col">
          <h2>Daftar <strong>Makanan</strong></h2>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Search some foods"
              @keyup="searchFood"
            />

            <span class="input-group-text" id="basic-addon1"
              ><b-icon-search></b-icon-search
            ></span>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div
          class="col-md-4 mt-d"
          v-for="product in products"
          :key="product.id"
        >
          <CardProductComponent :data="product" />
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./../components/Navbar.vue";
import CardProductComponent from "./../components/CardProduct.vue";
import axios from "axios";

export default {
  name: "FoodView",
  components: {
    NavbarComponent,
    CardProductComponent,
  },
  data() {
    return {
      products: [],
      search: "",
    };
  },
  methods: {
    setProduct(data) {
      this.products = data;
    },
    searchFood() {
      axios({
        method: "get",
        url: `http://localhost:3000/foods?q=${this.search}`,
      })
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    axios({
      method: "get",
      url: "http://localhost:3000/foods",
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
