import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useWindowManager } from './useWindowManager';

describe('useWindowManager', () => {
  it('opens and focuses apps while preserving open order', () => {
    const { result } = renderHook(() => useWindowManager());

    act(() => {
      result.current.toggleApp('projects');
    });

    expect(result.current.openApps).toEqual(['projects']);
    expect(result.current.focusedApp).toBe('projects');

    act(() => {
      result.current.toggleApp('about');
    });

    expect(result.current.openApps).toEqual(['projects', 'about']);
    expect(result.current.focusedApp).toBe('about');

    act(() => {
      result.current.toggleApp('projects');
    });

    expect(result.current.focusedApp).toBe('projects');
  });

  it('removes apps and clears focus when closing the active window', () => {
    const { result } = renderHook(() => useWindowManager());

    act(() => result.current.toggleApp('projects'));
    expect(result.current.focusedApp).toBe('projects');

    act(() => result.current.toggleApp('about'));
    expect(result.current.focusedApp).toBe('about');

    act(() => result.current.focusApp('projects'));
    expect(result.current.focusedApp).toBe('projects');

    act(() => result.current.closeApp('projects'));
    expect(result.current.openApps).toEqual(['about']);
    expect(result.current.focusedApp).toBeNull();
  });
});
