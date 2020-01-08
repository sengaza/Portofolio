/*eslint-disable */

jest.mock('rn-fetch-blob', () => ({
    config : jest.fn(),
    DocumentDir : jest.fn()
  }));
  