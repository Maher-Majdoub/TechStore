import { useEffect } from "react";
import useCustomer from "../../hooks/useCustomer";
import styles from "./styles.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { CircularProgress, TextField } from "@mui/material";

interface FormInput {
  currentPassword: string;
  newUsername: string;
}

const ChangeUserNameForm = () => {
  const {
    changeUsername,
    isChangingUsernameSuccess,
    isChangingUsernamePending,
    isChangingUsernameError,
    changingUsernameError,
  } = useCustomer();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormInput>();

  const handleChangeUserName: SubmitHandler<FormInput> = (data) => {
    changeUsername(data);
  };

  useEffect(() => {
    if (isChangingUsernameError) {
      const e = changingUsernameError?.response.data;
      e?.current_password &&
        setError("currentPassword", { message: e.current_password[0] });
      !e?.current_password &&
        e?.new_username &&
        setError("newUsername", { message: e.new_username[0] });
    }
  }, [isChangingUsernameError]);

  useEffect(() => {
    isChangingUsernameSuccess && reset();
  }, [isChangingUsernameSuccess]);

  return (
    <>
      <h4>Change Username</h4>
      <form
        onSubmit={handleSubmit(handleChangeUserName)}
        className={styles.form}
      >
        <TextField
          {...register("currentPassword", {
            required: "This field is required",
          })}
          label="Current password"
          type="password"
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
          fullWidth
        />
        <TextField
          {...register("newUsername", { required: "This field is required" })}
          label="New username"
          type="text"
          error={!!errors.newUsername}
          helperText={errors.newUsername?.message}
          fullWidth
        />
        <div className={styles.btnContainer}>
          {isChangingUsernamePending ? (
            <span className={styles.link}>
              Changing Username <CircularProgress size={15} color="inherit" />
            </span>
          ) : (
            <button className={styles.link}>Change Username</button>
          )}
        </div>
      </form>
    </>
  );
};

export default ChangeUserNameForm;
