// システム全体で使用する型定義
export interface Command {
    command: string;
    timestamp: number;
    source: 'voice' | 'chat';
}

export interface RecognitionLog {
    command: string;
    confidence: number;
    timestamp: number;
    id: string;
}

export interface SystemStatus {
    picoConnected: boolean;
    colabConnected: boolean;
    lstUpdate: number;
}

export type CommandType = 'LEFT' | 'RIGHT' | 'FORWARD' | 'STOP' | 'GO';

export const VALID_COMMANDS: CommandType[] = ['LEFT', 'RIGHT', 'FORWARD', 'STOP', 'GO'];
