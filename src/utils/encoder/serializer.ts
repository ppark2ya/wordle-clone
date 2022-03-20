import { Buffer } from 'buffer';

const serializer = (state: any) => {
  const buf = Buffer.from(JSON.stringify(state), 'utf8');
  return buf.toString('base64');
};

export default serializer;
