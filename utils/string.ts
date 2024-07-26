type Data = string | Record<string, unknown> | Data[];
type HighlightItem = {
  [key: string]: unknown;
}

export const importHTML = (data: Data): string | Record<string, unknown> | string[] | Record<string, unknown>[] => {
  if (data == null) {
    return '';
  }

  if (Array.isArray(data)) {
    return data.map(elem => importHTML(elem)) as string[] | Record<string, unknown>[];
  } else if (typeof data === 'object') {
    return Object.entries(data).reduce<Record<string, unknown>>((acc, [k, v]) => {
      if (Array.isArray(v)) {
        acc[k] = v.map(elem => importHTML(elem)) as string[] | Record<string, unknown>[];
      } else {
        acc[k] = importHTML(v as Data);
      }
      return acc;
    }, {});
  } else {
    return data.toString().replace(/(<([^>]+)>|\n)/gi, '');
  }
};

export const highlighter = <T extends HighlightItem>(
  data: T[],
  keys: (keyof T)[],
  query: string,
  field?: keyof T
): T[] => {
  return data.map(item => {
    const element = field == null ? item : (item[field] as HighlightItem);
    const values = keys.reduce((acc, cur) => {
      const rawText = element[cur as string];
      const text = importHTML(rawText as Data) as string;
      const start = text.toLowerCase().indexOf(query.toLowerCase());
      const end = start + query.length;

      if (query && start !== -1) {
        const mark = `<mark class="highlight">${text.substring(start, end)}</mark>`;
        const highlighted = `${text.substring(0, start)}${mark}${text.substring(end)}`;
        acc[cur as string] = highlighted;
      } else {
        acc[cur as string] = text;
      }

      return acc;
    }, {} as Record<string, string>);

    return field == null
      ? { ...item, ...values }
      : { ...item, [field]: { ...(item[field] as HighlightItem), ...values } };
  });
};
