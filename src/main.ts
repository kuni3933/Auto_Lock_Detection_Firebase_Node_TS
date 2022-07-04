import { db } from './Firebase_Init.js';
import { ref, onValue, DatabaseReference } from 'firebase/database';
import { Rasp_Pi_Num } from './Rasp_Pi_SerialNumber_Init.js';
import { AA_Log } from './AA_Log.js';
import { exec } from 'child_process';

// Initialize Command Data
let Command: string = null;

// Initialize DatabaseReference
const Is_Locked_Ref: DatabaseReference = ref(
  db,
  'Rasp_Pi/' + Rasp_Pi_Num + '/Is_Locked',
);

// Get Is_Locked_Value
onValue(Is_Locked_Ref, (snapshot) => {
  console.log('--------------------------------------------------');
  switch (snapshot.val()) {
    case null:
      console.log('Error: snapshot.val() is null...<(+p+)>');
      break;
    case true:
      console.log(Rasp_Pi_Num + '.Is_Locked: True');
      AA_Log('True');
      Command = null;
      break;
    case false:
      console.log(Rasp_Pi_Num + '.Is_Locked: False');
      AA_Log('False');
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
    Command = null;
  }
});
