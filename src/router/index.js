import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import FoodView from "../views/FoodView.vue";
import CartView from "../views/CartView.vue";
import FoodDetailView from "../views/FoodDetailView.vue";
import SuccessCheckoutView from "./../views/SuccessCheckoutView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/foods",
    name: "FoodView",
    component: FoodView,
  },
  {
    path: "/carts",
    name: "CartView",
    component: CartView,
  },
  {
    path: "/foods/:id",
    name: "FoodDetailView",
    component: FoodDetailView,
  },
  {
    path: "/success-checkout",
    name: "SuccessCheckoutView",
    component: SuccessCheckoutView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
