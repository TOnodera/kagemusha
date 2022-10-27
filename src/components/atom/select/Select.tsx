import style from './style.module.scss';
interface Props {
  dataList: number[] | string[];
  placeHolderText: string;
}
const Select = (props: Props) => {
  return (
    <select className={style.select}>
      <option value="">{props.placeHolderText}</option>

      {props.dataList.map((data) => (
        <option value={data} key={data}>
          {data}
        </option>
      ))}
    </select>
  );
};

export default Select;
