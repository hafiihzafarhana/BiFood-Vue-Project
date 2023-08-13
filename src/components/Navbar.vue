<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <div class="container">
        <b-navbar-brand href="#">BiFood</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/foods">Foods</router-link>
            </li>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/carts">
                Cart
                <b-icon-bag></b-icon-bag>
                <span class="badge badge-success ml-2">{{
                  foodCart.length
                }}</span>
              </router-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
import eventBus from "./../transport/eventBus";

export default {
  name: "NavbarComponent", // Component name with multiple words
  data() {
    return {
      foodCart: [],
    };
  },
  methods: {
    setCart(data) {
      this.foodCart = data;
    },
  },
  mounted() {
    axios({
      method: "get",
      url: `http://localhost:3000/carts`,
    })
      .then((response) => {
        this.setCart(response.data);
        eventBus.$emit("CartView", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  created() {
    eventBus.$on("CartView", (data) => {
      this.setCart(data);
    });
  },
};
</script>

<style>
/* Your component's styles here */
</style>
