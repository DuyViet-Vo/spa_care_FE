<!-- src/components/PayPalButton.vue -->
<template>
  <div id="paypal-button-container"></div>
</template>

<script>
export default {
  mounted() {
    this.setupPayPalButton();
  },
  methods: {
    setupPayPalButton() {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            console.log("data: ", data)
            console.log("actions: ", actions)
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00",
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert(
                "Giao dịch được hoàn thành bởi:" + details.payer.name.given_name
              );
            });
          },
        })
        .render("#paypal-button-container");
    },
  },
};
</script>
