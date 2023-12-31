export const multipleFilters = (array, filters, field) => {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    return filterKeys.some(key => {
      if (typeof filters[key] !== 'function') return true;
      const element = field == null ? item[key] : item[field][key];
      return filters[key](element);
    });
  });
};
