/**
 * テレメトリデータストア（シングルトン）
 * 全てのAPI Routesで共有されるデータストア
 */

const globalForTelemetry = global as unknown as { telemetryStore: TelemetryStore };

class TelemetryStore {
    private history: any[] = [];
    private readonly MAX_HISTORY = 100;

    constructor() { }

    addData(data: any): void {
        this.history.push(data);
        if (this.history.length > this.MAX_HISTORY) {
            this.history.shift();
        }
    }

    getHistory(count?: number): any[] {
        if (count) {
            return this.history.slice(-Math.min(count, this.history.length));
        }
        return [...this.history];
    }

    getLatest(): any | null {
        return this.history.length > 0 ? this.history[this.history.length - 1] : null;
    }

    clear(): number {
        const count = this.history.length;
        this.history = [];
        return count;
    }

    getStats() {
        if (this.history.length === 0) {
            return null;
        }

        const errors = this.history
            .filter((d) => d.control?.error !== undefined)
            .map((d) => d.control.error);

        const leftSpeeds = this.history
            .filter((d) => d.motor?.left_speed !== undefined)
            .map((d) => d.motor.left_speed);

        const rightSpeeds = this.history
            .filter((d) => d.motor?.right_speed !== undefined)
            .map((d) => d.motor.right_speed);

        return {
            total_records: this.history.length,
            avg_error: errors.length > 0 ? errors.reduce((a, b: any) => a + b, 0) / errors.length : 0,
            max_left_speed: leftSpeeds.length > 0 ? Math.max(...leftSpeeds) : 0,
            max_right_speed: rightSpeeds.length > 0 ? Math.max(...rightSpeeds) : 0,
            min_left_speed: leftSpeeds.length > 0 ? Math.min(...leftSpeeds) : 0,
            min_right_speed: rightSpeeds.length > 0 ? Math.min(...rightSpeeds) : 0,
        };
    }
}

export const telemetryStore = globalForTelemetry.telemetryStore || new TelemetryStore();

if (process.env.NODE_ENV !== 'production') globalForTelemetry.telemetryStore = telemetryStore;
