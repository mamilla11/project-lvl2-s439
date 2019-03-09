import renderDefault from './renderDefault';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

export default (diff, outputFormat) => {
  switch (outputFormat) {
    case 'plain':
      return renderPlain(diff);
    case 'json':
      return renderJson(diff);
    default:
      const test = renderDefault(diff);
      console.log(test);
      return test;
  }
};
