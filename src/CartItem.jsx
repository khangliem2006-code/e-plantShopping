
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantity,
  removeItem,
} from "./CartSlice.jsx";
import "./CartItem.css";

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + Number(item.cost ?? item.price) * item.quantity,
    0
  );

  // Increase the quantity of a cart item.
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease the quantity; remove the item if it reaches zero.
  const handleDecrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity - 1,
      })
    );
  };

  // Remove a cart item by its name.
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <main className="cart-page">
      <header className="cart-header">
        <h1>🛒 Your Shopping Cart</h1>

        <button onClick={() => onNavigate("plants")}>
          Continue Shopping
        </button>
      </header>

      {cart.length === 0 ? (
        <section className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>
            Discover your favorite plants and add them to your cart!
          </p>

          <button onClick={() => onNavigate("plants")}>
            Browse Plants
          </button>
        </section>
      ) : (
        <>
          <section className="cart-container cart-list">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-details">
                  <h2>{item.name}</h2>

                  <p>
                    Unit Price: $
                    {Number(item.cost ?? item.price).toFixed(2)}
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => handleDecrement(item)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => handleIncrement(item)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <p>
                    Subtotal: $
                    {(
                      Number(item.cost ?? item.price) * item.quantity
                    ).toFixed(2)}
                  </p>

                  <button
                    className="cart-item-delete remove-button"
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </section>

          <section className="cart-summary">
            <p>Total items: {totalItems}</p>

            <h2>Total: ${totalPrice.toFixed(2)}</h2>

            <button
              className="get-started-button1"
              onClick={() =>
                alert("Thank you for shopping with us! Coming Soon.")
              }
            >
              Checkout
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default CartItem;
