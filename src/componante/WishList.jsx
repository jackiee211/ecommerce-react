import React, { useState, useEffect } from "react";
import { Button, Modal, List, Typography, message } from "antd";

const { Title } = Typography;

const WishlistModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  // Load user and wishlist from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      loadWishlist(storedUser.id);
    }
  }, []);

  // Load wishlist for the specific user
  const loadWishlist = (userId) => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const userWishlist = savedWishlist.filter((item) => item.userId === userId);
    setWishlist(userWishlist);
  };

  // Remove an item from the wishlist
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    message.success("Item removed from wishlist");
  };

  return (
    <>
      {/* Button to Open Wishlist */}
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        View Wishlist
      </Button>

      {/* Wishlist Modal */}
      <Modal
        title={`Wishlist for ${user ? user.name : "Guest"}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {wishlist.length > 0 ? (
          <List
            dataSource={wishlist}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button danger onClick={() => removeFromWishlist(item.id)}>
                    Remove
                  </Button>,
                ]}
              >
                <Typography.Text>{item.name}</Typography.Text>
              </List.Item>
            )}
          />
        ) : (
          <p>No items in wishlist.</p>
        )}
      </Modal>
    </>
  );
};

export default WishlistModal;
