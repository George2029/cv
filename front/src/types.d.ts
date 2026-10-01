type SkillExperienceWithTranslation = {
  skillName: string;
  content: string;
  shareOfJob: number;
};

type JobData = {
  title: string;
  experiences: SkillExperienceWithTranslation[];
  startedAt: string;
  endedAt: string;
  description: string;
};
