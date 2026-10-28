import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "./CartSlice.jsx";
import "./CartItem.css";

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <header className="cart-header">
        <h1>🛒 Your Shopping Cart</h1>
        <button onClick={() => onNavigate("plants")}>
          Continue Shopping
        </button>
      </header>

      {items.length === 0 ? (
        <section className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Discover your favorite plants and add them to your cart!</p>
          <button onClick={() => onNavigate("plants")}>
            Browse Plants
          </button>
        </section>
      ) : (
        <>
          <section className="cart-list">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>${item.price.toFixed(2)} each</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>

                  <p>
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="remove-button"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <section className="cart-summary">
            <p>Total items: {totalItems}</p>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button onClick={() => alert("Thank you for shopping with us!")}>
              Checkout
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default CartItem;