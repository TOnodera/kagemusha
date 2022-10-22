import PendingIcon from '@mui/icons-material/Pending';

interface Props {
  show: boolean;
}
const Pending = (props: Props) => {
  return (
    <div
      style={{
        display: props.show ? 'block' : 'none',
        textAlign: 'center',
        marginTop: '50px'
      }}
    >
      <PendingIcon />
      <div>待機中</div>
    </div>
  );
};

export default Pending;
