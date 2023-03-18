import { ErrorException } from '../types';

type messageError = {
  file: string;
  func: string;
  error: ErrorException;
};

export default class Logger {
  static error = ({ file, func, error }: messageError) => {
    console.error({
      time: new Date().toLocaleString(),
      file: file.replace(/^.*[\\\/]/, ''),
      func,
      error: error.message,
      stack: error.stack,
    });
  };
}
