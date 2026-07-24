type AccuracyProps = {
  hComp: number;
  aComp: number;
  hTotal: number;
  aTotal: number;
  stat: string;
  homeOnly: boolean;
  awayOnly: boolean;
  bothTeams: boolean;
};

const AccuracyRow = ({
  hComp,
  aComp,
  hTotal,
  aTotal,
  stat,
  homeOnly,
  awayOnly,
  bothTeams,
}: AccuracyProps) => {
  const homePercentage = hTotal === 0 ? 0 : (hComp / hTotal) * 100;
  const awayPercentage = aTotal === 0 ? 0 : (aComp / aTotal) * 100;

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center text-xl font-bold px-1">
        <div className="flex items-center gap-1 md:gap-4 w-2/5 text-base">
          {bothTeams || homeOnly ? `${hComp}/${hTotal}` : "-"}
          <CircularPercentageIndicator
            percentage={homePercentage}
            foregroundColor="blue"
            size={50}
          />
        </div>
        <div className="flex justify-center text-gray-600 w-1/5 text-center">
          {stat}
        </div>
        <div className="flex items-center justify-end gap-1 md:gap-4 w-2/5 text-base">
          <CircularPercentageIndicator
            percentage={awayPercentage}
            foregroundColor="orange"
            size={50}
          />
          {bothTeams || awayOnly ? `${aComp}/${aTotal}` : "-"}
        </div>
      </div>
    </div>
  );
};

export default AccuracyRow;

type CircularProps = {
  percentage: number;
  foregroundColor: string;
  size: number;
};

export const CircularPercentageIndicator = ({
  percentage,
  foregroundColor,
  size = 50,
}: CircularProps) => {
  const radius = size / 2 - 6; // Radius minus stroke width
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e6e6e6"
          strokeWidth="6"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={foregroundColor}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "0.8rem",
          color: "black",
        }}
      >
        {percentage === 0 ? "-" : `${percentage.toFixed(0)}%`}
      </div>
    </div>
  );
};
