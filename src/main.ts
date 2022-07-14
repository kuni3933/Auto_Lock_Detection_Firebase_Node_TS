import { aa_log } from './AsciiArtLog.js';
import { db } from './FirebaseInit.js';
import { exec } from 'child_process';
import { ref, onValue, DatabaseReference } from 'firebase/database';
import { raspPiNum } from './RaspPiSerialNumberInit.js';

// Initialize commandPath
let command: string = null;

// Initialize DatabaseReference
const isLockedRef: DatabaseReference = ref(
  db,
  'Rasp_Pi/' + raspPiNum + '/Is_Locked',
);

// Get Is_Locked_Value
onValue(isLockedRef, (snapshot) => {
  console.log('--------------------------------------------------');
  switch (snapshot.val()) {
    case null:
      console.log('Error: snapshot.val() is null...<(+p+)>');
      break;
    case true:
      console.log(raspPiNum + '.Is_Locked: True');
      aa_log('True');
      command = null;
      break;
    case false:
      console.log(raspPiNum + '.Is_Locked: False');
      aa_log('False');
      command = null;
      break;
    default:
      break;
  }

  if (command != null) {
    exec(command, function (err, stdout, stderr) {
      console.log('execute => ' + command);
      if (!err) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
      } else {
        console.log(err);
      }
    });
    command = null;
  }
});
