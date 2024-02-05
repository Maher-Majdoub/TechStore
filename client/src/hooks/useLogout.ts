import { useQueryClient } from "@tanstack/react-query";

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
  };

  return { logout };
};

export default useLogout;
