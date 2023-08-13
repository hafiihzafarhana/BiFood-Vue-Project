<template>
  <div class="foodDetail">
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
              <li class="breadcrumb-item active" aria-current="page">
                Food Detail
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- food detail -->
      <div class="row mt-3">
        <div class="col-md-6">
          <img
            :src="
              dataProduct.gambar
                ? require(`./../../public/assets/images/assets/${dataProduct.gambar}`)
                : require('./../../public/assets/images/assets/menunggu.png')
            "
            :alt="dataProduct.nama"
            class="img-fluid shadow"
          />
        </div>
        <div class="col-md-6">
          <h2>{{ dataProduct.nama }}</h2>
          <hr />
          <h4>
            <strong v-if="dataProduct.harga"
              >Rp {{ dataProduct.harga.toLocaleString("id-ID") }}</strong
            >
          </h4>
          <hr />
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="jumlah_pemesanan">Amount Order</label>
              <input
                type="number"
                class="form-control"
                placeholder="Amount your order"
                v-model="orderProduct.count"
                @keyup="validateCountOrder"
              />
            </div>
            <div class="form-group">
              <label for="keterangan_pemesanan">Order Description</label>
              <textarea
                class="form-control"
                placeholder="Notes..i.e: spicy"
                v-model="orderProduct.description"
              ></textarea>
            </div>
            <div class="d-flex text-align-center justify-content-center">
              <button class="btn btn-success" type="submit">
                <b-icon-cart></b-icon-cart> Order
              </button>
              <p class="ml-auto">
                Total:
                <strong v-if="dataProduct.harga"
                  >Rp
                  {{
                    (dataProduct.harga * orderProduct.count).toLocaleString(
                      "id-ID"
                    )
                  }}
                </strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./../components/Navbar.vue";
import axios from "axios";
import Vue from "vue";

export default {
  name: "FoodDetailView",
  components: { NavbarComponent },
  data() {
    return {
      dataProduct: {},
      orderProduct: {
        count: 1,
        description: "",
        product: {},
      },
    };
  },
  methods: {
    setProduct(data) {
      this.dataProduct = data;
    },
    handleSubmit() {
      this.orderProduct.product = this.dataProduct;
      if (this.orderProduct.count > 0) {
        axios({
          method: "post",
          url: "http://localhost:3000/carts",
          data: this.orderProduct,
        })
          .then(() => {
            // Handle the response from the server
            Vue.$toast.success("Success to add to cart", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });

            this.$router.push({ path: "/carts" });

            this.orderProduct.count = 1;
            this.orderProduct.description = "";
          })
          .catch((error) => {
            // Handle errors
            console.log(error);
          });
      } else {
        Vue.$toast.error("Minimum order is 1", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
    validateCountOrder() {
      if (this.orderProduct.count >= 50) {
        this.orderProduct.count = 50;
      } else if (this.orderProduct.count < 1) {
        this.orderProduct.count = 1;
      }
    },
  },
  mounted() {
    axios({
      method: "get",
      url: `http://localhost:3000/foods/${this.$route.params.id}`,
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

<style></style>
