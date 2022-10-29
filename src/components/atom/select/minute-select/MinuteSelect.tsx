import Select from '../select/Select';
interface Props {
  dataList: string[];
  placeHolderText: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const MinuteSelect = (props: Props) => {
  return (
    <Select
      value={props.value}
      dataList={props.dataList}
      placeHolderText={props.placeHolderText}
      onChange={props.onChange}
    />
  );
};

export default MinuteSelect;
