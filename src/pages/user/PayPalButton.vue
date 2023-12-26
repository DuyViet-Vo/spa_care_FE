<!-- src/components/PayPalButton.vue -->
<template>
  <div id="paypal-button-container"></div>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

export default {
  props: {
    tong_tien_LH: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.setupPayPalButton();
  },
  methods: {
    setupPayPalButton() {
      const self = this;
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.tong_tien_LH.toString(),
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              Swal.fire({
                icon: "success",
                title: "Giao dịch được hoàn thành",
                text: "Bởi: " + details.payer.name.given_name,
              });
              // Phát sự kiện để thông báo cho thành phần cha về thanh toán thành công
              self.$emit("payment-successful");
            });
          },
        })
        .render("#paypal-button-container");
    },
  },
};
</script>
