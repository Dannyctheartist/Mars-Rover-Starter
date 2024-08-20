const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  test("throws error if command type is NOT passed into constructor as the first parameter", function() {
    let instantiateCommand = function() { new Command();};
    expect(instantiateCommand).toThrow(new Error('Command type required.'));
  });

});

// Test 2

describe("Command class", function() {
  it("constructor sets command type", function(){
    let command = new Command("MOVE", 12000);

    expect(command.commandType).toEqual("MOVE");
  })
});

//Test 3

describe("Command Class", function(){
  test("constructor sets a value passed in as 2nd argument", function(){
  let command = new Command("MOVE", 1234);

  expect(command.value).toEqual(1234);
  });
});