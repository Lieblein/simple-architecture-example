export default function classNames(...args: Array<undefined | string | Record<string, boolean>>) {
  return args
    .flatMap((item) => {
      if (!item) {
        return [];
      }

      if (typeof item === 'string') {
        return [item];
      }

      return Object.keys(item).filter((key) => item[key]);
    })
    .join(' ');
}
