import axios from 'utils/axios';

export async function getWordleDatas() {
  const { data } = await axios.get('');
  return data;
}
