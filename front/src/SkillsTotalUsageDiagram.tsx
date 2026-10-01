import { calcHeight } from "./calcHeight";

export function SkillsTotalUsageDiagram({
  stats,
}: {
  stats: Record<
    string,
    { totalTime: number; percentageShare: string; share: number }
  >;
}) {
  const sorted = Object.entries(stats).sort((a, b) => b[1].share - a[1].share);
  const shares = sorted.map((a) => a[1].share);
  const texts = sorted.map((a) => a[0]);
  const totalTime = sorted.map((a) => a[1].totalTime);
  console.log(`total time:`, totalTime);
  const percentageShares = sorted.map((a) => a[1].percentageShare);

  const trapezoidsData = shares.reduce(
    (pr, cv, i) => {
      let lastBase: number;
      let x1: number;
      let y1: number;

      if (pr.length == 0) {
        lastBase = 100;
        x1 = 0;
        y1 = 100;
      } else {
        const lastCoordinate = pr[i - 1];
        x1 = lastCoordinate.x2;
        y1 = lastCoordinate.y2;
        lastBase = 100 - x1 * 2;
      }

      const dy = calcHeight({ lastBase, share: cv });
      console.log(`dy:`, dy);
      const dx = dy / 2;

      const x2 = x1 + dx;
      const y2 = y1 - dy;
      const x3 = 100 - x2;
      const y3 = y2;
      const x4 = 100 - x1;
      const y4 = y1;

      pr.push({
        x1,
        y1,
        dx,
        dy,
        x2,
        y2,
        x3,
        y3,
        x4,
        y4,
      });

      return pr;
    },
    [] as {
      x1: number;
      y1: number;
      dx: number;
      dy: number;
      x2: number;
      y2: number;
      x3: number;
      y3: number;
      x4: number;
      y4: number;
    }[],
  );

  console.log("trapezoidsData:", trapezoidsData);

  const textStartCoordinates = trapezoidsData.map(({ x3, x2, y1, y2 }) => {
    const tx1 = (x2 + x3) / 2;
    const ty1 = (y2 + y1) / 2;
    return [tx1, ty1];
  });

  console.log("x1Dys:", trapezoidsData);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="650px"
      height="650px"
      viewBox="0 0 100 100"
    >
      <path
        d={"M0 100 L50 0 L100 100 Z"}
        strokeWidth={0.5}
        stroke="black"
        fill="none"
      />

      {...trapezoidsData.map(({ x1, y1, x2, y2, x3, y3, x4, y4 }, i) => {
        return (
          <g className="group">
            <path
              d={`M${x1} ${y1} L${x2} ${y2} L${x3} ${y3} L${x4} ${y4} Z`}
              strokeWidth={0.5}
              stroke="black"
              fill={`black`}
              fillOpacity={i % 2 == 0 ? "10%" : "0%"}
            ></path>

            <text
              x={textStartCoordinates[i][0]}
              y={textStartCoordinates[i][1] + 4}
              fontSize={2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              className="hidden group-hover:block italic"
            >
              {Math.round(totalTime[i] / (1000 * 60 * 60))} hours
            </text>
          </g>
        );
      })}
      {...shares.map((_, i) => {
        const textCoordinates = textStartCoordinates[i]!;
        const [textStartDx, textStartDy] = textCoordinates;

        return (
          <text
            x={textStartDx}
            y={textStartDy}
            fontSize={2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="black"
          >
            {`${texts[i]} — ${percentageShares[i]}`}
          </text>
        );
      })}
    </svg>
  );
}
