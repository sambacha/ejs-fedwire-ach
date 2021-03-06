import assert from 'assert';
import { readFile } from 'fs';
import fedach from '../';

describe('fedach', function() {
  describe('download', () => it('should download the data securely', done => fedach.download(function(err, data) {
    assert.ifError(err);
    assert.ok(data);
    return done();
  })));
    
  return describe('parse', () => it('should parse all the data', done => readFile(__dirname + '/FedACHdir.txt', 'utf8', function(err, data) {
    const results = fedach.parse(data);
    assert.ok(results);
    assert.equal(results.length, 100);
    
    const a = results[0];
    assert.equal(a.routing, '011000015');
    assert.equal(a.office, 'O');
    assert.equal(a.frb, '011000015');
    assert.equal(a.type, '0');
    assert.equal(a.date, '020802');
    assert.equal(a.newRouting, '000000000');
    assert.equal(a.customer, 'FEDERAL RESERVE BANK');
    assert.equal(a.address, '1000 PEACHTREE ST N.E.'); 
    assert.equal(a.city, 'ATLANTA');
    assert.equal(a.state, 'GA');
    assert.equal(a.zip, '30309');
    assert.equal(a.zipExt, '4470');
    assert.equal(a.zipFull, '30309-4470');
    assert.equal(a.phoneArea, '866');
    assert.equal(a.phonePrefix, '234');
    assert.equal(a.phoneSuffix, '5681');
    assert.equal(a.phoneFull, '8662345681');
    assert.equal(a.status, '1');
    assert.equal(a.dataView, '1');
    assert.equal(a.filter, '     ');
    
    const b = results[1];
    assert.equal(b.routing, '011000028');
    assert.equal(b.customer, 'STATE STREET BANK AND TRUST COMPANY');
    assert.equal(b.city, 'N. QUINCY');
    assert.equal(b.state, 'MA'); 
    return done();
  })));
});
