import request from 'request';

/*
 * FedACH Directory File Format
 * https://www.fededirectory.frb.org/download.cfm
 */
const regex = new RegExp(`\
^(.{9})\
(.{1})\
(.{9})\
(.{1})\
(.{6})\
(.{9})\
(.{36})\
(.{36})\
(.{20})\
(.{2})\
(.{5})\
(.{4})\
(.{3})\
(.{3})\
(.{4})\
(.{1})\
(.{1})\
(.{5})$\
`);

export function download(cb) {
  return request({url: 'https://www.frbservices.org/EPaymentsDirectory/FedACHdir.txt'}, function(err, res, body) {
    if (err) { return cb(err); }
    return cb(null, body);
  });
}

export function parse(data) {
  let line;
  const records = [];
  const lines = data.split('\r\n');
  while ((line = lines.shift())) {
    const r = regex.exec(line);
    if (r) {
      records.push({
        routing: r[1],
        office: r[2],
        frb: r[3],
        type: r[4],
        date: r[5],
        newRouting: r[6],
        customer: r[7].trim(),
        address: r[8].trim(),
        city: r[9].trim(),
        state: r[10],
        zip: r[11],
        zipExt: r[12],
        zipFull: r[11] + "-" + r[12],
        phoneArea: r[13],
        phonePrefix: r[14],
        phoneSuffix: r[15],
        phoneFull: "" + r[13] + r[14] + r[15] + "",
        status: r[16],
        dataView: r[17],
        filter: r[18]});
    }
  }
  return records;
}
