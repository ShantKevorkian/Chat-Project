const Mysql = require('@translated/db-connection').default;
require('dotenv').config();
const database = require('./database');
var _ = require('lodash');
const { QueueManager, Producer, Message, Consumer } = require('redis-smq');
const config = require('./redis/config')

// QueueManager.createInstance(config, (err, queueManager) => {
//   if (err) console.log(err);
//   else {
//     // console.log(queueManager.queue.create('test_queue', false));
//     queueManager.queue.create('test_queue', false, (err) => console.log(err));
//   } 
// });

// const message = new Message();
// message.getQueue() // null;
// message.setQueue('test_queue');
// console.log(message.getQueue()); // { name: 'test_queue', ns: 'default' }

// const RedisSMQ = require("rsmq");
// const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

// // rsmq.createQueue({ qname: "myqueue" }, function (err, resp) {
// // 	if (err) {
// // 		console.error(err)
// // 		return
// // 	}

// // 	if (resp === 1) {
// // 		console.log("queue created")
// // 	}
// // });

// rsmq.listQueues(function (err, queues) {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}

// 	console.log("Active queues: " + queues.join( "," ) )
// });

// rsmq.sendMessage({ qname: "myqueue", message: "{hello: 'World'}"}, function (err, resp) {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}

// 	console.log("Message sent. ID:", resp);
// });

// rsmq.sendMessage({ qname: "myqueue", message: "{hello: 'Chicken'}"}, function (err, resp) {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}

// 	console.log("Message sent. ID:", resp);
// });

// rsmq.receiveMessage({ qname: "myqueue" }, function (err, resp) {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}

// 	if (resp.id) {
// 		console.log("Message received.", resp)
// 	} else {
// 		console.log("No messages for me...")
// 	}
// });

//  async function produce(mess, i) {

// let a = {
//   login: 'Shant',
//   test: 'main'
// }

// let b = {
//   login: 'Translated',
//   test: 'main'
// }

// let c = {
//   login: 'Shant',
//   test: 'dev'
// }

// let count = 0;
// const producer = new Producer(config);
// producer.run((err) => {
//   if (err) throw err;
//   const interval = setInterval(() => {
//     let body = count === 0 ? a : (count === 1 ? b : c);
//     let expiredTime = body.login === 'Shant' ? 1000 : 1000
//     const message = new Message();
//     message.setBody(body).setConsumeTimeout(3000).setQueue('test_queue');
//     message.getId() // null
//     producer.produce(message, (err) => {
//         if (err) console.log(err);
//         else {
//           const msgId = message.getId(); // string
//           console.log('Successfully produced. Message ID is ', msgId, 'Message: ', message.getBody());
//         }
//     });
//     count++;

//     if(count === 3) {
//       clearInterval(interval);
//     }
//   }, 500)
// });
// }

// let consumer_count = 0;
// const consumer = new Consumer(config);

// let temp = [];
// let pending = {shant: 'main'};
// const messageHandler = async (msg, cb) => {
//   let payload = msg.getBody();
//   temp.push(payload);
//   // if(payload.login === 'Shant') {
//     if(pending.hasOwnProperty('shant')) {
//       setTimeout(() => {
//         intake(temp, msg);
//       }, 10000);
//     }
  // }
  // else if(payload.login === 'Translated') {
    // setTimeout(() => {
    //   intake2(temp, msg);
    // }, 10000);
  // }
  // cb(); // acknowledging the message
// };

// consumer.consume('test_queue', messageHandler, (err) => {
//   if (err) console.error(err);
// });

// consumer.run((err, status) => {
//   if(err) console.error(err);
// });

// function intake(temp, msg) {
//   // const payload = msg.getBody();
//   // if(payload) {
//   //   consumer_count++;
//   //   console.log('Message payload', payload, 'ID', msg.getId());
//   // }
//   delete[shant];
//   console.log(temp);
// }

// function intake2(temp, msg) {
//   const payload = msg.getBody();
//   if(payload) {
//     consumer_count++;
//     console.log('Message payload', payload, 'ID', msg.getId());
//   }
//   temp.push(payload);
//   console.log(temp);
// }

// console.log(messageHandler());

// for(let i = 0; i < 2; i++) {
  //   let message = 'test';
  //   if(i === 1) {
  //     message = 'bull';
  //   } else if(i === 2) {
  //     message = 'chicken';
  //   }
  //  produce(message, i);
// }
  


// setTimeout(() => {
//   consume();
// }, 4000);
// async function gg() {
//   await consume();
// }

// gg();


// const funcDb = async () => {
//     const test = await database.select('SELECT * from tos_connector_github_api_keys');
//     console.log(test);

//     // await database.end();
// };

// const funcDb1 = async () => {
//     // await database.end();
//     // console.log(await database.pool.getConnection());
//     const test = await database.select('SELECT * from tos_connector_github_descriptors');
//     console.log(test);

//     // await database.end();
// };

// async function test() {
//     try {
//         await funcDb();
//         await funcDb1();
//         database.end();

//         const databasee = new Mysql(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:3306/${process.env.DB_NAME}`, Function.prototype, { decimalNumbers: true });
//         console.log(await databasee.pool.getConnection());
//         databasee.pool.on('release', function (connection) {
//             console.log('Connection %d released', connection.threadId);
//         });
//     } catch (err) {
//         console.log(err);
//     }
// }


// test();

// const query = "CREATE TABLE authtoken (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) not null, token VARCHAR(255) not null, tos BOOLEAN not null default 1)";
// const querySelect = "SELECT * FROM authtoken";

// const q = database.select(querySelect);

const file1 = [
  {
    "translation": "professional",
    "service_type": "premium",
    "source_pattern": "src/res/en.json",
    "source_locale": "en-GB",
    "target_pattern": "src/res/{{locale}}.json",
    "target_locales": [
      "fr-FR",
      "it-IT",
      "pt-PT",
    ]
  },
  {
    "translation": "professional",
    "service_type": "premium",
    "source_pattern": "doc/*.md",
    "source_locale": "en-GB",
    "source_exclude": [
      "doc/docs.md"
    ],
    "target_pattern": "doc/{{original_file_name}}_{{locale}}.md",
    "target_locales": [
      "it-IT",
    ]
  }
];

const file2 = [
  {
    "translation": "professional",
    "service_type": "premium",
    "source_pattern": "src/res/en.json",
    "source_locale": "en-GB",
    "target_pattern": "src/res/{{locale}}.json",
    "target_locales": [
      "fr-FR",
      "it-IT",
      "pt-PT",
      "ar-EG"
    ]
  },
  {
    "translation": "professional",
    "service_type": "premium",
    "source_pattern": "doc/*.md",
    "source_locale": "en-GB",
    "source_exclude": [
      "doc/docs.md"
    ],
    "target_pattern": "doc/{{original_file_name}}_{{locale}}.md",
    "target_locales": [
      "it-IT",
      "fr-FR"
    ]
  }
];


let fileDiff = _.differenceWith(file2, file1, _.isEqual);

console.log(file2);
console.log(file1);

// console.log(fileDiff);

