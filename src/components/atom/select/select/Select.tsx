import style from './style.module.scss';
interface Props {
  dataList: string[];
  placeHolderText: string;
  value?: string;
}
const Select = (props: Props) => {
  return (
    <select className={style.select}>
      <option value="">{props.placeHolderText}</option>

      {props.dataList.map((data) => {
        return (
          <option value={data} key={data} selected={props.value === data}>
            {data}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
