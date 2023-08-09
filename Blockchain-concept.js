
//how blockchains work - By using any hashing function like SHA256 on this block. we get a string that is unique to that block. and by adding that unique string to our new block.
// we create a chain that links the two blocks together. and we can build upon this "castle" or blockchain and we will know if any prior blocks has changed or been modified since the -
// previous hash in the chain doesn't match. since if you change a single letter in the string you send through a hashing function you'll get a another unique string/hash for that string. 

const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "09/08/2023", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
            return true;
        }
    }
}

let Coin = new Blockchain();
Coin.addBlock(new Block(1, "10/08/2023", { amount:5 }))
Coin.addBlock(new Block(2, "12/08/2023", { amount:15 }))


//console.log('is blockchain valid?'+ Coin.isChainValid())
console.log(JSON.stringify(Coin, null, 4));

//Coin.chain[1].data = { amount : 100};

//console.log('is blockchain valid?'+ Coin.isChainValid())