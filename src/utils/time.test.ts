import { describe, expect, it } from 'vitest';
import { formatDateTime } from './time';

// Ensure deterministic locale formatting in tests
process.env.TZ = 'UTC';

describe('formatDateTime', () => {
  it('formats date into expected short string', () => {
    const date = new Date(Date.UTC(2024, 5, 15, 8, 9, 10));
    expect(formatDateTime(date)).toBe('Sat Jun 15 08:09:10');
  });
});
