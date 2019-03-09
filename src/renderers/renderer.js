import renderDefault from './renderDefault';
import renderPlain from './renderPlain';

export default (diff, outputFormat) => {
  switch (outputFormat) {
    case 'plain':
      return renderPlain(diff);
    default:
      return renderDefault(diff);
  }
};
