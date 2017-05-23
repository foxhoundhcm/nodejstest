var redis = require('redis'),
    RDS_PORT = 6379,
    RDS_HOST = '192.168.1.200',
    RDS_OPTS = {},
    client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);

    client.on('ready',function(err){
      console.log('ready');

    })

    // client.set("urltest","I am a urltest",redis.print);
    client.get("urltest",function(err,reply){
      console.log(reply);
    });

    client.quit();
