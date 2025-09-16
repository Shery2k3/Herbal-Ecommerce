import React from "react";

const EmailTemplateAdmin = ({
  formValues,
  cart,
  totalPrice,
  deliveryCharges,
  area,
  orderID,
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        backgroundColor: "#000",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />
      <style>
        {`
          @media only screen and (max-width: 600px) {
            .card-container {
              width: 100%;
              max-width: 100%;
            }
          }
        `}
      </style>
      <img
        src="https://houseofdumplings.com.pk/images/logo.png"
        alt="Herbia Logo"
        style={{
          display: "block",
          margin: "0 auto 10px",
          width: "100%",
          maxWidth: "150px",
          height: "auto",
        }}
      />
      <div
        className="card-container"
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "90%",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <div className="card">
          <h1
            style={{
              color: "#F30128",
              fontWeight: "bold",
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            Order Details
          </h1>
          <p style={{ marginBottom: "0px", fontWeight: "bold" }}>
            Order ID: <span style={{ float: "right" }}>HOD-{orderID}</span>
          </p>
          <hr />
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "15px 0px",
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "8px 0px" }}>Recipient's Name</td>
                <td style={{ padding: "8px 0px", textAlign: "right" }}>
                  {formValues.fullName}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0px" }}>Recipient's Phone Number</td>
                <td style={{ padding: "8px 0px", textAlign: "right" }}>
                  {formValues.phoneNum}, {formValues.phoneNumAlternate}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0px" }}>Recipient's Address</td>
                <td style={{ padding: "8px 0px", textAlign: "right" }}>
                  {formValues.deliveryAddress} near {formValues.near}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0px" }}>Delivery Zone</td>
                <td style={{ padding: "8px 0px", textAlign: "right" }}>
                  {area}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0px" }}>Recipient's Email</td>
                <td style={{ padding: "8px 0px", textAlign: "right" }}>
                  {formValues.email}
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "15px 0",
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "0px", fontWeight: "bold" }}>
                  Instructions
                </td>
                <td style={{ padding: "0px", textAlign: "right" }}>
                  {formValues.instructions}
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "15px 0px",
            }}
          >
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: "0px" }}>
                    <strong>
                      {item.quantity}x {item.title}
                    </strong>
                  </td>
                  <td style={{ padding: "0px", textAlign: "right" }}>
                    Rs.{item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "15px 0px",
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "0px" }}>Sub-Total:</td>
                <td style={{ padding: "0px", textAlign: "right" }}>
                  Rs.{totalPrice}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "0px" }}>Delivery Charges:</td>
                <td style={{ padding: "0px", textAlign: "right" }}>
                  Rs.{deliveryCharges}
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "0px", fontWeight: "bold" }}>
                  Grand Total:
                </td>
                <td
                  style={{
                    padding: "0px",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Rs.{totalPrice + deliveryCharges}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p
        style={{
          fontSize: "13px",
          color: "#fff",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        This is an auto-generated email. Please do not reply to it.
      </p>
    </div>
  );
};

export default EmailTemplateAdmin;
