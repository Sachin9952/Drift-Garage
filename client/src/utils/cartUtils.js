export const getCart = () => {
  const cart = localStorage.getItem('drift_garage_cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.product._id === product._id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
      },
      quantity
    });
  }

  localStorage.setItem('drift_garage_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdate'));
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const newCart = cart.filter(item => item.product._id !== productId);
  localStorage.setItem('drift_garage_cart', JSON.stringify(newCart));
  window.dispatchEvent(new Event('cartUpdate'));
};

export const updateCartQuantity = (productId, quantity) => {
  if (quantity < 1) return;
  const cart = getCart();
  const item = cart.find(item => item.product._id === productId);
  if (item) {
    item.quantity = quantity;
  }
  localStorage.setItem('drift_garage_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdate'));
};

export const clearCart = () => {
  localStorage.removeItem('drift_garage_cart');
  window.dispatchEvent(new Event('cartUpdate'));
};
