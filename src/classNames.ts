export default function classNames(...args: Array<undefined | string>) {
  return args
    .filter(Boolean)
    .join(' ');
}