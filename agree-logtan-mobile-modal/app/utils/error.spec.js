import errors from './errors';

describe('Error Center bind all messages in development mode', () => {
  errors.managerEnvironment = jest.fn(() => Promise.resolve('development'));
  test('Error Status 500', async () => {
    const apiMessage = {
      errorHeader: 'Tidak Ada Koneksi',
      error: {
        statusCode: 1,
        message: 'Anda tidak memiliki koneksi internet'
      }
    };
    const result = await errors.messageDisplayingMode(apiMessage);
    expect(result).toMatchObject({
      errorMessage: 'Anda tidak memiliki koneksi internet',
      header: 'Tidak Ada Koneksi'
    });
  });
});
