import { useEffect } from "react";
import { endpoints } from "../../constants";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import useSignup from "../../hooks/useSignup";
import Button from "../Button/Button";
import styles from "./styles.module.css";

interface FormInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInput>();
  const { signup, isSignupSuccess, isSignupPending } = useSignup();

  const navigate = useNavigate();

  const onSignup: SubmitHandler<FormInput> = (data) => {
    signup(data);
  };

  useEffect(() => {
    isSignupSuccess && navigate(endpoints["login"]);
  }, [isSignupSuccess]);

  return (
    <div className={styles.section}>
      <h5 className={styles.sectionTitle}>Create An Account</h5>
      <form onSubmit={handleSubmit(onSignup)} className={styles.form}>
        <span>Personal Inforamtion</span>
        <TextField
          {...register("email", { required: "Email is required" })}
          label="Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("username", { required: "Username is required" })}
          label="Username"
          type="text"
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must contains at least 8 characters",
            },
          })}
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          {...register("confirmPassword", {
            required: "Password confirmation is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
          label="Confirm Password"
          type="password"
          defaultValue=""
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <div className={styles.btnContainer}>
          <Button load={isSignupPending} filled>
            Signup
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
