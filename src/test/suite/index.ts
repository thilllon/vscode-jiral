import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({ ui: 'tdd', color: true });

  const testsRoot = path.resolve(__dirname, ' ..');

  return new Promise((callback, error) => {
    glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
      if (err) {
        return error(err);
      }

      // Add files to the test suite
      files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

      try {
        // Run the mocha test
        mocha.run((failures) => {
          if (failures > 0) {
            error(new Error(`${failures} tests failed.`));
          } else {
            callback();
          }
        });
      } catch (err) {
        console.error(err);
        error(err);
      }
    });
  });
}
