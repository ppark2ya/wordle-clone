import { Buffer } from 'buffer';

const deserializer = (serializedString: string) => {
  const buf = Buffer.from(serializedString, 'base64');
  return JSON.parse(buf.toString('utf8'));
};

export default deserializer;
