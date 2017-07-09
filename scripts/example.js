module.exports = function(robot) {

  // When robot hears Hello it sends message
  robot.hear(/Hello/i, function(res) {
    return res.send('Hey girl Hey!');
  });
  // If user sends direct message to robot then it will respond by randomly
  // choosing response from array.
  var laugh = ['lol', 'you funny', 'hilarious'];
  robot.respond(/lol/i, function(res) {
    return res.send(res.random(laugh));
  });
  // When robot hears sure it sends message
  robot.hear(/sure/, function(res) {
    return res.send('mmhmmmm');
  });
  // When robot hears sad it sends message
  robot.hear(/sad/i, function(res) {
    return res.send("If it don't pay your bills, then pay it no mind");
  });
  // When robot hears go it sends message
  robot.hear(/go/i, function(res) {
    return res.send('Start your engines');
  });
  // If group changes topic in chat then automatic messae will be delivered.
  // Taken from example_scripts.js and changed the message.
  robot.topic(function(res) {
    return res.send(res.message.text + "? Where are we going with this?");
  });


  // Taken from example_scripts.js in class repo and added words of my own.
  // When users enter or leave a chat room then bot will say something in
  // general to group from array of choices.
  enterReplies = ['Hi', 'Target Acquired', 'Hello friend.', 'I see you'];
  leaveReplies = ['Are you still there?', 'Bye Felicia', 'Wait what'];

  robot.enter(function(res) {
    return res.send(res.random(enterReplies)); // Takes random reply from array
  });

  robot.leave(function(res) {
    return res.send(res.random(leaveReplies)); // Takes random reply from array
  });

  // Create an interval Id for conditional statement
  canIntervalId = null;

  // When someone types 'I cant' condition should be executed
  robot.respond(/I cant/, function(res) {
    // if the intervalId is not null then the following response should be given
    if (canIntervalId !== null) {
      res.send("Believe in yourself!");
      return;
    }
    // if this is first time executing command or IntervalId is null then
    //following response should be given
    res.send("You don't really think that?");
    return canIntervalId = setInterval(function() {
      return res.send("Believe in yourself");
    }, 1000); //response will be given 1000 times
    canIntervalId = 1; // set IntervalId to 1 so no longer null
  });

  // Ends repetition in conditional with same intervalId
  robot.respond(/I will/, function(res) {
    // if the intervalId is not null then the following response should be given
    if (canIntervalId !== null) {
      res.send("Yay! Course you can!");
      clearInterval(canIntervalId);
      return canIntervalId = null;
    }
    // if this is first time executing command or IntervalId is null then
    //following response should be given
    else {
      return res.send("Isn't that what I told you??");
    }
  });
  //class = ['carenbraj', 'dafabulousteach', 'jason', 'mennake', 'acervantes', 'nanaeaubry'];
  robot.respond(/Gak (.*)/i, function(res) {
    robot.messageRoom('nanaeplayground', 'Gak command: ' + res.match[1]);
    return res.send('Goink goink!');
    // var name;
    // name = msg.match[1];
    // if (name === "Rubot") {
    //   return msg.send("You're very much welcome!");
    // } else if (name === "@carenbraj" || name === "@dafabulousteach" || name === "@jason" || name === "@mennake" || name === "@acervantes" || name === "@nanaeaubry") {
    //   return msg.send("Isn't " + name + " the nicest!");
    // }
  });
  robot.respond(/debug/i, function(res) {
    robot.logger.debug(Object(res));
  });

};
