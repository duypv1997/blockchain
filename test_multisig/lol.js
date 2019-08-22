
const abi = require('./1.json')

Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
const contract =web3.eth.contract(abi).at('0x59C06691D0E8f2Df495879e7907A432F975B650E');

function submitTransaction(addressDesitation, fromAddress ,amout){
	var result = contract.submitTransaction(addressDesitation, amout,"0x", {from:fromAddress, gas:500000})
	var id = contract.transactionCount()
	return id.toNumber()

}

function getConfirmationCount(id){
	var c = contract.getConfirmationCount(id)
	return(c.toNumber())

}

function getConfirmations(id){
	var result = contract.getConfirmations(id)
	return result
}

function getOwners(){
	var result = contract.getOwners()
	return result
}

function required(){
	var result = contract.required()
	return result
}

function confirmTransaction(fromAddress,id){
	var result = contract.confirmTransaction(id,{from:fromAddress, gas:500000})
	return result
}

// console.log(submitTransaction("0x8Cb59362daA7553b29bda5Bce34A6372fF2Be96B","0x796E847c1464A03D79E48b955A8cA31cF9672469",5000000000000000000))
// console.log(getConfirmationCount(3))
// var a = confirmTransaction("0xc9038b17DAd22d6A372eb1671E9E414aC11E8C3B", 3)
// console.log(a)


