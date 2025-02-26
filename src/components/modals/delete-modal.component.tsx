import { LoaderCircle } from "lucide-react";
import styles from "./delete-modal.module.css";

import { useEffect, useRef } from "react";
import { useUsers } from "../../hooks/use-users";

type Props = {
  open?: boolean;
  closeModal: () => void;
  userId: number;
};

export function DeleteModal({ open, closeModal, userId }: Props) {
  const ref = useRef(null);

  const { useDeleteUser } = useUsers()

  const deleteUser = useDeleteUser(userId);

  const { isPending } = deleteUser;

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog ref={ref} onCancel={closeModal}>
      <div className={styles.delete_dialog_content}>
        <div>
          <h5 className="text-error">Delete User - {userId}</h5>

          <p>
            Are you sure you want to delete this account?{" "}
            <strong>This action cannot be undone.</strong>
          </p>
        </div>

        <div className={styles.delete_dialog_footer}>
          <button className="button" onClick={closeModal}>
            Cancel
          </button>

          <button
            className="button loading error"
            disabled={isPending}
            onClick={() => deleteUser.mutateAsync()}
          >
            {isPending ? (
              <>
                <LoaderCircle className="infinispin" size={21} />
                Deleting...
              </>
            ) : (
              <>Delete account</>
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}
