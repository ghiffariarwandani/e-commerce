<template>
  <b-container style="padding: 0px; margin-top:70px">
    <b-row>
      <b-col
        class="column d-flex justify-content-center"
        cols="3"
        v-for="(album, i) in products"
        :key="i"
      >
        <a href style="text-decoration: none;" @click.prevent="clickDetail(album._id)">
          <div>
            <div class='product'>
              <img :src="album.albumCover" alt="albumCover" style="height:225px; width:225px">
            </div>
            <div>
              <div style="margin-top:20px; ">
                <p style="margin-bottom: 5px;"> {{album.artistName}} </p>
              </div>
              <div style="margin:0px; max-width: 224px">
                <p style="font-size: 14px; color: rgba(0,0,0,0.5)"> {{album.albumName}} </p>
              </div>
            </div>
          </div>
        </a>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "albums",
  components: {},
  data() {
    return {
      isProduct: ""
    };
  },
  methods: {
    clickDetail(albumId) {
      this.$router.push(`/album-detail/${albumId}`);
    }
  },
  computed: {
    ...mapState(["products"])
  },
  created() {
    this.$store.dispatch("fetchProduct");
  }
};
</script>

<style scoped>
.column {
  width: 200px;
  height: 350px;
}

.product {
  width: 224px;
  height: 224px;
  padding: 0px;
  margin: 0px;
  box-shadow: 0px 7px 13px 1px rgba(0, 0, 0, 0.75);
  transition: all 1s;
  transform: scale(1);
}

.product img {
  transition: 0.5s;
}

.product:hover img {
  opacity: 0.8;
  transform: scale(1.03);
}
</style>