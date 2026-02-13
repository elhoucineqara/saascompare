
const dns = require('dns');

// Set to Google's Public DNS
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    console.log("DNS servers set to Google Config:", dns.getServers());
} catch (e) {
    console.error("Could not set DNS servers:", e);
}

const srvHostname = '_mongodb._tcp.cluster0.nikbbno.mongodb.net';
const shards = [
    'cluster0-shard-00-00.nikbbno.mongodb.net',
    'cluster0-shard-00-01.nikbbno.mongodb.net',
    'cluster0-shard-00-02.nikbbno.mongodb.net'
];

console.log(`Testing DNS SRV resolution for ${srvHostname}...`);

dns.resolveSrv(srvHostname, (err, addresses) => {
    if (err) {
        console.error("DNS SRV Resolution Error:", err.code);
    } else {
        console.log("SRV Records found:", addresses);
    }
});

console.log("\nTesting DNS A resolution for potential shards...");
shards.forEach(shard => {
    dns.resolve4(shard, (err, addresses) => {
        if (err) {
            console.error(`Failed to resolve ${shard}:`, err.code);
        } else {
            console.log(`Resolved ${shard}:`, addresses);
        }
    });
});
