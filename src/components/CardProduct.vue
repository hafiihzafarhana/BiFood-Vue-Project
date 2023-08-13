<template>
  <div class="card shadow card-product">
    <img
      :src="require(`./../../public/assets/images/assets/${data.gambar}`)"
      class="card-img-top"
      :alt="data.nama"
    />
    <div class="card-body">
      <h5 class="card-title">{{ data.nama }}</h5>
      <p class="card-text">Rp {{ data.harga.toLocaleString("id-ID") }}</p>
      <router-link class="btn btn-success" :to="'/foods/' + data.id"
        ><b-icon-cart></b-icon-cart> Order</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProductComponent",
  props: {
    data: {
      id: Number,
      kode: String,
      nama: String,
      harga: Number,
      is_ready: Boolean,
      gambar: String,
    },
  },
};
</script>

<style></style>
