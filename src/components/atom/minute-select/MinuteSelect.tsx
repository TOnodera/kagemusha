import Select from '../select/Select';
import style from './style.module.scss';
interface Props {
  dataList: number[];
  placeHolderText: string;
}
const MinuteSelect = (props: Props) => {
  return (
    <Select dataList={props.dataList} placeHolderText={props.placeHolderText} />
  );
};

export default MinuteSelect;