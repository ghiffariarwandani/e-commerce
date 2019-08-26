<template>
  <div class="container" style="margin-top: 70px">
    <div class="row">
      <div class="col-5" style="border-right: 0.5px solid rgba(0,0,0,0.6)">
        <div>
          <router-link to="/dashboard-user/profile"
            style="font-weight: bold; font-size: 25px; border-bottom: 0.5px solid rgba(0,0,0,0.4); text-decoration: none; color: black;"
          >USER PROFILE</router-link>
          <router-view></router-view>
        </div>
       
      </div>
      <div class="col-7 d-flex-justify-content-center">
        <p
          style="font-weight: bold; font-size: 25px; border-bottom: 0.5px solid rgba(0,0,0,0.4)"
        >TRANSACTION</p>
        <div>
          <tr
            class="table table-borderless table-condensed table-hover d-flex justify-content-center"
            style="margin-top: 10px; width:100%"
          >
            <tbody style="text-align:center">
              <tr class="track-song" v-for="(transaction, i) in cartsPaid" :key="i">
                <td
                  style="padding-left: 30px; color:rgba(0,0,0,0.8);"
                >{{converter(transaction.createdAt)}}</td>
                <td
                  style="padding-left: 30px; color:rgba(0,0,0,0.8);"
                >$ {{transaction.totalPayment}}</td>
                <td style="padding-left: 30px; color:rgba(0,0,0,0.8);">{{transaction.status}}</td>
                <td v-if="transaction.status == 'paid'" style="color:rgba(0,0,0,0.8);">
                  <b-col lg="4" class="pb-2">
                    <b-button
                      size="sm"
                      variant="outline-primary"
                      @click.prevent="clickDelivered(transaction._id)"
                    >Delivered</b-button>
                  </b-col>
                </td>
                <td v-else style="padding-left: 30px; color:rgba(0,0,0,0.8);">Delivered</td>
              </tr>
            </tbody>
          </tr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapAction } from "vuex";
import converter from "../helpers/convertTime";

export default {
  computed: {
    ...mapState(["isUser", "cartsPaid"])
  },
  mounted() {
    this.$store.dispatch("fetchTransaction");
  },
  methods: {
    converter,
    clickDelivered(id) {
      this.$store.dispatch("setDelivered", id);
    }
  }
};
</script>

<style>
</style>