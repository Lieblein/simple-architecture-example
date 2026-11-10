export default function classNames(...args: Array<undefined | string | Record<string, boolean>>) {
  return args
    .filter(Boolean)
    .map((item) => typeof item === 'string' ? item : Object.values(item as object))
    .flat()
    .join(' ');
}