import React from "react";
import { PaystackButton } from "react-paystack";

const PayStackTest = () => {
  const publicKey = "pk_live_e32a7c6911b3761bc5d07c85bb620f1cce289807";
  const amount = 1;
  const currency = "GHS";
  const [email, setEmail] = React.useState("aljay3334@gmail.com");
  const [name, setName] = React.useState("Allen Jones");
  const [phone, setPhone] = React.useState("0543201893");

  const componentProps = {
    email,
    amount,
    metadata: {
      display_name: name,
      phone
    },
    currency,
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :(")
  };
  return (
    <div style={{ marginTop: 200 }}>
      <PaystackButton
        style={{ height: 30, width: 30, marginTop: 100 }}
        {...componentProps}
      />
    </div>
  );
};

export default PayStackTest;
