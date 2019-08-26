<template>
  <b-container style="height: 600px">
    <div
      class="d-flex justify-content-center"
      style="margin-bottom:30px;margin-top:30px"
    >FIND MUSIC FOR CODING MOOD</div>

    <div>
      <b-carousel
        id="carousel-no-animation"
        style="text-shadow: 0px 0px 2px #000; box-shadow: 0px 7px 13px 1px rgba(0, 0, 0, 0.75);"
        no-animation
        indicators
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide img-src="https://wallpaperplay.com/walls/full/7/4/e/271170.jpg"></b-carousel-slide>
        <b-carousel-slide img-src="https://i.pinimg.com/originals/fe/fc/ed/fefced01deb0c19dc4576c17c3fe1f00.jpg"></b-carousel-slide>
        <b-carousel-slide img-src="https://www.wallpaperup.com/uploads/wallpapers/2013/01/15/29542/e9f72eeb11a133720e7c202f16ebc86d.jpg"></b-carousel-slide>
        <b-carousel-slide img-src="https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"></b-carousel-slide>
      </b-carousel>
    </div>
  </b-container>
</template>

<script>
export default {};
</script>

<style>
.img-fluid {
  max-width: 600px;
  max-height: 500px
}
</style>

