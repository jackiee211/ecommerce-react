import React, { useState, useEffect } from "react";
import { Modal, List, Button, message } from "antd";

const WishlistModal = ({ visible, onClose }) => {
  const [wishlist, setWishlist] = useState([]);

  // Function to load wishlist
  const loadWishlist = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.wishlist) {
      setWishlist(currentUser.wishlist);
    } else {
      setWishlist([]);
    }
  };

  useEffect(() => {
    if (visible) {
      loadWishlist();
    }

    const handleStorageChange = () => {
      loadWishlist();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [visible]);

  const removeFromWishlist = (itemId) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    // Remove item from wishlist
    const updatedWishlist = currentUser.wishlist.filter(item => item.id !== itemId);
    currentUser.wishlist = updatedWishlist;

    // Save to localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Trigger localStorage event to update UI in other components
    window.dispatchEvent(new Event("storage"));

    // Update state
    setWishlist(updatedWishlist);
    message.success("Item removed from wishlist");
  };

  return (
    <Modal
      title="Your Wishlist"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <List
          dataSource={wishlist}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button danger onClick={() => removeFromWishlist(item.id)}>Remove</Button>
              ]}
            >
              <span>{item.title || "Unknown Product"}</span>
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};

export default WishlistModal;
