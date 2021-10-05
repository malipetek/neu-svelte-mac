module.exports = Neutralino => (command) => { 
  return new Promise((done, reject) => {
      Neutralino.os.runCommand(`${command} || echo error`, (data) => {
          console.log('data ', data);
          if(/error/.test(data.stdout)) {
              reject(data.stdout);
          }
          done(data.stdout);
      }, (err) => {
          console.log('err ', err);
          reject(err.stderr);
      });
  });
}