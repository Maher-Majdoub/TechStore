import Error from "./Error";

const ServerError = () => {
  return (
    <Error
      title="Oops! Something Went Wrong."
      content="It looks like there's an issue with our server. Please try again later."
    />
  );
};

export default ServerError;
