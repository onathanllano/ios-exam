import { MoveLeft } from "lucide-react";
import { PageHeader } from "../../components/page-header/page-header.component";
import { AddUserForm } from "../../components/user-form/add-user-form";

export function NewUser() {
  return (
    <>
      <PageHeader pageTitle="Add new user" showBackButton />
      <AddUserForm />
    </>
  );
}
