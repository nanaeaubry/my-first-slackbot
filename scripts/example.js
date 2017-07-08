module.exports = function(robot) {

  robot.hear(/alright/, function(res) {
    return res.send('mmhmmmm');
  });

  var lulz = ['lol', 'rofl', 'lmao'];
  robot.respond(/lol/i, function(res) {
    return res.send(res.random(lulz));
  });

  robot.hear(/Hello/i, function(res) {
    return res.send('Hey grl Hey!');
  });

  robot.hear(/sad/i, function(res) {
    return res.send("If it don't pay your bills, then pay it no mind");
  });

  robot.hear(/go/i, function(res) {
    return res.send('Start your engines');
  });

  robot.topic(function(res) {
    return res.send(res.message.text + "? Where are we going with this?");
  });
  enterReplies = ['Hi', 'Target Acquired', 'Hello friend.', 'I see you'];
  leaveReplies = ['Are you still there?', 'Bye Felicia', 'Wait what'];

  robot.enter(function(res) {
    return res.send(res.random(enterReplies));
  });

  robot.leave(function(res) {
    return res.send(res.random(leaveReplies));
  });

  robot.respond(/you are a little slow/, function(res) {
    return setTimeout(function() {
      return res.send("Who you calling 'slow'?");
    }, 6 * 1000);
  });

  canIntervalId = null;

  robot.respond(/I can't/, function(res) {
    if (canIntervalId) {
      res.send("Believe in yourself!");
      return;
    }
    res.send("You don't really think that?");
    return canIntervalId = setInterval(function() {
      return res.send("Believe in yourself");
    }, 1000);
  });

  robot.respond(/I can/, function(res) {
    if (canIntervalId) {
      res.send("Yay! Course you can!");
      clearInterval(canIntervalId);
      return canIntervalId = null;
    } else {
      return res.send("Isn't that what I told you??");
    }
  });

  annoyIntervalId = null;

  robot.respond(/annoy me/, function(res) {
    if (annoyIntervalId) {
      res.send("AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH");
      return;
    }
    res.send("Hey, want to hear the most annoying sound in the world?");
    return annoyIntervalId = setInterval(function() {
      return res.send("AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH");
    }, 1000);
  });

  robot.respond(/unannoy me/, function(res) {
    if (annoyIntervalId) {
      res.send("GUYS, GUYS, GUYS!");
      clearInterval(annoyIntervalId);
      return annoyIntervalId = null;
    } else {
      return res.send("Not annoying you right now, am I?");
    }
  });

};
