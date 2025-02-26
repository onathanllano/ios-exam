import placeholder from "../../assets/placeholder.png";

type Props = {
  className?: string;
  src?: string;
  alt?: string;
};

export const Avatar = (props: Props) => (
  <img
    className={props.className}
    src={props.src || placeholder}
    alt={props.alt || "Image"}
  />
);
