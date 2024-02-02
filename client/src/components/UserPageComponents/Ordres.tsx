import UseOrder from "../../hooks/useOrder";
import styles from "./styles.module.css";

const Ordres = () => {
  const { orders } = UseOrder();
  return (
    <>
      {orders && (
        <div className={styles.container}>
          <div>
            <div className={styles.titleContainer}>
              <h2>My Orders</h2>
            </div>
            <div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Date</th>
                    <th>Subtotal</th>
                    <th>Status</th>
                    <th>Paymment Method</th>
                    <th>Payment Status</th>
                    <th>Shipping Method</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.results.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>$5550</td>
                      <td>{order.status}</td>
                      <td>{order.payment_method}</td>
                      <td>{order.payment_status}</td>
                      <td>{order.shipping_method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default Ordres;
