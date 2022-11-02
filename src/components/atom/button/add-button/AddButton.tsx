import style from './style.module.scss';

interface Props {
  backgroundColor?: string;
}
const AddButton = (props: Props) => {
  const backgroundColor = props.backgroundColor ?? '#777ee3';
  return (
    <div className={style.scheduleCard}>
      <div className={style.addButtonWrapper}>
        <div className={style.addButton} style={{ backgroundColor }}>
          +
        </div>
      </div>
    </div>
  );
};

export default AddButton;
