export const parseNumberStrings = (payload: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(payload).map(([key, value]) => {
      if (typeof value === 'string' && !isNaN(Number(value))) {
        return [key, Number(value)];
      } else {
        return [key, value];
      }
    }),
  );
