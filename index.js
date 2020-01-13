var sha256 = require("crypto-js/sha256");

//console.log(sha256("Anik").toString());

class Block {
    constructor(timestamp, transaction, previusHash = "") {
        this.timestamp = timestamp
        this.transaction = transaction
        this.previusHash = previusHash
        this.hash = this.calculateHash()
        this.tmp = 0
    }
    mineBlock(complexity) {
        while(
            this.hash.substring(0, complexity) !== Array(complexity + 1).join("0")
        ){
            this.tmp++
            this.hash = this.calculateHash()
        }
        console.log('Mining Done : '+ this.hash)
        
    }

    calculateHash() {
        return sha256(
            this.timestamp + JSON.stringify(this.transaction) + this.previusHash + this.tmp
        ).toString()
    }
}

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.generateGenesisBlock()]
        this.complexity = 2
        this.pendingTransactions = []
        //mining reword - each evrery transection miner get 10 byteCoin
        this.mineReward = 10;
    }

    

    generateGenesisBlock() {
        return new Block("09-12-1999","Anik","0000")
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }

    createTransactions(transaction) {
        this.pendingTransactions.push(transaction)
    }

    minePendingTransactions(minerAddress) {
        let newBlock = new Block(Date.now, this.pendingTransactions)
        newBlock.mineBlock(this.complexity)
        this.chain.push(newBlock)
        this.pendingTransactions = [
            new Transaction(null, minerAddress, this.mineReward)
        ]
    }

    getBalanceByAddress(address) {
        let balance = 0
        for(const block of this.chain){
            for(const transaction of block.transaction){
                if(transaction.fromAddress === address){
                    balance -= transaction.amount
                }

                if(transaction.toAddress === address){
                    balance += transaction.amount

                }
            }
        }
        return balance;
    }

    // addBlock(newBlock) {
    //     newBlock.previusHash = this.getLastBlock().hash
    //     newBlock.mineBlock(this.complexity)
    //     this.chain.push(newBlock)
    // }

    ckValid() {
        for(let i = 1 ; i < this.chain.length ; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]

            if(currentBlock.previusHash !== previousBlock.hash) return false

            if(currentBlock.hash !== currentBlock.calculateHash()) return false
        }

        return true
    }
}

const byteCoin = new BlockChain()

byteCoin.createTransactions(new Transaction("Feni","Dhaka", 100))
byteCoin.createTransactions(new Transaction("Dhaka","Feni", 50))
// byteCoin.createTransactions(new Transaction("Dhaka","CTG", 50))

byteCoin.minePendingTransactions("Anik-Address")
console.log(byteCoin.getBalanceByAddress("Anik-Address"))
// console.log(byteCoin.getBalanceByAddress("Feni"))
// console.log(byteCoin.getBalanceByAddress("Dhaka"))
// console.log(byteCoin.getBalanceByAddress("CTG"))

byteCoin.minePendingTransactions("Anik-Address")
console.log(byteCoin.getBalanceByAddress("Anik-Address"))

// console.log(byteCoin)

// const block1 = new Block("09-12-1999",{ amount : 1000} )


// byteCoin.addBlock(block1)
// console.log(byteCoin)

// byteCoin.addBlock(block)
// console.log(byteCoin.ckValid())

// byteCoin.chain[1].transaction = "Hacked"
// console.log(byteCoin.ckValid()) 