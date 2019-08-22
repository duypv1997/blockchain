pragma solidity ^0.5.0;

contract Registrar {

    struct Voter{
           bytes32[] allowedDomains;
            mapping(bytes32 => address) voterAddress;
            mapping (bytes32=>uint8) createPerm;
            mapping (bytes32 => uint16) voterId;
            mapping (uint16 => bytes32) voteEmail;
    }
 

 struct Ballot {
        mapping (uint32 => address) votingAddress;
        mapping (address => uint32) ballotID;
        mapping (uint64 => uint8) whitelistCheck;
        mapping (bytes32 => uint8) allowedVoters;
 }


Voter v;
Ballot b;
address owner;

modifier onlyOwner {
    require(msg.sender == owner);
    _;
}

function givePermission(bytes32 _email) public onlyOwner{
    v.createPerm[_email] = 1;
} 

function addDomains(bytes32 _domain) public onlyOwner {
    v.allowedDomains.push(_domain);
}

function domainCheck(bytes32 domain) public view returns (bool) {
    for (uint i=0; i< v.allowedDomains.length; i++){
        if (v.allowedDomains[i] == domain){
            return true;
        }
    }
    return false;
}

function checkReg(bytes32 email, uint16 idnum) public view returns(bool){
    if (v.voterId[email] == 0 && v.voteEmail[idnum] == 0){
        return true;
    }
    else return false;
}


  function checkVoter(bytes32 email) public view returns (uint8) {
        if (v.voterId[email] == 0) return 1;
        if (v.voterAddress[email] != msg.sender) return 2;
        else return 0;
    }

    function setAddress(address _ballotAddr, uint32 _ballotID) public {
        b.votingAddress[_ballotID] = _ballotAddr;
        b.ballotID[_ballotAddr] = _ballotID;
    }

    function getAddress(uint32 _ballotID) public view returns (address) {
        return b.votingAddress[_ballotID];
    }


    function getPermission(bytes32 _email) public view returns (uint8) {
        return v.createPerm[_email];
    }


}