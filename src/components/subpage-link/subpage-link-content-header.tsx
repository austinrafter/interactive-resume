import styles from "./subpage-link-content-header.module.less";

interface SubpageLinkHeaderProps {
  handleClose: () => void;
  handleBack: () => void;
  handleForward: () => void;
  prevPageLocation: string;
  children: (() => React.ReactNode) | React.ReactNode;
}
export default function SubpageLinkContentHeader(
  props: SubpageLinkHeaderProps
) {
  return (
    <div className={styles.root}>
      <div className={styles.arrows}>
        {/*{props.prevPageLocation != "/" && (*/}
        <a onClick={props.handleBack}>Back </a>
        {/*)}*/}
        <a onClick={props.handleForward}>Forward </a>
      </div>
      <div className={styles.close}>
        <a onClick={props.handleClose}>Close [X]</a>
      </div>
    </div>
  );
}
