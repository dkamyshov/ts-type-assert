import { spawn } from 'child_process';

interface TypeCheckerOptions {
  /**
   * Timeout before failing.
   */
  timeout?: number;
}

/**
 * TypeScript type checking result.
 */
interface TypeCheckerResult {
  /**
   * Type checker exit code.
   */
  code: number | null;

  /**
   * Type checker output (stdout).
   */
  output: string;
}

/**
 * Invokes TypeScript type checker.
 *
 * @param filename path to TypeScript file
 */
export const invokeTypeChecker = (
  filename: string,
  options?: TypeCheckerOptions
): Promise<TypeCheckerResult> => {
  return new Promise((resolve, reject) => {
    const process = spawn(`yarn`, ['tsc', '--noEmit', filename]);

    const failTimeout =
      (options &&
        options.timeout &&
        setTimeout(() => {
          reject(new Error('Type checker timed out'));
        }, options.timeout)) ||
      null;

    let output = '';

    process.stdout.on('data', data => {
      output += data.toString();
    });

    process.on('exit', code => {
      if (failTimeout !== null) {
        clearTimeout(failTimeout);
      }

      resolve({
        code,
        output,
      });
    });
  });
};
