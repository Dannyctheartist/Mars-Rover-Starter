const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);

    expect(rover.position).toEqual(98382);

    expect(rover.mode).toEqual("NORMAL");

    expect(rover.generatorWatts).toEqual(110);
  
  });

  //Test 8: Ensure receiveMessage contains the name of the message
  it("response returned by receiveMessage contains the name of the message", function() {
    let rover = new Rover(98382);
    let message = new Message("Test Message", []);
    let response = rover.receiveMessage(message);

    expect(response.message).toEqual("Test Message");
  });

  //Test 9: Ensure 'recieveMessage' includes two resluts if two commands are sent in the message

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MOVE', 20), new Command('STATUS_CHECK')];
    let message = new Message("Test message with two commands", commands);
    let response = rover.receiveMessage(message);
  
    expect(response.results.length).toEqual(2);
  });

  //Test 10: Ensure 'recieveMessage' responds correctly to the STATUS_CHECK command

  it("responds correctly to the STATUS_CHECK command", function() {
    let rover = new Rover(98382);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message("Test STATUS_CHECK command", commands);
    let response = rover.receiveMessage(message);

    expect(response.results[0].roverStatus).toEqual({
      mode: "NORMAL",
      generatorWatts: 110,
      position: 98382
    });
  });
  //TEST 11: Ensure 'receiveMessage' responds correctly to the MODE_CHANGE command

  it("responds correctly to the MODE_CHANGE command", function(){
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message("Test MODE_CHANGE command", commands);
    let response = rover.receiveMessage(message);

    expect(rover.mode).toEqual('LOW_POWER');
    
    expect(response.results[0].completed).toBe(true);
  });

  //TEST 12: Ensure 'recieveMessage' responds with a false completed value when attempting to move in LOW_POWER mode

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let rover = new Rover(98382);
    rover.mode = 'LOW_POWER';
    let commands = [new Command('MOVE', 87382098)];
    let message = new Message("Test MOVE command in LOW_POWER mode", commands);
    let response = rover.receiveMessage(message);

    expect(rover.position).toEqual(98382);

    expect(response.results[0].completed).toBe(false);
  });

  //Test 13: Ensure 'recieveMessage' responds with the correct position for the MOVE command

  it("responds with the position for MOVE command in NORMAL mode", function(){
    let rover = new Rover(983832);
    let commands = [new Command('MOVE', 87382098)];
    let message = new Message("Test MOVE command in NORMAL mode", commands);
    let response = rover.receiveMessage(message);

    expect(rover.position).toEqual(87382098); //position should update to 87382098

    expect(response.results[0].completed).toBe(true);
  });
});
