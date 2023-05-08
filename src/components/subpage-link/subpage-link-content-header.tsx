import styles from "./subpage-link-content-header.module.less";

interface PopoutContentHeaderProps {
  handleClose: () => void;
  children: (() => React.ReactNode) | React.ReactNode;
}
export default function SubpageLinkContentHeader(
  props: PopoutContentHeaderProps
) {
  return (
    <div className={styles.root}>
      <a onClick={props.handleClose}>Close [X]</a>
    </div>
  );
}
