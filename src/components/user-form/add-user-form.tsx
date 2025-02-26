import { useUsers } from "../../hooks/use-users";
import styles from "./user-form.module.css";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";

type Props = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export function AddUserForm(props: Props) {
  const [firstName, setFirstname] = useState(props.firstName || "");
  const [lastName, setLastname] = useState(props.lastName || "");
  const [job, setJob] = useState(props.email || "");

  const {useAddUser } = useUsers()
  const addUser = useAddUser();

  const { isPending} = addUser;
  const handleSubmit = async (event) => {
    event.preventDefault();
    await addUser.mutateAsync({ firstName: firstName, lastName: lastName, job: job });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_field_group}>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstname(e.currentTarget.value)}
            disabled={isPending}
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
            disabled={isPending}
            required
          />
        </div>

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

        <button
          className={`button primary ${styles.button_submit} margin-top-1 loading`}
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <LoaderCircle className="infinispin" size={21} />
              Add user...
            </>
          ) : (
            <>Add user</>
          )}
        </button>
      </form>
    </>
  );
}
