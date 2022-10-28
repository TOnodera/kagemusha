import Select from '../select/Select';
interface Props {
  dataList: string[];
  placeHolderText: string;
  value?: string;
}
const HourSelect = (props: Props) => {
  return (
    <Select
      value={props.value}
      dataList={props.dataList}
      placeHolderText={props.placeHolderText}
    />
  );
};

export default HourSelect;
