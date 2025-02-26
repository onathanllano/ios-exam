import { useParams } from "react-router";
import { useUsers } from "../../hooks/use-users";
import { DeleteModal } from "../modals/delete-modal.component";
import styles from "./user-form.module.css";

import { useState } from "react";

type Props = {
  firstName?: string;
  lastName?: string;
  email?: string;
  userId?: number;
  createdAt?: string;
};

export function UserForm(props: Props) {
  const [openModal, setOpenModal] = useState(false);

  const [firstName, setFirstname] = useState(props.firstName || "");
  const [lastName, setLastname] = useState(props.lastName || "");
  const [email, setEmail] = useState(props.email || "");
  const [job, setJob] = useState(props.email || "");

  const { useUpdateUser } = useUsers();
  const updateUser = useUpdateUser(props.userId!!);

  const { isPending } = updateUser;

  const handleSubmit = (event) => {
    event.preventDefault();

    updateUser.mutateAsync({
      firstName: firstName,
      lastName: lastName,
      job: job,
    });
  };

  console.log(props.createdAt);

  return (
    <>
      <DeleteModal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        userId={props.userId}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h4>User Information</h4>
        <div className={`${styles.form_group} border-top`}>
          <div className={styles.form_field_group}>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstname(e.currentTarget.value)}
              disabled={isPending || props.createdAt === undefined}
              required
            />
          </div>

          <div className={styles.form_field_group}>
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastname(e.currentTarget.value)}
              disabled={isPending || props.createdAt === undefined}
              required
            />
          </div>
        </div>

        {props.createdAt !== undefined ? (
          <div className={styles.form_group}>
            <div className={styles.form_field_group}>
              <label htmlFor="job">Job</label>
              <input
                type="text"
                name="job"
                value={job}
                onChange={(e) => setJob(e.currentTarget.value)}
                disabled={isPending}
                required
              />

            </div>
          </div>
        ) : (
          <div className={styles.form_group}>
            <div className={styles.form_field_group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                disabled={isPending || props.createdAt === undefined}
                required
              />

            </div>
          </div>
        )}

        {props.createdAt !== undefined && (
          <button
            className={`button primary ${styles.button_submit} margin-top-1`}
            type="submit"
            disabled={isPending}
          >
            Add user
          </button>
        )}
      </form>

      {props.createdAt !== undefined && (
        <div>
          <h4 className="text-error margin-top-1">Delete user</h4>

          <div className="border-top">
            <p className="margin-top-1">
              Deleting this account will be permanent.
            </p>

            <button
              className="button error outline margin-top-1"
              onClick={() => setOpenModal(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </>
  );
}
