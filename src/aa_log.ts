import asciify from 'asciify';

export function aa_log(string: string) {
  asciify(string, { font: 'doom' }, function (err, aa) {
    if (err) {
      console.log(err);
    } else {
      console.log(aa);
    }
  });
}
