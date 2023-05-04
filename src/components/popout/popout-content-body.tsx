import styles from "./popout-content-body.module.less";
interface PopoutContentBodyProps {
  children: (() => React.ReactNode) | React.ReactNode;
}
export default function PopoutContentBody(props: PopoutContentBodyProps) {
  const children =
    typeof props.children === "function" ? props.children() : props.children;

  return (
    <div className={styles.root}>
      <div className={styles.innerWrapper}>{children}</div>
    </div>
  );
}
