import styles from "./user-profile.module.css";

import { useLocation, useParams } from "react-router";
import { useUsers } from "../../hooks/use-users";
import { UserForm } from "../../components/user-form/user-form.component";
import { PageHeader } from "../../components/page-header/page-header.component";
import { Avatar } from "../../components/avatar/avatar.component";

export function UserProfile() {
  const { state } = useLocation();

  let params = useParams();

  const { useGetUser } = useUsers();
  const { data, isLoading } = useGetUser(
    params.userId,
    state.createdAt === undefined
  );

  if (isLoading)
    return (
      <>
        <span className="loader"></span>
      </>
    );

  return (
    <>
      <PageHeader
        showBackButton
        bottomElement={
          <div className={styles.user_details}>
            <div>
              <Avatar
                className={styles.avatar}
                src={data?.data.avatar}
                alt={`${data?.data.first_name || state.first_name} ${
                  data?.data.last_name || state.last_name
                }`}
              />
            </div>

            <div>
              <h3>{`${data?.data.first_name || state.first_name} ${
                data?.data.last_name || state.last_name
              }`}</h3>
              <p className="text-secondary">
                {data?.data.email || state.email}
              </p>
            </div>
          </div>
        }
      />

      <UserForm
        firstName={data?.data.first_name || state.first_name}
        lastName={data?.data.last_name || state.last_name}
        email={data?.data.email || state.email}
        userId={parseInt(params.userId)}
        createdAt={state.createdAt}
      />
    </>
  );
}
