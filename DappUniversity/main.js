const Web3 = require('web3')
var Tx = require('ethereumjs-tx')

const rpcURL = "https://ropsten.infura.io/v3/1ac2197d70014eec9f19565650634394"

const web3 = new Web3(rpcURL)

const account1 = '0x28549D7515436C519821d8682bf783Ac84d1C1Df'
const account2 = '0x5a6052eC90801510AF4F93dd24cc60A82891E8Ec'

// const priv1 = process.env.PRIVATE_KEY_1
// const priv2 = process.env.PRIVATE_KEY_2

// console.log(priv1)

const privateKey1 = Buffer.from('dd0c9ec256a7e76a6693a0d2dea01a6de6b7dfeaf3afcaef7b95647758c79c1a', 'hex')
const privateKey2 = Buffer.from('dd0c9ec256a7e76a6693a0d2dea01a6de6b7dfeaf3afcaef7b95647758c79c1a', 'hex')
// // create a trasaction

web3.eth.getTransactionCount(account2, (err, txCount) =>{
	const txObject = {
	nonce: web3.utils.toHex(txCount),
	to: account1,
	value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
	gasLimit: web3.utils.toHex('21000'),
	gasPrice: web3.utils.toHex(web3.utils.toWei('30','ether'))

}

const tx = new Tx(txObject)
tx.sign(privateKey2)
const serializedTx = tx.serialize()
const raw = '0x' + serializedTx.toString('hex')

web3.eth.sendSignedTransaction(raw, (err, txHash) => {
  if (!err){
  	console.log(txHash)
  }
  else {
  	console.log(err)
  }
})

})











