import styles from "./styles.module.css";
import useCustomer, { Address } from "../../hooks/useCustomer";
import { SubmitHandler, useForm } from "react-hook-form";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import Button from "../Button/Button";

interface Props {
  afterSubmition(): void;
  address?: Address;
}

const AddEditAddress = ({ afterSubmition, address }: Props) => {
  const { addAddress, editAddress } = useCustomer();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>({ defaultValues: address });

  const handleSubmition: SubmitHandler<Address> = (data) => {
    address
      ? editAddress({ id: address.id || -1, newAddress: data })
      : addAddress(data);
    afterSubmition();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleSubmition)}>
        <div className={styles.forms}>
          <div className={styles.fullWidth}>
            <div className={styles.titleContainer}>
              <h2>Contact Information</h2>
            </div>
            <div className={styles.form}>
              <TextField
                {...register("first_name", {
                  required: "This field is required",
                })}
                label="First name"
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
              <TextField
                {...register("last_name", {
                  required: "This field is required",
                })}
                label="Last name"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
              <TextField {...register("company")} label="Company" />
              <TextField
                {...register("phone_number", {
                  required: "This field is required",
                })}
                label="Phone nubmer"
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
              />
            </div>
          </div>
          <div className={styles.fullWidth}>
            <div className={styles.titleContainer}>
              <h2>Address</h2>
            </div>
            <div className={styles.form}>
              <TextField
                {...register("address", { required: "This field is required" })}
                label="Address"
                error={!!errors.address}
                helperText={errors.address?.message}
              />
              <TextField
                {...register("country", { required: "This field is required" })}
                label="Country"
                error={!!errors.country}
                helperText={errors.country?.message}
              />
              <TextField
                {...register("state", { required: "This field is required" })}
                label="State"
                error={!!errors.state}
                helperText={errors.state?.message}
              />
              <TextField
                {...register("city", { required: "This field is required" })}
                label="City"
                error={!!errors.city}
                helperText={errors.city?.message}
              />
              <TextField
                {...register("region", { required: "This field is required" })}
                label="Region"
                error={!!errors.region}
                helperText={errors.region?.message}
              />
              <TextField
                {...register("street_number", {
                  required: "This field is required",
                })}
                label="Street number"
                error={!!errors.street_number}
                helperText={errors.street_number?.message}
              />
              <TextField
                {...register("postal_code", {
                  required: "This field is required",
                })}
                label="Postal code"
                error={!!errors.postal_code}
                helperText={errors.postal_code?.message}
              />
              <TextField
                {...register("description")}
                label="Description"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("is_default_billing_address")}
                    defaultChecked={address?.is_default_billing_address}
                  />
                }
                label="Use as default billing address"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("is_default_shipping_address")}
                    defaultChecked={address?.is_default_shipping_address}
                  />
                }
                label="Use as default shipping address"
              />
            </div>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button>Save Address</Button>
        </div>
      </form>
    </div>
  );
};

export default AddEditAddress;
