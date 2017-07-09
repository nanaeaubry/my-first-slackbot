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

  // When user inputs username(s) robot will execute following code
  robot.respond(/slay (.*)/i, function(res) {
    var users = res.match[1].split(' ');
    res.send('users: ' + users.length);
    for (var i = 0; i < users.length; i++) {
      res.send('user: ' + users[i]);
      // check if valid username entered
      if (users[i].indexOf('@') !== 0) {
        continue;
      }
      // send private message to users 'targeted'
      robot.messageRoom(users[i], 'You just got slayed by ' + res.envelope.user.name);
    }
    // send message to current board or room
    return res.send('Slay accomplished!');
  });

  //wikipedia subject
  robot.respond(/wikipedia (.*)/i, function(res) {
    var subjects = res.match[1].split(' ');
    // Only use the first one
    return res.send('https://en.wikipedia.org/wiki/' + subjects[0]);
  });

};
