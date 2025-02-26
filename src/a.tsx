import { useGetUsers } from "./hooks/use-users";

export function A() {
  const { data, isLoading } = useGetUsers(1)


  console.log(data, isLoading)




  return <p>yellow</p>





}