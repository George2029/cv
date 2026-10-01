// 50 / 100
// x / 40

export function collectWidths({ shares }: { shares: number[] }) {
  shares.map((s) => s / 2);

  return shares.reduce((pr, cv) => {
    console.log(cv);
    const width = cv / 2;
    pr.push(width);
    return pr;
  }, [] as number[]);
}
