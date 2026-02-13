
const mongoose = require('mongoose');

const hosts = [
    'ac-vpcn4iq-shard-00-00.nikbbno.mongodb.net:27017',
    'ac-vpcn4iq-shard-00-01.nikbbno.mongodb.net:27017',
    'ac-vpcn4iq-shard-00-02.nikbbno.mongodb.net:27017'
];

const uri = `mongodb://elhoucineqara114_db_user:eKSWzSmEbJjibzsa@${hosts.join(',')}?ssl=true&authSource=admin`;
// Note: We are omitting replicaSet initially to let the driver discover it, or we can catch the warning.
// Ideally we should know it. It is likely 'atlas-vpcn4iq-shard-0' based on the hostname, but let's test.

console.log("Testing Standard Connection String...");
console.log("URI:", uri.replace(/:([^:@]+)@/, ':****@')); // Hide password in logs

mongoose.connect(uri)
    .then(() => {
        console.log("Mongoose connected successfully!");
        // Connection is established, let's try to get the replica set name from the connection
        const admin = new mongoose.mongo.Admin(mongoose.connection.db);
        admin.command({ replSetGetStatus: 1 }).then(info => {
            console.log("Replica Set Name:", info.set);
            mongoose.disconnect();
        }).catch(err => {
            console.log("Could not get replica set status (might be permissions), but connected.");
            mongoose.disconnect();
        });
    })
    .catch(err => {
        console.error("Mongoose Connection Error:", err);
        process.exit(1);
    });
