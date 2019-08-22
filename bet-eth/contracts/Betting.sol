pragma solidity ^0.4.23;

contract Betting{
    address public owner; // address admin
    uint256 public mininumBet; // price min
    uint256 public totalBetOne; // sum amount BetOne
    uint256 public totalBetTwo; // sum amount BetTwo
    address[] public players; //List player

    struct player {
        uint256 amountBet;
        uint16 teamSelect;

    }
    // test with name 
    string public name = "Tran canh Tuan";

    // function () public payable{}
    // Test function web3js
    function wakeUp() public returns (string){

        return "success" ; 
      }

    mapping (address => player) public playerInfor;

    constructor() public {
        owner = msg.sender;
        mininumBet = 100000000000000;
    }
    // check info player join  
    function checkPlayerExist(address player) public view returns(bool) {
        for (uint i=0; i< players.length; i++){
            if (players[i] == player){
                return true;
            }

        }
        return false;

    }


    //function vote
    function bet(uint8 _teamSelect) public payable {

        require(!checkPlayerExist(msg.sender)); // check player already exist, player phai chua ton tai
        require(msg.value >= mininumBet);

        playerInfor[msg.sender].amountBet = msg.value;
        playerInfor[msg.sender].teamSelect = _teamSelect;
        players.push(msg.sender);


        if (_teamSelect ==1){
            totalBetOne += msg.value;
        }
        else {
            totalBetTwo += msg.value;
        }


    }

    // Kết thúc các cược và chia tiền
    function distributePrizes(uint16 teamWinner) public payable {
        address[1000] memory winners;
        uint256 count = 0;
        uint256 loseBet = 0;
        uint256 winBet = 0;

        for (uint i =0; i< players.length; i++){
            if (playerInfor[players[i]].teamSelect == teamWinner ){

                winners [count]= players[i];
                count ++;
            }

        }


        if (teamWinner == 1){
            loseBet = totalBetTwo;
            winBet = totalBetOne;
        }
        else {
            loseBet = totalBetOne;
            winBet = totalBetTwo;

        }

        for (uint j=0; j<= count; j++){
            if (winners[j] != address(0)){
                uint256 bet = playerInfor[winners[j]].amountBet;
                address(uint160(winners[j])).transfer((bet*(10000+(loseBet*10000/winBet)))/10000);
            }
        }

        for (uint k=0; k<players.length; k++){
            delete playerInfor[players[k]];
        }

        players.length =0;
        loseBet =0;
        winBet =0; 
        totalBetOne = 0;
        totalBetTwo = 0;

    }



}