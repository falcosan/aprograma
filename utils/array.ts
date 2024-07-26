type FilterFunction<T> = (value: T) => boolean;
type Filters<T> = Record<string, FilterFunction<T>>;

type Item = {
  [key: string]: unknown;
}

export const multipleFilters = <T extends Item>(
  array: T[],
  filters: Filters<unknown>,
  field?: string
): T[] => {
  const filterKeys = Object.keys(filters);

  return array.filter(item => {
    return filterKeys.some(key => {
      const filterFn = filters[key];
      if (typeof filterFn !== 'function') return true;

      const element = field ? (item[field] as Item)?.[key] : item[key];
      return filterFn(element);
    });
  });
};
