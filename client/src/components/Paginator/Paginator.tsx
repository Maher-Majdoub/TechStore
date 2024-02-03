import { ReactNode } from "react";
import styles from "./Paginator.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface Props {
  children: ReactNode;
  total: number;
  pageSize: number;
  page: number;
  onChangePage(page: number): void;
}

const Paginator = ({
  children,
  total,
  pageSize,
  page,
  onChangePage,
}: Props) => {
  const pagesCount = Math.ceil(total / pageSize);
  return (
    <div>
      {children}
      <div className={styles.pagination}>
        <div>
          {page !== 1 && (
            <button
              className={styles.pageSelector}
              hidden={page === 1}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onChangePage(page - 1);
              }}
            >
              <FaChevronLeft />
            </button>
          )}
          {Array.from({ length: pagesCount }, (_, index) => (
            <button
              key={index}
              className={`${styles.pageSelector} ${
                page === index + 1 ? styles.selected : ""
              }`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onChangePage(index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
          {page !== pagesCount && (
            <button
              className={styles.pageSelector}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onChangePage(page + 1);
              }}
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paginator;
