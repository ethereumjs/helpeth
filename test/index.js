const tape = require('tape')
const spawn = require('tape-spawn')
const pkg = require('../package.json')

tape('CLI', function (t) {
  t.test('--version', function (st) {
    var spt = spawn(st, './helpeth --version')
    spt.stdout.match(RegExp(pkg.version + '(-[^a-zA-A0-9.+]+)?(\\+[^a-zA-Z0-9.-]+)?'))
    spt.stderr.empty()
    spt.end()
  })

  t.test('no parameters', function (st) {
    var spt = spawn(st, './helpeth')
    spt.stderr.match(/^Must provide a command/)
    spt.end()
  })

  t.test('key details from hex string', function (st) {
    var spt = spawn(st, './helpeth -p 0xba1488fd638adc2e9f62fc70d41ff0ffc0e8d32ef6744d801987bc3ecb6a0953 keyDetails')
    spt.stderr.empty()
    spt.stdout.match(/Address: 0xe0defb92145fef3c3a945637705fafd3aa74a241/)
    spt.stdout.match(/Address \(checksum\): 0xe0DefB92145FeF3c3a945637705fAfd3AA74a241/)
    spt.stdout.match(/ICAP: XE82 Q9ML VOQY V5TD N4MF MK9U KKHS JU9N 9S1/)
    spt.stdout.match(/Public key: 0x93e39cde5cdb3932e204cdd43b89578ad58d7489c31cbc30e61d167f67e3c8e76b9b2249377fa84f73b11c68f2f7a62f205f430f3a4370fd5dab6e3139d84977/)
    spt.end()
  })

  t.test('generate key', function (st) {
    var spt = spawn(st, './helpeth keyGenerate')
    spt.stderr.empty()
    spt.stdout.match(/Address: 0x/)
    spt.stdout.match(/Address \(checksum\): 0x/)
    spt.stdout.match(/ICAP: /)
    spt.stdout.match(/Public key: 0x/)
    spt.stdout.match(/Private key: 0x/)
    spt.end()
  })

  t.test('generate key V3 (and save file)', function (st) {
    var spt = spawn(st, './helpeth --password \'test\' keyGenerate v3')
    spt.stdout.match(/Address: 0x/)
    spt.stdout.match(/Address \(checksum\): 0x/)
    spt.stdout.match(/ICAP: /)
    spt.stdout.match(/Public key: 0x/)
    spt.stdout.match(/Key saved as UTC/)
    spt.end()
  })

  t.test('generate key V3 (with show private and save file)', function (st) {
    var spt = spawn(st, './helpeth --password \'test\' --show-private keyGenerate v3')
    spt.stdout.match(/Address: 0x/)
    spt.stdout.match(/Address \(checksum\): 0x/)
    spt.stdout.match(/ICAP: /)
    spt.stdout.match(/Public key: 0x/)
    spt.stdout.match(/Private key: 0x/)
    spt.stdout.match(/Key saved as UTC/)
    spt.end()
  })

  t.test('key details from file', function (st) {
    var spt = spawn(st, './helpeth --password \'test\' --keyfile test/UTC--2018-12-12T00-35-08.734Z--b07b59fe13ee751cc52814b23491ecbf4fbbb005 --show-private keyDetails')
    spt.stdout.match(/Address: 0xb07b59fe13ee751cc52814b23491ecbf4fbbb005/)
    spt.stdout.match(/Address \(checksum\): 0xB07B59fE13eE751CC52814b23491ECbF4fBbb005/)
    spt.stdout.match(/ICAP: XE97 KM53 O3C6 LQ2E 5186 YA02 B4F2 06S3 U9X/)
    spt.stdout.match(/Public key: 0x8aaf5ed1d7aefb3810186946d1542a0657a0f1c232c4c23cdb1afe53215871d64f2f07466419f39021cb5cbee10c49c2e1b1c417f57685224a6db939014da749/)
    spt.stdout.match(/Private key: 0x0d86ae57f5b60057ecafdbb4b30d2d29bc5d5701db0d357db68683f83607e7b4/)
    spt.end()
  })

  t.test('bip32 details', function (st) {
    var mnemonic = 'quick cube drink magic digital lesson sibling pulse couple kid retreat carbon picture cousin glance pledge smooth crime moment pet nice shop good exercise'
    var spt = spawn(st, './helpeth --mnemonic "' + mnemonic + '" bip32Details "m/44\'/60\'/0\'/0/0"')
    spt.stderr.empty()
    spt.stdout.match(/Path: m\/44'\/60'\/0'\/0\/0/)
    spt.stdout.match(/Address: 0x1fba3f548fc4abbe8d68768f2a7b74051c334e35/)
    spt.stdout.match(/Address \(checksum\): 0x1fBa3F548Fc4abBE8D68768F2a7b74051C334e35/)
    spt.stdout.match(/ICAP: XE79 3PF5 61RX E88G LSHB I50S CJYS JVT9 V05/)
    spt.stdout.match(/Public key: 0xae650034ac511739ec9f69ca93cc8b442fde6b63863c0c7520aea5b2d381af7ec5291c75c654d65bb7c55db22f4d4be7bafffa2f0219b6d08aff363e308f5bdd/)
    spt.end()
  })

  t.test('create transaction', function (st) {
    var spt = spawn(st, './helpeth --private 0x0d86ae57f5b60057ecafdbb4b30d2d29bc5d5701db0d357db68683f83607e7b4 createTx 0 1 0xb07b59fe13ee751cc52814b23491ecbf4fbbb005 1234 0x11223344 1000 6000')
    spt.stderr.empty()
    spt.stdout.match(/The signed transaction: 0xf867018217708203e894b07b59fe13ee751cc52814b23491ecbf4fbbb0058204d284112233441ba05d7dd00fd2403f54f56601f31abbe5177a67ab831dacb3db15fe38d62d63a987a06c74dcd555b19130b102afbcc209263aec9d118b8229040f25a9eb79d60702d3/)
    spt.end()
  })

  t.test('parse transaction', function (st) {
    var spt = spawn(st, './helpeth parseTx 0xf867018217708203e894b07b59fe13ee751cc52814b23491ecbf4fbbb0058204d284112233441ba05d7dd00fd2403f54f56601f31abbe5177a67ab831dacb3db15fe38d62d63a987a06c74dcd555b19130b102afbcc209263aec9d118b8229040f25a9eb79d60702d3')
    spt.stderr.empty()
    spt.stdout.match(/Signed by: 0xb07b59fe13ee751cc52814b23491ecbf4fbbb005/)
    spt.stdout.match(/Chain: 0x00/)
    spt.stdout.match(/Nonce: 0x01/)
    spt.stdout.match(/To: 0xb07b59fe13ee751cc52814b23491ecbf4fbbb005/)
    spt.stdout.match(/Value: 1234 \(0.000000000000001234 ETH\)/)
    spt.stdout.match(/Data: 0x11223344/)
    spt.stdout.match(/Gas limit: 1000/)
    spt.stdout.match(/Gas price: 6000 \(0.000006 Gwei\)/)
    spt.stdout.match(/Potential total transaction cost: 0.000000000006 ETH/)
    spt.stdout.match(/Minimum required account balance: 0.000000000006001234 ETH/)
    spt.end()
  })

  t.test('create transaction (with chainid=1)', function (st) {
    var spt = spawn(st, './helpeth --private 0x0d86ae57f5b60057ecafdbb4b30d2d29bc5d5701db0d357db68683f83607e7b4 createTx 1 1 0xb07b59fe13ee751cc52814b23491ecbf4fbbb005 1234 0x11223344 1000 6000')
    spt.stderr.empty()
    spt.stdout.match(/The signed transaction: 0xf867018217708203e894b07b59fe13ee751cc52814b23491ecbf4fbbb0058204d2841122334426a08220bde0b57021e4d66297bea29c1c7ea610e5e46a5ef3308a817eafe5525b38a0482167879e89a9610bd62cea138b653382ef791d80b51ab4ee836ee76a1d4823/)
    spt.end()
  })

  t.test('parse transaction (with chainid=1)', function (st) {
    var spt = spawn(st, './helpeth parseTx 0xf867018217708203e894b07b59fe13ee751cc52814b23491ecbf4fbbb0058204d2841122334426a08220bde0b57021e4d66297bea29c1c7ea610e5e46a5ef3308a817eafe5525b38a0482167879e89a9610bd62cea138b653382ef791d80b51ab4ee836ee76a1d4823')
    spt.stderr.empty()
    spt.stdout.match(/Signed by: 0xb07b59fe13ee751cc52814b23491ecbf4fbbb005/)
    spt.stdout.match(/Chain: 0x01/)
    spt.stdout.match(/Nonce: 0x01/)
    spt.stdout.match(/To: 0xb07b59fe13ee751cc52814b23491ecbf4fbbb005/)
    spt.stdout.match(/Value: 1234 \(0.000000000000001234 ETH\)/)
    spt.stdout.match(/Data: 0x11223344/)
    spt.stdout.match(/Gas limit: 1000/)
    spt.stdout.match(/Gas price: 6000 \(0.000006 Gwei\)/)
    spt.stdout.match(/Potential total transaction cost: 0.000000000006 ETH/)
    spt.stdout.match(/Minimum required account balance: 0.000000000006001234 ETH/)
    spt.end()
  })

  t.test('vanity key generation', function (st) {
    var spt = spawn(st, './helpeth vanityKeyGenerate "^000"')
    spt.stderr.empty()
    spt.stdout.match(/Address: 0x000[0-9a-fA-f]{37}/)
    spt.end()
  })
})
