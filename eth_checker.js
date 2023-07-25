import Web3 from 'web3'
import { createInterface } from 'readline'
import { createReadStream, writeFileSync, appendFileSync } from 'fs'

async function read(fileName) {
    const array = []
    const readInterface = createInterface({
        input: createReadStream(fileName),
        crlfDelay: Infinity,
    })
    for await (const line of readInterface) {
        array.push(line)
    }
    return array
}

async function main() {
    writeFileSync('logs.txt', '')
    const wallets = await read('wallets.txt')
    const web3 = new Web3('https://rpc.ankr.com/eth') //RPC

    for(let wallet of wallets) {
        const nonce = await web3.eth.getTransactionCount(wallet)
        console.log(nonce.toString())
        if(nonce >= 1) {
            appendFileSync('logs.txt', `${nonce} transaction | ${wallet}\n`)
        }
    }
    console.log('Done !')
}

main()