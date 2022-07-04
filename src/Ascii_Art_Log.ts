import asciify from 'asciify';

export function AA_Log(string: string) {
  asciify(string, { font: 'doom' }, function (err, aa) {
    if (err) {
      console.log(err);
    } else {
      console.log(aa);
    }
  });
}
