const { Block, BlockChain, Transaction } = require('./index')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


//create two key for two user transection
var key1 = ec.genKeyPair();

var walletKey1 = key1.getPublic('hex')
var privateKey1 = key1.getPrivate('hex')

var key2 = ec.genKeyPair();

var walletKey2 = key2.getPublic('hex')
var privateKey2 = key2.getPrivate('hex')

const bytecoin = new BlockChain()

//start execute t1
let transection1 = new Transaction(walletKey1, walletKey2, 200)
transection1.signTransaction(key1)
bytecoin.addTransactions(transection1)
//mine transection 1
bytecoin.minePendingTransactions(walletKey1)
//ck balace for this stage
console.log('Wallet 1 : '+bytecoin.getBalanceByAddress(walletKey1))
console.log('Wallet 2 : '+bytecoin.getBalanceByAddress(walletKey2))

//start execute t2
let transection2 = new Transaction(walletKey2, walletKey1, 50)
transection2.signTransaction(key2)
bytecoin.addTransactions(transection2)
//mine transection 2
bytecoin.minePendingTransactions(walletKey2)
//ck balace for this stage
console.log('Wallet 1 : '+bytecoin.getBalanceByAddress(walletKey1))
console.log('Wallet 2 : '+bytecoin.getBalanceByAddress(walletKey2))


// console.log(bytecoin.getBalanceByAddress("randomAddress"))
// bytecoin.chain[1].transaction[1] = "Manupuletd"
console.log('Valid : '+bytecoin.ckValid())


