import { useCallback, useEffect, useMemo, useState } from "react";

function useCart({ navigateTo, placeholderImage, session, showAlert }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCartItems = localStorage.getItem("tokoHappyCartItems");
    setCartItems(savedCartItems ? JSON.parse(savedCartItems) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("tokoHappyCartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const memberCartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const cartTotalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleMemberAddProduct = useCallback(
    (product) => {
      if (session?.role !== "member") {
        showAlert("Login dulu sebagai member untuk menambahkan product ke keranjang.", "error");
        navigateTo("login");
        return;
      }

      setCartItems((current) => {
        const existingItem = current.find((item) => item.id === product.id);

        if (existingItem) {
          return current.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }

        return [
          ...current,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images?.[0] || placeholderImage,
            quantity: 1,
          },
        ];
      });

      showAlert(`${product.title} berhasil ditambahkan ke keranjang.`);
    },
    [navigateTo, placeholderImage, session, showAlert]
  );

  const handleRemoveCartItem = useCallback(
    (productId) => {
      setCartItems((current) => current.filter((item) => item.id !== productId));
      showAlert("Product dihapus dari keranjang.");
    },
    [showAlert]
  );

  const toggleCart = useCallback(() => {
    setIsCartOpen((current) => !current);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setIsCartOpen(false);
  }, []);

  return {
    cartItems,
    cartTotalPrice,
    clearCart,
    closeCart,
    handleMemberAddProduct,
    handleRemoveCartItem,
    isCartOpen,
    memberCartCount,
    setCartItems,
    toggleCart,
  };
}

export default useCart;
