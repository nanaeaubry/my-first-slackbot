module.exports = function(robot) {

  robot.hear(/alright/, function(res) {
    return res.send('mmmmhmmmm');
  });

  var lulz = ['lol', 'rofl', 'lmao'];
  robot.respond(/lol/i, function(res) {
    return res.send(res.random(lulz));
  });

  robot.hear(/Hello/i, function(res) {
    return res.send('Hey girl Hey!');
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

  canIId = null;
  robot.respond(/I can't/, function(res) {
    if (canIId) {
      res.send("You aren't listening to me!!!");
      return;
    }
    return canIId = setInterval(function() {
      return res.send("YES YOU CAN!!");
    }, 500);
  });

  robot.respond(/I can/, function(res) {
    if (canIId) {
      res.send("Yay! You can do it girl!");
      clearInterval(canIId);
      return canIId = null;
    } else {
      return res.send("Yeah no duh!");
    }
  });

  var target = robot.getUser("jason", stringWithUsername);
  var response = target.mention + ", that's sassy.";
  robot.sendMessage(message.channel, response);

};

}
