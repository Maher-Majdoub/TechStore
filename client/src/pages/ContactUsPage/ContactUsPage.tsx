import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import LinksSection from "../../components/LinksSection/LinksSection";
import Navigator from "../../components/Navigator/Navigator";
import StoreInfos from "../../components/StoreInfos/StoreInfos";
import styles from "./ContactUsPage.module.css";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";

interface FormInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactUsPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormInput>();

  const sendMail: SubmitHandler<FormInput> = () => {
    reset();
    toast.success("Mail sended Successfuly! We will call you ASAP", {
      autoClose: 3000,
    });
  };

  return (
    <main className={styles.container}>
      <div className={styles.mainContent + " container"}>
        <Navigator />
        <h1 className={styles.title}>Contact Us</h1>
        <div>
          <p>We love hearing from you, our Shop customers.</p>
          <p>
            Please contact us and we will make sure to get back to you as soon
            as we possibly can.
          </p>
        </div>
        <div className={styles.flxBx}>
          <form className={styles.form} onSubmit={handleSubmit(sendMail)}>
            <TextField
              {...register("name", { required: "Please enter your name" })}
              label="Your name"
              type="text"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              {...register("email", { required: "Please enter your email" })}
              label="Your email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("phone", { required: "Please enter your phone" })}
              label="Your phone"
              type="tel"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              {...register("name", { required: "Please enter your name" })}
              label="Your Name"
              type="text"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <div className={styles.btnContainer}>
              <Button filled>Submit</Button>
            </div>
          </form>
          <StoreInfos />
        </div>
      </div>
      <LinksSection />
    </main>
  );
};

export default ContactUsPage;
