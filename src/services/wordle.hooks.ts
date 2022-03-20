import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import { getWordleDatas } from './wordle.api';
import { GAME_PROGRESS_TIME } from 'constants/time';

export function useWordleQuery(
  options:
    | UseQueryOptions<string[], AxiosError<unknown>, string[]>
    | undefined = {},
) {
  return useQuery<string[], AxiosError>(['wordle'], getWordleDatas, {
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: GAME_PROGRESS_TIME,
    ...options,
  });
}
