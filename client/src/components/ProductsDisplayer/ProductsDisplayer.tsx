import { Product } from "../../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./ProductsDisplayer.module.css";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";

const ProductsDisplayer = ({
  products,
  maxCards = 6,
}: {
  products?: Product[];
  maxCards?: number;
}) => {
  const fakeProds = [1, 2, 3, 4, 5, 6, 7];
  return (
    <Swiper
      className={styles.swiper}
      modules={[Navigation, Autoplay]}
      slidesPerView={maxCards}
      spaceBetween={15}
      navigation
      autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: maxCards - 4 > 0 ? maxCards - 4 : 1,
        },
        768: {
          slidesPerView: maxCards - 3 > 0 ? maxCards - 3 : 1,
        },
        1024: {
          slidesPerView: maxCards - 2 > 0 ? maxCards - 2 : 1,
        },
        1200: {
          slidesPerView: maxCards - 1 > 0 ? maxCards - 1 : 1,
        },
        1450: {
          slidesPerView: maxCards,
        },
      }}
    >
      {products
        ? products.map((prod) => (
            <SwiperSlide key={`${prod.id}-${Math.random()}`}>
              <ProductCard product={prod} />
            </SwiperSlide>
          ))
        : fakeProds.map((prod) => (
            <SwiperSlide key={`${prod}-${Math.random()}`}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default ProductsDisplayer;
