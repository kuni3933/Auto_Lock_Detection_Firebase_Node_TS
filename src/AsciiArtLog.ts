import asciify from 'asciify';

export function aa_log(string: string) {
  asciify(string, { font: 'doom' }, function (err: any, aa: any) {
    if (err) {
      console.log(err);
    } else {
      console.log(aa);
    }
  });
}
