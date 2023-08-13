<template>
  <div class="best-food mt-4">
    <div class="row">
      <div class="col">
        <h2>Best <strong>Foods</strong></h2>
      </div>
      <div class="col">
        <router-link to="/foods" class="btn btn-success float-right">
          <b-icon-eye></b-icon-eye>
          Lihat Semua
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BestFoodComponent",
};
</script>

<style></style>
