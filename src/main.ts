import { db } from './Firebase_Init.js';
import { ref, onValue, DatabaseReference } from 'firebase/database';
import { Rasp_Pi_Num } from './Rasp_Pi_SerialNumber_Init.js';
import { aa_log } from './aa_log.js';
import { exec } from 'child_process';

// Initialize Command Data
let Command: string = null;

const Is_Locked_Ref: DatabaseReference = ref(
  db,
  'Rasp_Pi/' + Rasp_Pi_Num + '/Is_Locked',
);
onValue(Is_Locked_Ref, (snapshot) => {
  console.log('--------------------------------------------------');
  switch (snapshot.val()) {
    case null:
      console.log('Error: snapshot.val() is null...<(+p+)>');
      break;
    case true:
      console.log(Rasp_Pi_Num + '.Is_Locked: True');
      aa_log('True');
      Command = null;
      break;
    case false:
      console.log(Rasp_Pi_Num + '.Is_Locked: False');
      aa_log('False');
      Command = null;
      break;
    default:
      break;
  }

  if (Command != null) {
    exec(Command, function (err, stdout, stderr) {
      console.log('execute => ' + Command);
      if (!err) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
      } else {
        console.log(err);
      }
    });
  }
  Command = null;
});
