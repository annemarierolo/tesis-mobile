import { useBarcode } from '@createnextapp/react-barcode';

function BarCode(props) {
  const { inputRef } = useBarcode({
    value: (props.value === "") ? "123456789" : props.value,
    options: {
      background: '#fff',
    }
  });

  return <img style={{ width: 130, height: 80, marginTop: '10px' }} ref={inputRef} alt=''/>;
};

export default BarCode;