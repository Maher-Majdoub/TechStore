import { useEffect } from "react";
import useCustomer from "../../hooks/useCustomer";
import styles from "./styles.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { CircularProgress, TextField } from "@mui/material";

interface FormInput {
  first_name: string;
  last_name: string;
  phone: string;
  birth_date: string;
}

const ChangePersonalInfosForm = () => {
  const {
    customer,
    changePersonalInfos,
    isChangingPersonalInfosSuccess,
    isChangingPersonalInfosPending,
    isChangingPersonalInfosError,
    changingPersonalInfosError,
  } = useCustomer();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      first_name: customer?.first_name,
      last_name: customer?.last_name,
      phone: customer?.phone,
      birth_date: customer?.birth_date,
    },
  });

  const handleChangePersonalInfos: SubmitHandler<FormInput> = (data) => {
    changePersonalInfos(data);
  };

  useEffect(() => {
    isChangingPersonalInfosSuccess && reset();
  }, [isChangingPersonalInfosSuccess]);

  useEffect(() => {
    const e = changingPersonalInfosError?.response.data;
    e?.first_name && setError("first_name", { message: e.first_name[0] });
    e?.last_name && setError("last_name", { message: e.last_name[0] });
    e?.phone && setError("phone", { message: e.phone[0] });
    e?.birth_date && setError("birth_date", { message: e.birth_date[0] });
  }, [isChangingPersonalInfosError]);

  return (
    <>
      {customer && (
        <>
          <h4>Change Personal Infos</h4>
          <form
            onSubmit={handleSubmit(handleChangePersonalInfos)}
            className={styles.form}
          >
            <TextField
              {...register("first_name", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Please enter a valid name",
                },
                validate: (value) => {
                  if (value.trim().length < 4)
                    return "Name must contain at least 4 characters";
                  if (value.trim().length > 15)
                    return "Name cant have more than 15 characters";
                  return true;
                },
              })}
              label="First name"
              type="text"
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
            <TextField
              {...register("last_name", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Please enter a valid name",
                },
                validate: (value) => {
                  if (value.trim().length < 4)
                    return "Name must contain at least 4 characters";
                  if (value.trim().length > 15)
                    return "Name cant have more than 15 characters";
                  return true;
                },
              })}
              label="Last name"
              type="text"
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
            <TextField
              {...register("phone", {
                required: "This field is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a valid phone number",
                },
                minLength: {
                  value: 8,
                  message: "Phone number must have at least 8 digits",
                },
                maxLength: {
                  value: 15,
                  message: "Phone number cant have more than 15 digits",
                },
              })}
              label="Phone"
              type="tel"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              {...register("birth_date", {
                required: "This field is required",
                validate: (value) => {
                  const year = new Date(value).getFullYear();
                  const curr_year = new Date().getFullYear();
                  const age = curr_year - year;
                  if (age < 13) return "Age must be at least 13 yo";
                  if (age > 90) return "Khouya Daynasour??";
                  return true;
                },
              })}
              label="Birth date"
              type="date"
              error={!!errors.birth_date}
              helperText={errors.birth_date?.message}
            />
            <div className={styles.btnContainer}>
              {isChangingPersonalInfosPending ? (
                <span className={styles.link}>
                  Changing Personal Infos{" "}
                  <CircularProgress size={15} color="inherit" />
                </span>
              ) : (
                <button className={styles.link}>Change Personal Infos</button>
              )}
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default ChangePersonalInfosForm;
