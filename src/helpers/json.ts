export const safeJsonParse = <T>(json: string | null) => {
  try {
    if (!json) return undefined;

    const jsonValue: T = JSON.parse(json);

    return jsonValue;
  } catch {
    return undefined;
  }
};
