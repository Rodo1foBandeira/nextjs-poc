export const parseSearchParams = <T>(searchParams: string, match: RegExp): T => {
  let obj:any = {};
  const params = new URLSearchParams(searchParams);

  params.forEach((value, key) => {
    const matches = key.match(match);

    if (matches) {
      let [, field, property] = matches;

      if (!obj[field]) {
        obj[field] = {} as T[keyof T];
      }

      obj[field][property] = value as T[keyof T][keyof T[keyof T]];
    }
  });

  return obj as T;
};
