import BasicButton from '../basic-button/BasicButton';
import style from './style.module.scss';
interface Props {
  text: string;
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
}
const ErrorButton = (props: Props) => {
  const backgroundColor = props.backgroundColor ?? '#ce1436';
  const color = props.color ?? '#fff';
  return (
    <BasicButton
      onClick={props.onClick}
      text={props.text}
      backgroundColor={backgroundColor}
      color={color}
    />
  );
};

export default ErrorButton;
