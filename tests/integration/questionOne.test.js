import config from '#root/config';
import SEBEUsecase from '#src/usecase';

const usecase = new SEBEUsecase();

describe('Given a list of users', () => {
  describe('When a user is in a private group and is created in November 21', () => {
    it('Write a formatted list of users to csv', () => {
      const expected = 'successful';
      const actual = usecase.questionOne();

      expect(actual).toEqual(expected);
    });
  });
});
