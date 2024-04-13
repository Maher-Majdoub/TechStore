import { Product } from "../../hooks/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import styles from "./ProductImagesDisplayer.module.css";
import noProductImage from "../../assets/noProductImage.png";

import "swiper/css";
import "swiper/css/pagination";

interface Props {
  product: Product;
}

const ProductImagesDisplayer = ({ product }: Props) => {
  return (
    <div className={styles.container}>
      {product.images.length > 0 ? (
        <Swiper
          slidesPerView={1}
          pagination={{
            enabled: true,
            clickable: true,
          }}
          modules={[Pagination]}
          className={styles.swiper}
        >
          {product.images.map((image) => (
            <SwiperSlide key={image.id}>
              <img src={image.image} className={styles.img} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={
            product.images.length > 0 ? product.images[0].image : noProductImage
          }
        ></img>
      )}
    </div>
  );
};

export default ProductImagesDisplayer;
