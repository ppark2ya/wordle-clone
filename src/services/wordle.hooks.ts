import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { getWordleDatas } from './wordle.api';

export function useWordleQuery(
  options:
    | UseQueryOptions<string[], AxiosError<unknown>, string[]>
    | undefined = {},
) {
  return useQuery<string[], AxiosError>(['wordle'], getWordleDatas, {
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  });
}
