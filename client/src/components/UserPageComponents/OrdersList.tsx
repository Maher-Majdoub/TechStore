import UseOrder from "../../hooks/useOrder";
import styles from "./styles.module.css";

const OrdersList = () => {
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
                  </tr>
                </thead>
                <tbody>
                  {orders.results.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>{order.status}</td>
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

export default OrdersList;
