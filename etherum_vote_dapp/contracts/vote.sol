pragma solidity ^0.5.0;

contract vote {
    mapping (bytes32 => uint256) public votesReceived;

    bytes32[] public candidateList;



    constructor(bytes32[] memory candidateNames) public {
    candidateList = candidateNames;
  }
   


    // return total vote for candidate
    function totalVote (bytes32 candidate) view public returns (uint256){
        require (validCandidate(candidate));

        return votesReceived[candidate];

    }

    // increments the vote count for candidate

    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] +=1;
    }




    function validCandidate(bytes32 candidate) view public returns(bool){
        for (uint i=0; i<= candidateList.length; i++){
            if (candidate == candidateList[i]){
                return true;
            }

        }
        return false;

    }

}