import { getSerialNumber } from 'raspi-serial-number';

// Rasp_Pi_Serial_Num
let Rasp_Pi_Num = 'SerialNumber_3';

getSerialNumber((error: any, data: string) => {
  if (error) {
    console.log('Callback Error: ', error);
  } else if (data) {
    Rasp_Pi_Num = data;
    console.log('Rasp_Pi_Num: ', Rasp_Pi_Num);
  }
});

export { Rasp_Pi_Num };
