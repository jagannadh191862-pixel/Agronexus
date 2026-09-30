import { INITIAL_SENSORS } from '../data/sensors';
import { SensorRecord } from '../types';

export class SensorValidationService {
  private sensors: SensorRecord[];
  private quarantinedCount: number = 0;

  constructor() {
    this.sensors = [...INITIAL_SENSORS];
  }

  public getSensors(): SensorRecord[] {
    return [...this.sensors];
  }

  public validateReading(sensor: SensorRecord): {
    isValid: boolean;
    status: SensorRecord['status'];
    reason?: string;
  } {
    // Boundary check
    if (sensor.currentValue < sensor.minAllowed || sensor.currentValue > sensor.maxAllowed) {
      return {
        isValid: false,
        status: 'ANOMALY',
        reason: `Value ${sensor.currentValue}${sensor.unit} violates physical thermodynamic boundary [${sensor.minAllowed} to ${sensor.maxAllowed}${sensor.unit}].`
      };
    }

    // Normal agro-meteorological operating envelope
    if (sensor.currentValue < sensor.normalMin || sensor.currentValue > sensor.normalMax) {
      return {
        isValid: true,
        status: 'WARNING',
        reason: `Value ${sensor.currentValue}${sensor.unit} lies outside typical agro-climatic operating envelope [${sensor.normalMin} - ${sensor.normalMax}${sensor.unit}].`
      };
    }

    return {
      isValid: true,
      status: 'HEALTHY'
    };
  }

  public simulateSensorAnomaly(targetSensorId: string = 'S-007', anomalousValue: number = 180.0): SensorRecord[] {
    this.sensors = this.sensors.map(sensor => {
      if (sensor.id === targetSensorId) {
        return {
          ...sensor,
          currentValue: anomalousValue,
          status: 'QUARANTINED',
          isSimulatedAnomaly: true,
          lastUpdated: 'Just now (Anomalous)',
          quarantineReason: `Physical impossibility: Relative humidity cannot exceed 100% at sea-level atmospheric pressure (Current: ${anomalousValue}%). Quarantined by AgroNexus Telemetry Gatekeeper. Corrupted data isolated from Knowledge Graph.`
        };
      }
      return sensor;
    });
    this.quarantinedCount++;
    return [...this.sensors];
  }

  public resetSensors(): SensorRecord[] {
    this.sensors = [...INITIAL_SENSORS];
    this.quarantinedCount = 0;
    return [...this.sensors];
  }

  public getQuarantineStatus(): { hasQuarantined: boolean; count: number; quarantinedIds: string[] } {
    const quarantined = this.sensors.filter(s => s.status === 'QUARANTINED');
    return {
      hasQuarantined: quarantined.length > 0,
      count: quarantined.length,
      quarantinedIds: quarantined.map(s => s.id)
    };
  }
}

export const sensorValidationService = new SensorValidationService();
