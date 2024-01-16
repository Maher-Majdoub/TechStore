import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  if (!productId) {
    navigate("/Eror Page");
    return;
  }

  const { data: product, isLoading, error } = useProduct(parseInt(productId));

  if (error) return <h1>Cant fetch product</h1>;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <main>
        <nav>
          <div>
            <button>About Product</button>
            <button>Details</button>
            <button>Specs</button>
          </div>
          <div>
            <div>
              <span>On Sale from</span>
              <span>{product?.unit_price}</span>
            </div>
            <button>Add to Cart</button>
          </div>
        </nav>
        <div>
          <div>
            <h4>{product?.name}</h4>
            <ul>
              {product?.configurations.map((conf) => (
                <li key={conf.id}>
                  <span>{conf.variation}</span>
                  <span>{conf.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetailsPage;
