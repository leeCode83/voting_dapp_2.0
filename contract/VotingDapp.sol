// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingApp{
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Bukan Owner");
        _;
    }

    struct Voter{
        string name;
        bool hasVoted;
        bool isValid;
    }

    struct Candidate{
        string candidateName;
        uint voteCount;
    }

    Candidate[] internal  candidateList;                //untuk melihat semua kandidat yang ada
    address[] internal voterList;                       //untuk melihat semua voter yang eligible
    mapping(address => Voter) internal  voters;         //untuk memeriksa apakah ada voter dengan address tersebut

    event NewVote(address indexed voterAddress, uint indexed  candidateIndex);
    event NewCandidate(string indexed nameCandidate, uint indexed candidateId);
    event VoterAdded(address _newVoter, string indexed nameVoter);
    
    function getOwnerAddress() public view returns (address){
        return owner;
    }

    function changeOwnership(address _newOwner) external onlyOwner{
        require(_newOwner != address(0), "New Owner tidak bisa address 0");
        owner = _newOwner;
    }

    function addVoter(address _voterAddress, string memory _name) external onlyOwner {
        require(voters[_voterAddress].isValid == false, "Address voter sudah terdaftar");
        require(_voterAddress != address(0), "Address voter tidak boleh 0");

        Voter memory newVoter = Voter(_name, false, true);
        voters[_voterAddress] = newVoter;
        voterList.push(_voterAddress);
        emit VoterAdded(_voterAddress, newVoter.name);
    }

    function addCandidate(string memory _name) external onlyOwner{
        uint candidateId = candidateList.length;
        Candidate memory newCandidate = Candidate(_name, 0);
        candidateList.push(newCandidate);
        emit NewCandidate(_name, candidateId);
    }

    function getAllVoters() external view returns (uint) {
        require(voterList.length > 0, "Tidak ada voter");
        return voterList.length;
    }

    function getAllCandidates() external view  returns (Candidate[] memory){
        require(candidateList.length > 0, "Tidak ada kandidat");
        return candidateList;
    }

    function vote(uint _candidateIndex) external {
        require(voters[msg.sender].isValid == true , "Address tidak ada di whitelist");
        require(voters[msg.sender].hasVoted == false, "Anda telah memilih");
        require(_candidateIndex < candidateList.length, "Kandidat tidak ada di daftar");

        candidateList[_candidateIndex].voteCount++;
        voters[msg.sender].hasVoted = true;

        emit NewVote(msg.sender, _candidateIndex);
    }
}