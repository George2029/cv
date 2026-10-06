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
// h^2 - 2ah + 10000k = 0
// D = b^2-4ac
// D = (-2a)^2 - 40000k
// h1,h2 = (-b +- sqrt(D) / 2a
// h1,h2 = (2a +- sqrt(4a^2 - 40000*k)) / 2)
// h1,h2 = a +- sqrt(a^2 - 10000*k)
//
// b = a - h; b >= 0
// h1 into b:
// a - (a+sqrt(a^2-10000k)) = a-sqrt(a^2-10000k)
// h2 into b:
// a - (a-sqrt(a^2-10000k)) = a+sqrt(a^2-10000k) <- could never be below zero
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

  const a = Math.trunc(lastBase * 1_000) / 1_000;
  const k = Math.trunc(share * 1_000) / 1_000;
  const h = a - Math.sqrt(Math.pow(a, 2) - 10_000 * k);
  return h;
}
