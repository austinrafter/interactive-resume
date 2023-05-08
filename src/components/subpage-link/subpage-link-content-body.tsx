import styles from "./subpage-link-content-body.module.less";
interface SubpageLinkContentBodyProps {
  children: (() => React.ReactNode) | React.ReactNode;
}
export default function SubpageLinkContentBody(
  props: SubpageLinkContentBodyProps
) {
  const children =
    typeof props.children === "function" ? props.children() : props.children;

  return (
    <div className={styles.root}>
      <div className={styles.innerWrapper}>{children}</div>
    </div>
  );
}
