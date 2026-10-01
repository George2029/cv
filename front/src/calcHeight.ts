// area of isosceles trapezoid = a * h + (b-a / 2) * h = ah + bh/2 - ah/2 = h (a + b/2 - a/2) = h * (b+a)/2
// a - bottom, b - top
// our total area = S = (a + b) * 50 = 50a = 5000
// first share, 40
// 0.4 * 5000 = 2000
// a = 100, b = 0
// h = 20 => b = 80 => b+a / 2 * h = 180 / 2 * 20 = 1800
// (a + b) * h / 2 => (a + (a-h)) * h / 2
// ((a + (a-h)) * h / 2) = k * S
// (2a-h) * h / 2 = kS
// ah-h^2/2 = kS
// h^2 - 2ah + 2kS = 0
//
//
//

export function calcHeight({
  lastBase = 100,
  share,
}: {
  lastBase: number;
  share: number;
}): number {
  console.log(`share:`, share);
  console.log(`lastBase:`, lastBase);
  let h = Math.sqrt(Math.pow(lastBase, 2) - 10000 * share) + lastBase;
  let h2 = lastBase - Math.sqrt(Math.pow(lastBase, 2) - 10000 * share);
  console.log(`h:`, h);
  console.log(`h2:`, h2);

  return h < 0 || h > 100 ? h2 : h > h2 ? h2 : h;
}
