import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, type LogEntry, type CommandResponse, type StatsResponse } from '../services/api';

export const useCommand = () => {
  return useQuery<CommandResponse>({
    queryKey: ['command'],
    queryFn: apiService.getCommand,
    refetchInterval: 1000, // 1秒ごとに更新
    staleTime: 500,
    retry: 1, // リトライ回数を制限
    retryDelay: 1000,
  });
};

export const useLogs = (limit: number = 20) => {
  return useQuery<LogEntry[]>({
    queryKey: ['logs', limit],
    queryFn: () => apiService.getLogs(limit),
    refetchInterval: 2000, // 2秒ごとに更新
    staleTime: 1000,
    retry: 1, // リトライ回数を制限
    retryDelay: 1000,
  });
};

export const useStats = () => {
  return useQuery<StatsResponse>({
    queryKey: ['stats'],
    queryFn: apiService.getStats,
    refetchInterval: 5000, // 5秒ごとに更新
    staleTime: 2000,
    retry: 1, // リトライ回数を制限
    retryDelay: 1000,
  });
};

export const useSendCommand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.sendCommand,
    onSuccess: () => {
      // コマンド送信後、関連データを即座に再取得
      queryClient.invalidateQueries({ queryKey: ['command'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
    onError: (error) => {
      console.error('Command send failed:', error);
    }
  });
};

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: apiService.healthCheck,
    refetchInterval: 30000, // 30秒ごとに更新
    retry: 1,
  });
};
