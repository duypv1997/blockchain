pragma solidity ^0.5.0;

contract Voting{

struct Ballot{
    uint8 ballotType;
    uint32 ballotId;
    uint8 voteLimit;
    string title;
    uint8 whileList;
    uint32 timeLimit;

}


struct Candidates{
    bytes32[] candidateList;
    mapping (bytes32 => bytes32) candidateHash;
    mapping (bytes32 => uint256) voteReceived;

}

struct Voter{
    bytes32[] whileList;
    mapping (address => uint8) attemptedVotes;

}


Candidates c;
Voter v;
Ballot b;

string  convertCandidate;
string tempTitle;
bytes32 tempCandidate;
uint256 tempVote;
bytes32 tempHash;
uint256[] tempVotes;
bytes32[] tempCandidates;
bytes32 tempEmail;
address owner;


constructor(uint32 _timeLimit, uint8 _ballotType, uint8 _voteLimit, uint32 _ballotId, string memory _title, uint8 _whitelist, address _owner) public{

       b.timeLimit = _timeLimit;
        b.ballotType = _ballotType;
        b.voteLimit = _voteLimit;
        b.ballotId = _ballotId;
        b.title = _title;
        b.whileList = _whitelist;

        owner = _owner;

}

modifier onlyOwner {
    require(msg.sender == owner);
    _;
}

function setCandidates(bytes32[] memory _candidates) public onlyOwner{

    for (uint i=0; i< _candidates.length;i++){
        
        c.candidateList.push(_candidates[i]);
    }
}

function setWhileList(bytes32[] memory _email) public onlyOwner{

    for (uint i=0; i< _email.length; i++){
        v.whileList.push(_email[i]);
    }
}

function hashCandidates() public onlyOwner{

    tempVote =1;
    for (uint i=0; i< c.candidateList.length; i++){
        convertCandidate =bytes32ToString(c.candidateList[i]);
        c.candidateHash[c.candidateList[i]] = keccak256(abi.encode(convertCandidate));
        c.voteReceived[keccak256(abi.encode(convertCandidate))] = tempVote;

    }


}


 function bytes32ToString(bytes32 x) private pure returns (string memory) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (uint j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

function validCandidate(bytes32 cHash) public view returns(bool){
    for(uint k =0; k< c.candidateList.length; k++){
        // tempCandidate = ;
        if (c.candidateHash[c.candidateList[k]] == cHash){
            return true;
        }
    }
    return false;
}

function checkTimelimit() public view returns(bool){
    if (block.timestamp >= b.timeLimit) {
        return false;
    }
    else {
        return true;
    }
}

function checkBallotType() private view returns (bool) {
    if (b.ballotType ==1) return false;
    else return true;
}

function candidateList(uint64 _ballotID) public view returns(bytes32[] memory){
    if (checkBallotID(_ballotID) == false) revert();
    else return c.candidateList;

}

function checkBallotID(uint64 ballotID) private view returns(bool) {

    if (ballotID == b.ballotId) return true;
    else return false;

}

function checkVoteAttempts() public view returns (bool) {
    if (v.attemptedVotes[msg.sender] == b.voteLimit) return false;
    else return true;
}


function checkWhileList() public view returns(bool){
    if(b.whileList ==1) return true;
    else return false;
}

function checkifWhileListed(bytes32 email) public view returns (bool){
    for (uint j=0; j<v.whileList.length; j++){
            if (v.whileList[j] == email) return true;
            
    }
    return false;
}

function getTimeLimit() public view returns(uint32) {
    return b.timeLimit;
}

function getTitle() public view returns (string memory){
    return b.title;
}

function voteForCandidate(uint256[] memory _votes, bytes32 _email, bytes32[] memory _candidates) public {

    if (checkTimelimit() == false || checkVoteAttempts() == false) revert();
    if (checkWhileList() == true && checkifWhileListed(_email) == false) revert();
    tempVotes = _votes;
    tempCandidates = _candidates;
    v.attemptedVotes[msg.sender] +=1;

    for (uint i=0; i< tempCandidates.length; i++){
        tempCandidate = tempCandidates[i];
        tempHash = c.candidateHash[tempCandidate];
        if (validCandidate(tempHash) == false) revert();
        tempVote = tempVotes[i];
        c.voteReceived[tempHash] = tempVote;
    }

    
}

function voteFor(bytes32 cHash) public view returns(uint256){
    if (validCandidate(cHash) == false) revert();
    return c.voteReceived[cHash];

}

function totalVotesFor(bytes32 cHash) public view returns(uint256){
    if (checkBallotType() == false && checkTimelimit() == true) return 0;
    if (validCandidate(cHash) == false) revert();
    return c.voteReceived[cHash];


}

}


contract Creator {
    mapping(uint32 => address) contracts;
    address owner;

    function createBallot(uint32 _timeLimit, uint8 _ballotType, uint8 _voteLimit, uint32 _ballotId, string memory _title, uint8 _whitelisted) public {
        owner = msg.sender;
        Voting newContract = new Voting(_timeLimit, _ballotType, _voteLimit, _ballotId, _title, _whitelisted, owner);     
        contracts[_ballotId] = address(newContract);

    }

    function getAddress(uint32 id) public view returns(address contractAddress) {
        return contracts[id];}

        
}

