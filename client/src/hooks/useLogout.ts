import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = () => {
    queryClient.removeQueries({ queryKey: ["auth"] });
  };

  return { logout };
};

export default useLogout;
