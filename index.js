const Mysql = require('@translated/db-connection');
var _ = require('lodash');

require('dotenv').config();

const database = new Mysql.default(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:3306/${process.env.DB_NAME}`);

// const query = "CREATE TABLE authtoken (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) not null, token VARCHAR(255) not null, tos BOOLEAN not null default 1)";
const querySelect = "SELECT * FROM authtoken";

// const q = database.select(querySelect);

// const t = q.then((res) => {
//     console.log(res);
// });

// console.log(tawait);

// const s = async() => {
//     const v = await database.select(querySelect);
    
//     console.log(v);
// }

// s();

// let test = Buffer.from('ewogICAgIkNoaWNrZW4iOiAiZG9nIgp9\n', 'base64');
// console.log(test.toString());

const desc1 = {
    on: { branches: [ 'dev' ] },
    pull_requests: { mode: 'pr_per_lang' },
    files: [
      {
        translation: 'professional',
        service_type: 'premium',
        source_pattern: 'src/res/en/*.json',
        source_locale: 'en-GB',
        target_pattern: 'src/res/{{locale}}/{{original_file}}',
        target_locales: ['it-IT']
      },
      {
        translation: 'professional',
        service_type: 'premium',
        source_pattern: 'src/main/resources/messages.properties',
        source_locale: 'en-GB',
        target_pattern: 'src/main/resources/messages_{{locale}}.properties',
        target_locales: ['it-IT', 'fr-FR']
      }
    ]
  };

const desc2 = {
    on: { branches: [ 'main' ] },
    pull_requests: { mode: 'pr_per_lang' },
    files: [
      {
        translation: 'professional',
        service_type: 'premium',
        source_pattern: 'src/res/en/*.json',
        source_locale: 'en-GB',
        target_pattern: 'src/res/{{locale}}/{{original_file}}',
        target_locales: ['it-IT', 'fr-FR', 'pr-PR'],
      },
      {
        translation: 'professional',
        service_type: 'premium',
        source_pattern: 'src/main/resources/messages.properties',
        source_locale: 'en-GB',
        target_pattern: 'src/main/resources/messages_{{locale}}.properties',
        target_locales: ['it-IT', 'fr-FR'],
      }
    ]
  }

const objectDiff = (obj1, obj2)  => {  
    let returnedObj = {}; 
    _.each(obj1, (value, key) => { 
        if(obj2[key] === value) { 
            return;
        } 
        let val = _.isObject(value) ? objectDiff(value, obj2[key]) : value;
        if (!_.isObject(val) || _.keys(val).length > 0) returnedObj[key]=val;
    });
    return returnedObj;     
}     

// let bb = objectDiff(desc2, desc1);
// bb.files = Object.keys(bb.files).map(key => {
//     return bb.files[key];
// });
// console.log(bb);
let v = _.differenceWith(desc2.files, desc1.files, _.isEqual)
// console.log(v);
// const gg = ['it-IT', 'fr-FR'];
// console.log(_.differenceWith(v[0].target_locales, gg, _.isEqual));

for(let i = 0; i < v.length; i++) {
    loopDesc2:
    for(let j = 0; j < desc1.files.length; j++) {
        if(v[i].source_pattern === desc1.files[j].source_pattern) {
            const targetDiff = _.differenceWith(v[i].target_locales, desc1.files[j].target_locales, _.isEqual);
            desc1.files[j].target_locales = targetDiff;
            break loopDesc2;
        }
    }
}

// console.log(desc1.files);
desc1.files.splice(1);
console.log(desc1.files);
console.log(_.isEqual(['1', '3'], ['1', '3']));


