export const importHTML = data => {
  if (data != null) {
    if (Array.isArray(data)) {
      return data.map(elem => importHTML(elem));
    } else if (typeof data === 'object') {
      return Object.entries(data).reduce((acc, [k, v]) => {
        if (Array.isArray(v)) acc[k] = v.map(elem => importHTML(elem));
        else acc[k] = importHTML(v);
        return acc;
      }, {});
    } else {
      return data.toString().replace(/(<([^>]+)>|\n)/gi, '');
    }
  } else return '';
};

export const highlighter = (data, keys, query, field) => {
  return data.map(item => {
    const element = field == null ? item : item[field];
    const values = keys.reduce((acc, cur) => {
      const text = importHTML(element[cur]);
      const start = text.toLowerCase().indexOf(query.toLowerCase());
      const end = start + query.length;
      if (query && start !== -1) {
        const mark = `<mark class="highlight">${text.substring(start, end)}</mark>`;
        const highlighted = `${text.substring(0, start)}${mark}${text.substring(end)}`;
        acc[cur] = highlighted;
      } else {
        acc[cur] = text;
      }
      return acc;
    }, {});
    return field == null
      ? { ...item, ...values }
      : { ...item, [field]: { ...item[field], ...values } };
  });
};
