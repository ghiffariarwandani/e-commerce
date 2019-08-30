<template>
  <div class="container" style="margin-top:60px;">
    <div class="row d-flex">
      <div class="col-8">
        <div class="flex-row" style="width:100%; height: 85px; border:1px solid rgba(0,0,0,0.2)">
          <p style="margin-top:15px; margin-bottom: 5px;">FREE SHIPPING FOR MEMBERS.</p>
          <p>Join VibesPlus for fast and free shipping. Join now or Login</p>
        </div>
        <p
          style="text-align: left; margin-top: 30px; margin-bottom:10px; font-size: 22px;  font-weight: bold"
        >CART</p>
        <div>
          <p
            v-if="errorMessage == '.'"
            style="font-size:12px; color: white; margin-bottom:0px"
          >{{errorMessage}}</p>
          <p
            v-else
            style="font-size:12px; color: red; margin-bottom:10px; text-align: left"
          >*{{errorMessage}}</p>
        </div>
        <div
          v-for="product in carts"
          :key="product._id"
          class="d-flex justify-content-start"
          style="border-bottom: 1px solid rgba(0,0,0,0.6); margin-bottom: 10px;"
        >
          <div>
            <img :src="product.ProductId.albumCover" alt="albumCover" style="border-radius:none;" />
          </div>
          <div style="margin-left: 30px" class="d-flex justify-content-start">
            <div>
              <div class="d-flex justify-content-between" style="width: 540px;">
                <p
                  style="font-size: 18px; margin-bottom:0; text-align:left; max-width:50%"
                >{{product.ProductId.albumName}}</p>
                <p>$ {{product.ProductId.price}}</p>
              </div>
              <p
                style="font-size: 15px; color: #8d8d8d; margin-bottom:0px; text-align:left;"
              >{{product.ProductId.artistName}}</p>
              <div class="d-flex flex-row">
                <div style="display: flex; align-items: center">
                  <p
                    style="margin-bottom:5px; font-size: 15px; color: #8d8d8d; text-align:left;"
                  >Quantity &nbsp </p>
                  <a
                    href="#"
                    class="d-flex align-self-center icon"
                    :disabled="product.ProductId.quantity == 0"
                    @click.prevent="minQuantity(product.ProductId._id)"
                    style="font-size:12px; text-decoration: none;"
                  >
                    <i class="fas fa-minus"></i>
                  </a>

                  <input
                    style="width: 30px; margin-left: 8px; margin-right: 8px; height: 30px"
                    disabled="0"
                    type="number"
                    v-model="product.quantity"
                    value="product.quantity"
                  />

                  <a
                    href="#"
                    class="d-flex align-self-center icon"
                    :disabled="product.quantity >= product.ProductId.quantity"
                    @click.prevent="plusQuantity(product.ProductId._id)"
                    style="font-size:12px; text-decoration: none"
                  >
                    <i class="fas fa-plus"></i>
                  </a>
                </div>
              </div>
              <div class="d-flex justify-content-start">
                <a href="#" @click.prevent="clickDeleteCart(product._id)">
                  <i
                    style="text-decoration:none; font-size: 15px; color: #8d8d8d;"
                    class="fas fa-trash"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4" style="background-color: #f8f2ef; max-height:340px">
        <div class="flex-row">
          <div>
            <p style="margin-top:20px; font-size: 20px; font-weight: bold; text-align:left">SUMMARY</p>
            <div
              class="d-flex justify-content-between d-flex align-items-center"
              style="height:35px"
            >
              <p style="margin-top:10px; font-size: 15px; text-align:left">Subtotal</p>
              <p>$ {{isUser.totalPayment}}</p>
            </div>
            <div
              class="d-flex justify-content-between d-flex align-items-center"
              style="height:35px"
            >
              <p
                style="margin-top:10px; font-size: 15px; text-align:left"
              >Estimated Shipping & Handling</p>
              <p>$ 0</p>
            </div>
            <div
              class="d-flex justify-content-between d-flex align-items-center"
              style="height:35px"
            >
              <p style="margin-top:10px; font-size: 15px; text-align:left">Estimated Tax</p>
              <p>$ 0</p>
            </div>
            <div
              class="d-flex justify-content-between d-flex align-items-center"
              style="height:35px; margin-top: 25px"
            >
              <p style="margin-top:10px; font-size: 15px; text-align:left">TOTAL</p>
              <p>$ {{isUser.totalPayment}}</p>
            </div>
          </div>
          <div style="margin-top: 25px;">
            <b-button
              variant="outline-dark"
              style="width:100%;"
              @click.prevent="submitCheckout"
            >Checkout</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapAction } from "vuex";
import Swal from "sweetalert2";
import Toast from '../helpers/swal'

export default {
  data() {
    return {
      subtotal: 0,
      errorMessage: "."
    };
  },
  computed: {
    ...mapState(["carts", "isUser"])
  },
  methods: {
    plusQuantity(productId) {
      let selectCart = this.carts.find(el => el.ProductId._id == productId);
      if (
        selectCart.ProductId.quantity &&
        selectCart.ProductId.quantity > selectCart.quantity
      ) {
        selectCart.quantity++;
        this.isUser.totalPayment += selectCart.ProductId.price;
        selectCart.totalPrice += selectCart.ProductId.price;
        selectCart.ProductId.quantity--
        this.errorMessage = ".";
      } else
        this.errorMessage = `Stock left ${selectCart.ProductId.quantity}`;
    },
    minQuantity(productId) {
      let selectCart = this.carts.find(el => el.ProductId._id == productId);
      if (selectCart.ProductId.quantity && selectCart.quantity > 1) {
        selectCart.quantity--;
        this.isUser.totalPayment -= selectCart.ProductId.price;
        selectCart.ProductId.quantity++
        this.errorMessage = ".";
      } else this.errorMessage = `Minimum quantity is 1`;
    },
    clickDeleteCart(cartId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Swal.fire({
            type: "success",
            title: "Delete Success",
            showConfirmButton: false,
            timer: 1500
          });
          this.$store.dispatch("deleteCart", cartId);
          setTimeout(() => {
            this.$store.dispatch("fetchCarts");
          }, 1800);
        }
      });
    },
    submitCheckout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch('createTransaction', {carts: this.carts, user:this.isUser})
          Toast.fire({
            type: 'success',
            title: 'successfully checkout, go to your profile to check'
          })
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("fetchCarts");
  }
};
</script>

<style>
img {
  width: 150px;
  height: 150px;
  border-radius: 0;
  margin-bottom: 10px;
}
</style>