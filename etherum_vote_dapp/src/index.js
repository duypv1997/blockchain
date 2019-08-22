

const Web3 = require("web3")
const url = "http://127.0.0.1:7545"
const web3 = new Web3(url)

var account;

web3.eth.getAccounts().then((f) => {
    account = f[0];
   })


const fs = require('fs');
const temp = JSON.parse(fs.readFileSync('/Users/duy/Desktop/blockchain/etherum_vote_dapp/build/contracts/vote.json', 'utf8'));
address = '0xE59c759CCd7dD7eD7DA614B26796D9DC46dfAF2c';

contract = web3.eth.Contract(temp.abi, address)
candidates = {'Duypv':'candiate-1', 'Tuanct':'candidate-2', 'Vanpb':'candidate-3'}

// function voteForCandidate(candidate){
//     candidateName = $("#candidate").val();
//     contract.methods.voteForCandidate(web3.utils.toHex(candidateName)).send({from: account}).then((f)=>{
//         let div_id = candidates[candidateName];
//     }

// }
// contract.methods.totalVote(web3.utils.asciiToHex('Duypv')).call((err,result)=>{
//     if (!err){
//         console.log(result)
//     }
//     else{
//         console.log(err)
//     }
// })
