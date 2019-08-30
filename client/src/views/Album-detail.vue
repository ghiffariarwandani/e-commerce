<template>
  <div>
    <b-container class="mt-4">
      <h6>DETAIL ALBUM</h6>
      <br />
      <b-row>
        <b-col cols="4" class="left-detail">
          <div>
            <img :src="product.albumCover" alt />
            <div
              class="d-flex justify-content-between"
              style="margin-left:30px; margin-right:29px; margin-top:10px; border-bottom: 0.5px solid rgba(0,0,0,0.4)"
            >
              <div>
                <p style="font-size: 13px; color: rgba(0,0,0,0.6);">{{product.trackList.length}} Songs, 1 Hour 14 Minutes</p>
              </div>
              <div>
                <p style="font-size: 13px; color: rgba(0,0,0,0.6);">
                  Preview
                  <i style="color: rgba(0,0,0,0.6); font-size: 14px" class="fas fa-play"></i>
                </p>
              </div>
            </div>
            <p
              style="text-align:left; margin-left:30px; margin-top:10px; margin-bottom: 5px"
            >EDITOR NOTE'S</p>
            <p
              style="text-align:left; margin-left:30px; font-size:12px; color: rgba(0,0,0,0.8)"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium earum non dolor et nemo? Dolore corporis voluptatibus optio veniam! Nihil ducimus quae ratione odio in maxime excepturi veniam expedita asperiores!</p>
            <b-button v-if="product.quantity > 0" variant="outline-dark" style="box-shadow: 0px 7px 10px 1px rgba(0, 0, 0, 0.75);" @click.prevent="clickAddCart(product)">
              <i style="font-size: 14px" class="fas fa-shopping-cart"> Add To Cart</i>
            </b-button>
            <b-button v-else variant="outline-dark" disabled>Out Of Stock</b-button>
          </div>
        </b-col>
        <b-col cols="8" class="track" style="padding-right: 250px">
          <div>
            <p style="text-align:left; font-size: 25px; margin-bottom:0">{{ product.albumName }}</p>
            <p
              style="text-align:left; font-size: 20px; color:rgba(0,0,0,0.8); margin-bottom: 0"
            >{{ product.artistName }}</p>
            <p style="text-align:left; font-size: 12px; color:#8e8e93; margin-bottom:0">{{product.genre}} - {{product.year}}</p>
            <p
              style="text-align:left; font-size: 12px; color:#8e8e93; margin-bottom:0"
            >$ {{ product.price }}</p>
          </div>
          <table class="table" style="margin-top: 10px;">
            <tbody v-for="(track, i) in product.trackList" :key="track.song">
              <tr class="track-song">
                <th scope="row" style="color:rgba(0,0,0,0.8)">{{i+1}}</th>
                <td
                  style="text-align: left; padding-left: 50px; color:rgba(0,0,0,0.8); font-size: 14px"
                >{{track}}</td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Swal from 'sweetalert2';
export default {
  name: "album-detail",
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState(["product"])
  },
  methods: {
    ...mapActions(["detailProduct", "addToCart"]),
    clickAddCart(product) {
      if(localStorage.token) this.$store.dispatch("addToCart", {product})
      else {
        Swal.fire({
          type: 'warning',
          title: 'you must login first',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  },
  created() {
    this.detailProduct(this.$route.params.id);
  }
};
</script>

<style scoped>
.product {
  width: 300px;
  height: 400px;
  padding: 0px;
  margin: 0px;
  box-shadow: 0px 7px 13px 1px rgba(0, 0, 0, 0.75);
}

img {
  width: 300px;
  height: 300px;
  border-radius: 7px;
}

.left-detail {
  width: 300px;
  height: 700px;
}

.track-song:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>