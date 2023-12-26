<!-- src/components/PayPalButton.vue -->
<template>
  <div id="paypal-button-container"></div>
</template>

<script>
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
              alert(
                "Giao dịch được hoàn thành bởi: " +
                  details.payer.name.given_name
              );
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
