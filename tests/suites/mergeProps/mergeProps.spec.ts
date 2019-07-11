import { resolve } from 'path';
import { invokeTypeChecker } from '../../runner';

describe('mergeProps', () => {
  it('merges props successfully', async () => {
    const result = await invokeTypeChecker(
      resolve(__dirname, 'mergeProps.success.ts')
    );
    expect(result.code).toBe(0);
  });

  it('fails to merge props because prop "a" overlaps', async () => {
    const result = await invokeTypeChecker(
      resolve(__dirname, 'mergeProps.fail.ts')
    );

    expect(result.code).not.toBe(0);
    expect(result.output).toContain('__properties: "a";');
  });
});
