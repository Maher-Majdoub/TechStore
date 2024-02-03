import { useRef } from "react";
import useCustomer from "../../hooks/useCustomer";
import styles from "./styles.module.css";

const ChangePersonalInfosForm = () => {
  const {
    customer,
    changePersonalInfos,
    isChangingPersonalInfosSuccess,
    isChangingPersonalInfosPending,
    isChangingPersonalInfosError,
  } = useCustomer();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);

  const handleChangePersonalInfos = () => {
    if (
      firstNameRef.current &&
      lastNameRef.current &&
      phoneRef.current &&
      birthDateRef.current
    ) {
      changePersonalInfos({
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        phone: phoneRef.current.value,
        birth_date: birthDateRef.current.value,
      });
    }
  };

  if (isChangingPersonalInfosSuccess) console.log("personal infos changed");
  if (isChangingPersonalInfosError)
    console.error("error while changing personal infos");

  return (
    <>
      {customer && (
        <>
          <h4>Change Personal Infos</h4>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleChangePersonalInfos();
            }}
          >
            <div className={styles.inputGroups}>
              <div className={styles.inputGroup}>
                <span>First Name</span>
                <input
                  ref={firstNameRef}
                  type="text"
                  defaultValue={customer.first_name}
                />
              </div>
              <div className={styles.inputGroup}>
                <span>Last Name</span>
                <input
                  ref={lastNameRef}
                  type="text"
                  defaultValue={customer.last_name}
                />
              </div>
              <div className={styles.inputGroup}>
                <span>Phone</span>
                <input
                  ref={phoneRef}
                  type="text"
                  defaultValue={customer.phone}
                />
              </div>
              <div className={styles.inputGroup}>
                <span>Birth Date</span>
                <input
                  ref={birthDateRef}
                  type="date"
                  defaultValue={customer.birth_date}
                />
              </div>
            </div>
            {isChangingPersonalInfosPending && (
              <span>changing personal infos....</span>
            )}
            <div className={styles.btnContainer}>
              <button className={styles.link}>Change Personal Infos</button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default ChangePersonalInfosForm;
