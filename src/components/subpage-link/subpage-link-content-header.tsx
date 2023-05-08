import styles from "./subpage-link-content-header.module.less";

interface SubpageLinkHeaderProps {
  handleClose: () => void;
  children: (() => React.ReactNode) | React.ReactNode;
}
export default function SubpageLinkContentHeader(
  props: SubpageLinkHeaderProps
) {
  return (
    <div className={styles.root}>
      <a onClick={props.handleClose}>Close [X]</a>
    </div>
  );
}
