var sha256 = require("crypto-js/sha256");

//console.log(sha256("Anik").toString());

class Block {
    constructor(timestamp, data, previusHash) {
        this.timestamp = timestamp
        this.data = data
        this.previusHash = previusHash
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return sha256(
            this.timestamp + JSON.stringify(this.data) + this.previusHash
        ).toString()
    }
}

const block = new Block("09-12-1999",{ amount : 1000}, "ajsdfaior4hwqrua248t57t" )

console.log(block)