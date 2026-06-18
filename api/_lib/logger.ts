type LogLevel = 'info' | 'warn' | 'error';

type FormLogMeta = Record<string, unknown>;

export function logFormEvent(
  level: LogLevel,
  endpoint: string,
  event: string,
  meta?: FormLogMeta,
): void {
  const payload = {
    scope: 'form',
    endpoint,
    event,
    ...meta,
  };

  if (level === 'error') {
    console.error(`[form:${endpoint}] ${event}`, payload);
    return;
  }

  if (level === 'warn') {
    console.warn(`[form:${endpoint}] ${event}`, payload);
    return;
  }

  console.log(`[form:${endpoint}] ${event}`, payload);
}
