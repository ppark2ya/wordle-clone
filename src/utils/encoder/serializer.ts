import { Buffer } from 'buffer';

const serializer = (state: unknown) => {
  const buf = Buffer.from(JSON.stringify(state), 'utf8');
  return buf.toString('base64');
};

export default serializer;
