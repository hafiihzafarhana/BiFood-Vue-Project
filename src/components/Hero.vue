<template>
  <div class="hero">
    <!-- for desktop -->
    <div class="d-md-block d-none">
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="align-self-center justify-content-center">
              <h2><strong>Delicious Food Menu, </strong> <br />In Your Home</h2>
              <p>Let's choose your foods</p>
              <router-link class="btn btn-lg btn-success" to="/foods"
                ><b-icon-arrow-right></b-icon-arrow-right> Order</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="align-self-center justify-content-center">
              <img src="./../assets/images/hero_food.svg" width="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- mobile -->
    <div class="d-md-none d-sm-block">
      <div class="row mt-4 d-md-block d-sm-none">
        <div class="col-md-6 mb-3">
          <div class="d-flex h-100">
            <div class="align-self-center justify-content-center">
              <img src="./../assets/images/hero_food.svg" width="100%" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="align-self-center justify-content-center">
              <h2><strong>Delicious Food Menu, </strong> <br />In Your Home</h2>
              <p>Let's choose your foods</p>
              <router-link class="btn btn-lg btn-success" to="/foods"
                ><b-icon-arrow-right></b-icon-arrow-right> Order</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
  </div>
</template>

<script>
export default {
  name: "HeroComponent",
};
</script>

<style></style>
