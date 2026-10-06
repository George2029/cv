function formatWorkTime(dt: string): string {
  let date = new Date(dt);
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  return `${month}.${year}`;
}

export function WorkExperience({
  job,
  index,
}: {
  job: JobData;
  index: number;
}) {
  return (
    <div
      key={index}
      className="max-w-5xl mx-auto h-screen flex gap-4 items-end border-b-8 border-black h-full relative"
    >
      <div className="absolute top-4 left-0 right-0 w-fit mx-auto font-bold">
        {job.title}
      </div>
      <div className="absolute top-10 left-0 right-0 w-fit mx-auto italic">
        {formatWorkTime(job.startedAt)} - {formatWorkTime(job.endedAt)}
      </div>
      <div className="absolute top-24 right-0 w-lg text-justify">
        {job.description}
      </div>
      <div className="w-15 mr-4">
        {Array(10)
          .fill(1)
          .map((_, index) => (
            <div key={index} className="border-t-2 border-black h-[50]">
              {100 - index * 10}%
            </div>
          ))}
      </div>

      {job.experiences.map(
        ({
          skillName,
          shareOfJob,
          content,
        }: SkillExperienceWithTranslation) => {
          return (
            <div key={skillName} className="w-20 relative group cursor-pointer">
              <div
                id="wk_exp"
                className="text-xs w-sm h-50 absolute flex justify-center items-center inset-0 left-30 -top-60 hidden group-hover:flex"
              >
                <div>{content}</div>
              </div>

              <div
                className="border"
                style={{ height: `${shareOfJob * 5 - 24}px` }}
              ></div>

              <div>{skillName}</div>
            </div>
          );
        },
      )}
    </div>
  );
}
