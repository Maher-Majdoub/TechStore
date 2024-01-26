import { Swiper, SwiperSlide } from "swiper/react";
import { ProductInfo } from "../../hooks/useProducts";
import { Pagination } from "swiper/modules";
import styles from "./ProductInfoSeciton.module.css";

interface Props {
  infos: ProductInfo[];
}

const ProductInfoSection = ({ infos }: Props) => {
  return (
    <div className={styles.container + " container"}>
      <Swiper pagination modules={[Pagination]}>
        {infos.map((info) => (
          <SwiperSlide>
            <div className={styles.content}>
              <div className={styles.notes}>
                <h3 className={styles.title}>{info.title}</h3>
                <p className={styles.description}>{info.description}</p>
              </div>
              <div
                className={styles.imgContainer}
                style={{ backgroundImage: `url(${info.image})` }}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductInfoSection;
