# helpeth

[![NPM Package](https://img.shields.io/npm/v/helpeth.svg?style=flat-square)](https://www.npmjs.org/package/helpeth)
[![Gitter](https://img.shields.io/gitter/room/ethereum/ethereumjs-lib.svg?style=flat-square)](https://gitter.im/ethereum/ethereumjs-lib)

Help (with) Ethereum. Purists' commandline tool for key and transaction management.

It uses [ethereumjs-wallet](https://github.com/axic/ethereumjs-wallet) and [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-tx).

## Installation
With Node installed:
Clone this repository: `git clone https://github.com/ethereumjs/helpeth`
Switch to the directory `cd helpeth'
Enter commands:
`node helpeth --help`
`node helpeth parseTx 0xf8900b8504a817c800830f424094394b88b676f289224bdc332f361be399ea064bd587060a24181e4000a4a358c2fa841a3c2efd182abc0a149b32a493044d84aa6c0d4ebe34e0f1b9e96403db65da2aa0a2b453bcade87566a292462a6e4de82615508de982936799642dba9e959b1ac3a0364eee7341bf901182e59c1b7492b03e55163703435fc8a1f199fcf30d50ab`
`node helpeth --password 'password' keyGenerate v3`


Note: Several users have reported the npm install does not currently work: `npm install -g helpeth`

It uses [secp256k1](https://github.com/cryptocoinjs/secp256k1-node) for the cryptography. Make sure to have either *OpenSSL* or *GMP* installed.

## How to use

See the help output with `helpeth --help`:

```
Usage: helpeth [command]

Commands:
  signMessage <message>                     Sign a message
  verifySig <hash> <sig>                    Verify signature
  verifySigParams <hash> <r> <s> <v>        Verify signature parameters
  createTx <nonce> <to> <value> <data>      Sign a transaction
  <gasLimit> <gasPrice>
  assembleTx <nonce> <to> <value> <data>    Assemble a transaction from its
  <gasLimit> <gasPrice> <v> <r> <s>         components
  parseTx <tx>                              Parse raw transaction
  keyGenerate [format] [icapdirect]         Generate new key
  keyConvert                                Convert a key to V3 keystore format
  keyDetails                                Print key details
  bip32Details <path>                       Print key details for a given path
  addressDetails <address>                  Print details about an address
  unitConvert <value> <from> <to>           Convert between Ethereum units

Options:
  -p, --private      Private key as a hex string                        [string]
  --password         Password for the private key                       [string]
  --password-prompt  Prompt for the private key password               [boolean]
  -k, --keyfile      Encoded key file                                   [string]
  --show-private     Show private key details                          [boolean]
  --mnemonic         Mnemonic for HD key derivation                     [string]
  --version          Show version number                               [boolean]
  --help             Show help                                         [boolean]
```

## Examples

### Generate a new key

```
$ helpeth keyGenerate
Address: 0xe0defb92145fef3c3a945637705fafd3aa74a241
Address (checksum): 0xe0DefB92145FeF3c3a945637705fAfd3AA74a241
ICAP: XE82 Q9ML VOQY V5TD N4MF MK9U KKHS JU9N 9S1
Public key: 0x93e39cde5cdb3932e204cdd43b89578ad58d7489c31cbc30e61d167f67e3c8e76b9b2249377fa84f73b11c68f2f7a62f205f430f3a4370fd5dab6e3139d84977
Private key: 0xba1488fd638adc2e9f62fc70d41ff0ffc0e8d32ef6744d801987bc3ecb6a0953
```

### Generate a new key and save as V3 keystore file

```
$ helpeth --password 'Use --password-prompt instead for security' keyGenerate v3
Address: 0x15f2f3e0f2d74ea7b185fc12f24cb4f402cc96d0
Address (checksum): 0x15F2f3e0F2D74eA7B185fC12F24cB4F402cC96D0
ICAP: XE53 2KAS Y050 UIFI VB1J 2636 IKXC 4QIP SK0
Public key: 0xf2a3a694026ed4abb16e18f0421a6e667803399dad2eae2ca8c3f95934fcb46e9440183fd278181deb501d2f0766d0f676d0cac84da3632590e2978cb6883bc4
Key saved as UTC--2016-03-17T19-06-57.064Z--15f2f3e0f2d74ea7b185fc12f24cb4f402cc96d0
```

### Print details of an existing keyfile

```
$ helpeth --password 'Use --password-prompt instead for security' --keyfile UTC--2016-03-17T19-06-57.064Z--15f2f3e0f2d74ea7b185fc12f24cb4f402cc96d0 --show-private keyDetails
Address: 0x15f2f3e0f2d74ea7b185fc12f24cb4f402cc96d0
Address (checksum): 0x15F2f3e0F2D74eA7B185fC12F24cB4F402cC96D0
ICAP: XE53 2KAS Y050 UIFI VB1J 2636 IKXC 4QIP SK0
Public key: 0xf2a3a694026ed4abb16e18f0421a6e667803399dad2eae2ca8c3f95934fcb46e9440183fd278181deb501d2f0766d0f676d0cac84da3632590e2978cb6883bc4
Private key: 0x71a7f0e2ef1b7ff501b65a1650d48b8d5521fadc9539eec146d4faa6f5ca9aca
```

### Sign a message

```
$ helpeth --password 'Use --password-prompt instead for security' --keyfile UTC--2016-03-17T19-06-57.064Z--15f2f3e0f2d74ea7b185fc12f24cb4f402cc96d0 signMessage 'Hello World'
Input message: Hello World
Message hash (Keccak): 0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba
The signature: 0x167760997a69e225c0668e6761cd20cac70f3a6ace29fe2d287c3003daf6972b10d158a47e8f064cf982a3defdf236247c41249dbfb0fb81f0d126c26a94971d01
```

### Sign a transaction

```
$ helpeth --password 'Use --password-prompt instead for security' --keyfile UTC--2016-03-17T19-06-57.064Z--15f2f3e0f2d74ea7b185fc12f24cb4f402cc96d0 createTx 0x1 0xe0defb92145fef3c3a945637705fafd3aa74a241 "1 eth" 0x0 21000 "20 Gwei"
Nonce: 0x1
To: 0xe0defb92145fef3c3a945637705fafd3aa74a241
Value: 0xde0b6b3a7640000
Data: 0x0
Gas limit: 0x5208
Gas price: 0x4a817c800
The signed transaction: 0xf86c018504a817c80082520894e0defb92145fef3c3a945637705fafd3aa74a241880de0b6b3a7640000001ba01893f2731799dc436da31e092f75bece7bfbdb4942b60b106d61ec06f143aed2a075548818010ccd7fd3e3dd6172f072d4dec19c8956c735bdd34b4aea809ff6be
```

### Parse a transaction

```
$ ./helpeth parseTx 0xf86c018504a817c80082520894e0defb92145fef3c3a945637705fafd3aa74a241880de0b6b3a7640000001ba01893f2731799dc436da31e092f75bece7bfbdb4942b60b106d61ec06f143aed2a075548818010ccd7fd3e3dd6172f072d4dec19c8956c735bdd34b4aea809ff6be
Signed by: 0x15f2f3e0f2d74ea7b185fc12f24cb4f402cc96d0
Nonce: 0x01
To: 0xe0defb92145fef3c3a945637705fafd3aa74a241
Value: 1000000000000000000 (1 ETH)
Data: 0x00
Gas limit: 21000
Gas price: 20000000000 (20 Gwei)
```

## License

MIT License

Copyright (C) 2016 Alex Beregszaszi
