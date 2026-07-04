export function populate(input: string, ...args: string[]): string {
  let i: number = 0;
  while (input.includes("${}")) {
    if (i > args.length) break;
    if (!input.includes("${}")) break;
    
    input = input.replace("${}", args[i]);
    i++;
  }

  return input;
}
