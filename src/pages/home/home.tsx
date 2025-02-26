import { Link } from "react-router";
import { UsersList } from "../../components/users-list/users-list.component";
import { PageHeader } from "../../components/page-header/page-header.component";

export const Home = () => (
  <>
    <PageHeader
      pageTitle="Users"
      rightElement={
        <Link className="button primary" to="new-user">
          Create new user
        </Link>
      }
    />

    <UsersList />
  </>
);
