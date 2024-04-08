import styles from "./styles.module.css";
import useCustomer from "../../hooks/useCustomer";
import { SubmitHandler, useForm } from "react-hook-form";
import { CircularProgress, TextField } from "@mui/material";
import { useEffect } from "react";

interface FormInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordForm = () => {
  const {
    changePassword,
    isChangingPasswordSuccess,
    isChangingPasswordPending,
    isChangingPasswordError,
    changingPasswordError,
  } = useCustomer();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    if (isChangingPasswordError) {
      const e = changingPasswordError?.response.data;
      e?.current_password &&
        setError("currentPassword", { message: e.current_password[0] });
      e?.new_password &&
        setError("newPassword", { message: e.new_password[0] });
    }
  }, [changingPasswordError]);

  useEffect(() => {
    if (isChangingPasswordSuccess) reset();
  }, [isChangingPasswordSuccess]);

  const handleChangePassword: SubmitHandler<FormInput> = (data) => {
    changePassword(data);
  };

  return (
    <>
      <h4>Change Password</h4>
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className={styles.form}
      >
        <TextField
          {...register("currentPassword", {
            required: "This field is required",
          })}
          label="Current password"
          type="password"
          autoComplete="current-password"
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
          fullWidth
        />
        <TextField
          {...register("newPassword", { required: "This field is required" })}
          label="New Password"
          type="password"
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          fullWidth
        />
        <TextField
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("newPassword") || "Passwords do not match",
          })}
          label="Confirm password"
          type="password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
        />
        <div className={styles.btnContainer}>
          {isChangingPasswordPending ? (
            <span className={styles.link}>
              Changing Password <CircularProgress size={15} color="inherit" />
            </span>
          ) : (
            <button className={styles.link}>Change Password</button>
          )}
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;
