import styles from "./page-header.module.css";

import { MoveLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

type Props = {
  pageTitle?: string;
  showBackButton?: boolean;
  rightElement?: React.ReactNode;
  bottomElement?: React.ReactNode;

};

export function PageHeader(props: Props) {
  const navigate = useNavigate();
  return (
    <header className={styles.page_header}>
      <div className={styles.page_inner_header}>
        <div>
          {props.showBackButton && (
            <button className="button icon" onClick={() => navigate(-1)}>
              <MoveLeft />
            </button>
          )}
          <h1>{props.pageTitle}</h1>
        </div>
        {props.rightElement && <div>{props.rightElement}</div>}
      </div>

      {props.bottomElement && <div>{props.bottomElement}</div>}

    </header>
  );
}
