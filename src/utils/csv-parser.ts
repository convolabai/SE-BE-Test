export default function parseCSV(data: any[], headers?: string[]): string {
  return [headers?.length ? headers : Object.keys(data[0])]
    .concat(data)
    .map((row) => Object.values(row).toString())
    .join('\r\n')
}
