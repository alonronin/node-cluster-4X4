const cluster = require('cluster');
const { cpus } = require('os');

const runInCluster = (fanctionality, workers = cpus().length) => {
  if(cluster.isMaster) {
    for(let i = 0; i < workers; i++) {
      cluster.fork()
    }

    cluster.on('online', (worker) => {
      console.log(`Process ${worker.process.pid} in online`);
    });

    cluster.on('exit', (worker, code) => {
      console.log(`Process ${worker.process.pid} is exited with code ${code}`);
      cluster.fork();
    });
  } else {
    fanctionality();
  }
};

module.exports = {
  runInCluster
};
