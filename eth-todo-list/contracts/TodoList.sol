pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

  struct Task{
      uint id;
      string content;
      bool complete;
  }



event TaskCreated (
    uint id,
    string content,
    bool complete
);

event TaskCompleted(
    uint id,
    bool complete
);


  mapping (uint => Task) public tasks;

  function createTask(string memory _content) public {
      taskCount++;
      tasks[taskCount] = Task(taskCount, _content, false);

  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.complete = !_task.complete;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.complete);
  }



constructor() public {
    createTask("hello DuyPV");
}



}