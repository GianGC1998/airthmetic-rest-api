import axios from 'axios';
import { throwError } from './exception.helper';
import { Logger } from '../singleton';

async function getStringRandom(): Promise<string> {
  try {
    const response = await axios.get('https://www.random.org/strings', {
      params: {
        num: 1,
        len: 10,
        digits: 'on',
        upperalpha: 'on',
        loweralpha: 'on',
        unique: 'on',
        format: 'plain',
        rnd: 'new',
      },
    });
    return response.data;
  } catch (error) {
    Logger.error({
      file: __filename,
      func: 'getStringRandom',
      error,
    });
    throwError(
      'There was an error at get the random string. Please, contact to support',
    );
  }
}

export const RandomHelper = {
  getStringRandom,
};
