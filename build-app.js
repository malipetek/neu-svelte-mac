const execa = require('execa');
const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const { IconIcns } = require('@shockpkg/icon-encoder');

(async () => {
  const icns = new IconIcns();
  const raw = true;
  
  await execa(
    path.resolve(
      __dirname,
      "node_modules",
      "rollup",
      "dist",
      "bin",
      "rollup"
    ),
    [`-c`],
    {
      env: { 
      }
    }
  );

  // run neu build command
  await execa('neu', [ 'build' ]);

  await new Promise(done => setTimeout(done, 2000));
  
  // build done read neutralino.config.js file
  const config = await fs.readJSON(path.resolve(process.cwd(), 'neutralino.config.json'));
  const appname = config.cli.binaryName;
  const binaryName = `${config.cli.binaryName}-mac_x64`;
  
  // read package.json
  const pkg = await fs.readJSON(path.resolve(process.cwd(), 'package.json'));

  // remove old app folder
  await new Promise(done => rimraf(path.resolve(process.cwd(), `${appname}.app`), fs, done));

  // create app folder
  await fs.mkdir(path.resolve(process.cwd(), `${appname}.app`));
  await fs.mkdir(path.resolve(process.cwd(), `${appname}.app`, 'Contents'));
  await fs.mkdir(path.resolve(process.cwd(), `${appname}.app`, 'Contents', 'MacOS'));
  await fs.mkdir(path.resolve(process.cwd(), `${appname}.app`, 'Contents', 'Resources'));

  // move binary to app folder
  await fs.move(path.resolve(process.cwd(), 'dist', appname, binaryName), path.resolve(process.cwd(), `${appname}.app`, 'Contents', 'MacOS', binaryName));
  await fs.rename(path.resolve(process.cwd(), `${appname}.app`, 'Contents', 'MacOS', binaryName), path.resolve(process.cwd(), `${appname}.app`, 'Contents', 'MacOS', appname));
  
  // move res.neu to app folder
  await fs.move(path.resolve(process.cwd(), 'dist', appname, 'res.neu'), path.resolve(process.cwd(), `${appname}.app`, 'Contents', 'MacOS', 'res.neu'));
  
  // check if file exists
  if (fs.existsSync(path.resolve(process.cwd(), 'src', 'icons', 'appIcon.png'))) { 
    const iconFile = (await fs.readFile(path.resolve(process.cwd(), 'src', 'icons', 'appIcon.png')));
    icns.addFromPng(iconFile, ['ic09'], raw);
    // icns.addFromPng(iconFile, ['ic07'], raw);
    // icns.addFromPng(iconFile, ['ic08'], raw);
    // icns.addFromPng(iconFile, ['ic04'], raw);
    // icns.addFromPng(iconFile, ['ic09'], raw);
    // icns.addFromPng(iconFile, ['ic05'], raw);
    // icns.addFromPng(iconFile, ['ic12'], raw);
    // icns.addFromPng(iconFile, ['ic13'], raw);
    // icns.addFromPng(iconFile, ['ic14'], raw);
    // icns.addFromPng(iconFile, ['ic10'], raw);
    // icns.addFromPng(iconFile, ['ic11'], raw);
  }
  // save icns file
  await fs.writeFile(path.resolve(process.cwd(), `${appname}.app`, 'Contents', 'Resources', 'icon.icns'), icns.encode());

  // create an empty icon file in the app folder
  await fs.ensureFile(path.resolve(process.cwd(), `${appname}.app`, 'Icon'));

  // create info.plist file
  await fs.writeFile(path.resolve(process.cwd(), `${appname}.app`, 'Contents', 'info.plist'),
    `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>NSHighResolutionCapable</key>
        <true/>
        <key>CFBundleExecutable</key>
        <string>${appname}</string>
        <key>CFBundleGetInfoString</key>
        <string>${pkg.name}</string>
        <key>CFBundleIconFile</key>
        <string>icon.icns</string>
        <key>CFBundleIdentifier</key>
        <string>${config.applicationId}</string>
        <key>CFBundleName</key>
        <string>${pkg.name}</string>
        <key>CFBundlePackageType</key>
        <string>APPL</string>
        <key>LSMinimumSystemVersion</key>
        <string>10.13.0</string>
        <key>NSAppTransportSecurity</key>
        <dict>
            <key>NSAllowsArbitraryLoads</key>
            <true/>
        </dict>
    </dict>
    </plist>`
  );
  
  await new Promise(done => rimraf(path.resolve(__dirname, "dist"), done));

})();