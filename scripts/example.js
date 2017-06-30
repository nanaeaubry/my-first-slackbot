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
    }, 60 * 100);
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

  robot.router.post('/hubot/chatsecrets/:room', function(req, res) {
    var data, room, secret;
    room = req.params.room;
    data = JSON.parse(req.body.payload);
    secret = data.secret;
    robot.messageRoom(room, "I have a secret: " + secret);
    return res.send('OK');
  });

  robot.error(function(err, res) {
    robot.logger.error("DOES NOT COMPUTE");
    if (res != null) {
      return res.reply("DOES NOT COMPUTE");
    }
  });

  robot.respond(/have a soda/i, function(res) {
    var sodasHad;
    sodasHad = robot.brain.get('totalSodas') * 1 || 0;
    if (sodasHad > 4) {
      return res.reply("I'm too fizzy..");
    } else {
      res.reply('Sure!');
      return robot.brain.set('totalSodas', sodasHad + 1);
    }
  });

  //   robot.respond(/open the (.*) doors/i, function(res) {
  //     var doorType;
  //     doorType = res.match[1];
  //     if (doorType === "pod bay") {
  //       return res.reply("I'm afraid I can't let you do that.");
  //     } else {
  //       return res.reply("Opening " + doorType + " doors");
  //     }
  //   });

  //   return robot.respond(/sleep it off/i, function(res) {
  //     robot.brain.set('totalSodas', 0);
  //     return res.reply('zzzzz');
  //   });
};
