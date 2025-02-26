import { Link } from "react-router";

import { useUsers } from "../../hooks/use-users";
import styles from "./users-list.module.css";

import { ChevronRight } from "lucide-react";

import placeholder from "../../assets/placeholder.png";
import { Avatar } from "../avatar/avatar.component";

export function UsersList() {
  const { useGetUsers } = useUsers();
  const { data, isLoading } = useGetUsers(1);

  return (
    <div>
      <ul className={styles.users_list}>
        {isLoading ? (
          <>
             <li><ListSkeleton /></li>
          <li><ListSkeleton /></li>
          <li><ListSkeleton /></li>
          </>
       

        ) : (
          <>
            {data?.data?.map((user) => (
              <li>
                <Link
                  to={`user/${user.id}`}
                  className={styles.list_link}
                  state={user}
                >
                  <div className={styles.user_details}>
                    <Avatar
                      className={styles.user_avatar}
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                    />

                    <div className={styles.user_info}>
                      <h5>{`${user.first_name} ${user.last_name}`}</h5>

                      <p className="sm text-secondary">{user.email}</p>
                    </div>
                  </div>

                  <ChevronRight />
                </Link>

              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}

const ListSkeleton = () => (
  <div className={styles.list_link_skeleton}>
    <div className={styles.user_details}>
      <div className={styles.skeleton_image}></div>

      <div className={styles.user_info}>
        <div className={styles.skeleton}></div>
        <div className={styles.skeleton}></div>
      </div>
    </div>
  </div>
);
