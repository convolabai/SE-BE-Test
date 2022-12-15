import { UserTestCollection } from '#tests-data/user';
import config from '#root/config';

describe('Test 1', () => {
  it('Test details', () => {
    console.log(UserTestCollection);
    console.log(config.mongo);
    expect(1 + 3).toEqual(2);
  });
});
