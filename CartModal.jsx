import React, { useState, useEffect } from "react";
import { Modal, List, Button, message, Typography } from "antd";

const { Text } = Typography;

const CartModal = ({ visible, onClose }) => {
  const [cart, setCart] = useState([]);

  // Function to load cart
  const loadCart = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.cart) {
      setCart(currentUser.cart);
    } else {
      setCart([]);
    }
  };

  useEffect(() => {
    if (visible) {
      loadCart();
    }

    const handleStorageChange = () => {
      loadCart();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [visible]);

  const removeOnePiece = (itemId) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const updatedCart = currentUser.cart.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);

    currentUser.cart = updatedCart;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    window.dispatchEvent(new Event("storage"));

    setCart(updatedCart);
    message.success("One piece removed from Cart");
  };

  const addAnotherPiece = (itemId) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const updatedCart = currentUser.cart.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    currentUser.cart = updatedCart;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    window.dispatchEvent(new Event("storage"));

    setCart(currentUser.cart);
    message.success("One piece added to Cart");
  };

  return (
    <Modal
      title="Your Cart"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      {cart.length === 0 ? (
        <p>Your Cart is empty.</p>
      ) : (
        <List
          dataSource={cart}
          renderItem={(item) => (
            <List.Item
              actions={[
                <>
                  <Button danger onClick={() => removeOnePiece(item.id)}>Remove</Button>
                  <Button onClick={() => addAnotherPiece(item.id)}>Add</Button>
                </>
              ]}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>{item.title || "Unknown Product"}</span>
                  <Text style={{ marginTop: "5px" }}>
                    Quantity: {item.quantity}
                  </Text>
                  <Text style={{ marginTop: "5px" }}>
                    Price Before Taxes: ${Math.round(item.price)}
                  </Text>
                  <Text style={{ marginTop: "5px" }}>
                    Taxes: $15
                  </Text>
                  <Text style={{ marginTop: "5px", fontWeight: "bold" }}>
                    Price After Taxes: ${Math.round(item.price + 15)}
                  </Text>
                  <Text style={{ marginTop: "5px", fontWeight: "bold" }}>
                    Total Price: ${Math.round((item.price + 15) * item.quantity)}
                  </Text>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};

export default CartModal;