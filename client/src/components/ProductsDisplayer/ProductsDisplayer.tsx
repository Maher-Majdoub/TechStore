import useProducts from "../../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./ProductsDisplayer.module.css";

const ProductsDisplayer = () => {
  const { data, isLoading, error } = useProducts();

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {isLoading && <p>Loading....</p>}
      <Swiper
        className={styles.swiper}
        modules={[Navigation, Autoplay]}
        slidesPerView={6}
        spaceBetween={15}
        navigation
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {data?.results.map((prod) => (
          <SwiperSlide key={prod.id}>
            <ProductCard product={prod} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductsDisplayer;
