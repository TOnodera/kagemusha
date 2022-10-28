import style from './style.module.scss';
interface Props {
  onClick: () => void;
}

const AddButton = (props: Props) => {
  return (
    <div className={style.scheduleCard}>
      <div className={style.addButtonWrapper}>
        <div className={style.addButton} onClick={props.onClick}>
          +
        </div>
      </div>
    </div>
  );
};

export default AddButton;
