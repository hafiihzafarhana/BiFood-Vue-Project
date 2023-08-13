<template>
  <div class="cart">
    <NavbarComponent />

    <div class="container">
      <!-- breadcumb -->
      <div class="row mt-5">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <router-link class="breadcrumb-item text-dark" to="/foods"
                >Foods</router-link
              >
              <li class="breadcrumb-item active" aria-current="page">Cart</li>
            </ol>
          </nav>
        </div>
      </div>
      <!--  -->
      <div class="row">
        <div class="col">
          <h2>My Cart</h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Ammount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Throw</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in cartData" :key="data.id + index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="
                        data.product.gambar
                          ? require(`./../../public/assets/images/assets/${data.product.gambar}`)
                          : require('./../../public/assets/images/assets/menunggu.png')
                      "
                      :alt="data.nama"
                      class="img-fluid shadow"
                      width="250"
                    />
                  </td>
                  <td>
                    <strong> {{ data.product.nama }} </strong>
                  </td>
                  <td>{{ data.description ? data.description : "-" }}</td>
                  <td align="center">{{ data.count }}</td>
                  <td align="right">
                    {{ data.product.harga.toLocaleString("id-ID") }}
                  </td>
                  <td align="right">
                    <strong>
                      {{
                        (data.count * data.product.harga).toLocaleString(
                          "id-ID"
                        )
                      }}</strong
                    >
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash @click="throwProdut(data.id)"></b-icon-trash>
                  </td>
                </tr>
                <tr>
                  <td colspan="5"></td>
                  <td align="center" colspan="2">
                    Total Harga:
                    <strong>
                      Rp {{ totalPrices.toLocaleString("id-ID") }}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- form checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="buyer_name">Buyer Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Who are you?"
                v-model="checkoutProduct.buyer_name"
                name="buyer_name"
              />
            </div>
            <div class="form-group">
              <label for="number_table">Number Of Table</label>
              <input
                type="number"
                class="form-control"
                placeholder="what's number?"
                v-model="checkoutProduct.number_table"
                name="number_table"
              />
            </div>
            <div class="d-flex text-align-center justify-content-center">
              <button class="btn btn-success" type="submit">
                <b-icon-cart></b-icon-cart> Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./../components/Navbar.vue";
import eventBus from "./../transport/eventBus";
import axios from "axios";
import Vue from "vue";

export default {
  name: "CartView",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      cartData: [], // Data dari Navbar.vue akan disimpan di sini
      totalPrice: 0,
      checkoutProduct: {
        buyer_name: "",
        number_table: 1,
        cartData: [],
        totalPrice: 0,
      },
    };
  },
  created() {
    eventBus.$on("CartView", this.handleCartView);
  },
  beforeRouteLeave(to, from, next) {
    eventBus.$off("CartView", this.handleCartView);
    next();
  },
  methods: {
    handleCartView(data) {
      this.cartData = data;
    },
    throwProdut(id) {
      axios({
        method: "delete",
        url: `http://localhost:3000/carts/${id}`,
      })
        .then((response) => {
          console.log(response);
          this.cartData = this.cartData.filter((e) => e.id !== id);
          eventBus.$emit("CartView", this.cartData);
          Vue.$toast.success("Success remove item from cart", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSubmit() {
      if (this.checkoutProduct.buyer_name === "") {
        Vue.$toast.error("You should write your name", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      } else if (this.checkoutProduct.number_table < 1) {
        Vue.$toast.error("Please fill number of table", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      } else {
        this.checkoutProduct.cartData = this.cartData;
        this.checkoutProduct.totalPrice = this.totalPrices;

        axios({
          method: "post",
          url: "http://localhost:3000/orders",
          data: this.checkoutProduct,
        })
          .then(() => {
            // Handle the response from the server
            Vue.$toast.success("Success to checkout", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });

            this.cartData.map((e) => {
              return axios({
                method: "delete",
                url: `http://localhost:3000/carts/${e.id}`,
              }).catch((error) => {
                console.log(error);
              });
            });

            this.$router.push({ path: "/" });

            this.checkoutProduct.buyer_name = "";
            this.checkoutProduct.number_table = 1;
            this.checkoutProduct.totalPrice = 0;
            this.checkoutProduct.cartData = [];
          })
          .catch((error) => {
            // Handle errors
            console.log(error);
          });
      }
    },
  },
  computed: {
    totalPrices() {
      return this.cartData.reduce(function (items, data) {
        return items + data.product.harga * data.count;
      }, 0);
    },
  },
};
</script>
