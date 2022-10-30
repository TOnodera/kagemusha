import style from './style.module.scss';
interface Props {
  dataList: string[];
  placeHolderText: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select = (props: Props) => {
  return (
    <select
      className={style.select}
      value={props.value}
      onChange={(e) => props.onChange(e)}
    >
      <option value="">{props.placeHolderText}</option>

      {props.dataList.map((data) => {
        return (
          <option value={data} key={data}>
            {data}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
