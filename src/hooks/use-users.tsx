import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const USERS_URL = import.meta.env.VITE_API_REQRES_USERS_URL;

export function useUsers() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function useGetUsers(page?: number) {
    return useQuery({
      queryKey: ["users"],
      queryFn: async () =>
        await fetch(`${USERS_URL}?page=${page}`, { method: "GET" }).then(
          (res) => res.json()
        ),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });
  }

  function useGetUser(userId: number, enabled: boolean) {
    return useQuery({
      queryKey: ["user", userId],
      queryFn: async () =>
        await fetch(`${USERS_URL}/${userId}`, { method: "GET" }).then((res) =>
          res.json()
        ),
      enabled: enabled,
    });
  }

  function useAddUser() {
    return useMutation({
      mutationFn: (values: {
        firstName: string;
        lastName: string;
        job: string;
      }) =>
        fetch(`${USERS_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${values.firstName} ${values.lastName}`,
            job: values.job,
          }),
        }).then((res) => res.json()),
      onSuccess: (data) => {
        toast.success("User added!", { description: JSON.stringify(data) });

        const splitName = data.name.split(" ");

        queryClient.setQueryData(["users"], (old) => {
          return {
            ...old,
            data: [
              {
                id: parseInt(data.id),
                first_name: splitName[0],
                last_name: splitName[1],
                email: data.job,
                createdAt: data.createdAt,
              },
              ...old.data,
            ],
          };
        });

        navigate("/");
      },
      onError: () => {
        toast.error("An error has occured.");
      },
    });
  }

  function useUpdateUser(userId: number) {
    return useMutation({
      mutationFn: (values: {
        firstName: string;
        lastName: string;
        job: string;
      }) =>
        fetch(`${USERS_URL}/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${values.firstName} ${values.lastName}`,
            job: values.job,
          }),
        }).then((res) => res.json()),
      onSuccess: (data) => {
        toast.success("User updated!", { description: JSON.stringify(data) });

        const splitName = data.name.split(" ");

        queryClient.setQueryData(["users"], (old) => {
          return {
            ...old,
            data: old.data.map((d) => {
              if (d.id === userId) {
                return {
                  ...d,
                  first_name: splitName[0],
                  last_name: splitName[1],
                  email: data.job,
                };
              } else {
                return d;
              }
            }),
          };
        });

        navigate("/");
      },
      onError: () => {
        toast.error("An error has occured.");
      },
    });
  }

  function useDeleteUser(userId: number) {
    const navigate = useNavigate();
    return useMutation({
      mutationFn: async () =>
        await fetch(`${USERS_URL}/${userId}`, {
          method: "DELETE",
        }),
      onSuccess: (data) => {
        toast.success("User removed!");

        queryClient.setQueryData(["users"], (old) => {
          console.log(old.data.findIndex(({ id }) => id === userId));
          return {
            ...old,
            data: old.data.filter((item) => {
              if (item.id !== userId) {
                console.log(item.id, userId);
              }
              return item.id !== userId;
            }),
          };
        });

        navigate("/");
      },
      onError: () => {
        toast.error("An error has occured.");
      },
    });
  }

  return {
    useGetUsers,
    useGetUser,
    useAddUser,
    useUpdateUser,
    useDeleteUser,
  };
}
