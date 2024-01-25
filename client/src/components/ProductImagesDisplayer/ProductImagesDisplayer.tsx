import { Product } from "../../hooks/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import styles from "./ProductImagesDisplayer.module.css";

import "swiper/css";
import "swiper/css/pagination";

interface Props {
  product: Product;
}

const ProductImagesDisplayer = ({ product }: Props) => {
  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default ProductImagesDisplayer;
