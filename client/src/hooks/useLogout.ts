import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = () => {
    queryClient.setQueryData(["auth"], {});
    queryClient.resetQueries({ queryKey: ["customer"] });
    queryClient.removeQueries({ queryKey: ["customer"] });
    queryClient.resetQueries({ queryKey: ["orders"] });
    queryClient.removeQueries({ queryKey: ["orders"] });
    queryClient.resetQueries({ queryKey: ["wishes"] });
    queryClient.removeQueries({ queryKey: ["wishes"] });
    toast.success("Logout Successful");
  };

  return { logout };
};

export default useLogout;
