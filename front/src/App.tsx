import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useState } from "react";
import { WorkExperience } from "./WorkExperience";
import { FrontPage } from "./FrontPage";
import { SkillsTotalUsageDiagram } from "./SkillsTotalUsageDiagram";
import { Star } from "./Star";

export default function App() {
  let lang = localStorage.getItem("isLangRu");

  const [isLangRu, setIsLangRu] = useState<boolean>(lang === "true");

  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        skillExperienceTranslations {
          skillExperienceId
          isLangRu
          content
          skillExperience {
            id
            shareOfJob
            skill {
              id
              name
              level
            }
            job {
              id
              title
              content
              startedAt
              endedAt
            }
          }
        }
      }
    `,
    {},
  );

  const accumulated: Record<string, JobData> =
    data.skillExperienceTranslations.reduce(
      (pr, cv) => {
        const { skillExperience, content } = cv;
        if (cv.isLangRu !== isLangRu) return pr;
        const {
          job: { id: jobId, title, startedAt, endedAt, content: description },
          skill: { name: skillName },
          shareOfJob,
        } = skillExperience;

        const exp = { skillName, content, shareOfJob };

        pr[jobId] ??= {
          title,
          experiences: [],
          startedAt,
          endedAt,
          description,
        };
        pr[jobId].experiences.push(exp);

        return pr;
      },
      {} as Record<string, JobData>,
    );

  const skills = data.skillExperienceTranslations.reduce(
    (pr, cv) => {
      const skill = cv.skillExperience.skill;
      pr[skill.name] = skill.level;
      return pr;
    },
    {} as Record<string, number>,
  );

  const workExperiences = data.skillExperienceTranslations.reduce(
    (pr, cv) => {
      const skillExperience = cv.skillExperience;
      pr[cv.skillExperience.id] = skillExperience;
      return pr;
    },
    {} as Record<
      string,
      {
        readonly id: string;
        readonly job: {
          readonly content: string;
          readonly endedAt: string;
          readonly id: string;
          readonly startedAt: string;
          readonly title: string;
        };
        readonly shareOfJob: number;
        readonly skill: {
          readonly id: string;
          readonly level: number;
          readonly name: string;
        };
      }
    >,
  );

  const skillsUsage = Object.values(workExperiences).reduce(
    (pr, cv) => {
      const {
        job: { endedAt, startedAt },
        skill: { name: skillName },
        shareOfJob,
      } = cv;
      const totalJobTime =
        ((new Date(endedAt).getTime() - new Date(startedAt).getTime()) *
          0.66 *
          0.33) /
        7;
      const totalWorkExperienceTime = shareOfJob * totalJobTime;
      pr[skillName] ??= 0;
      pr[skillName] += totalWorkExperienceTime;
      return pr;
    },
    {} as Record<string, number>,
  );

  const skillUsageTotalTime = Object.values(skillsUsage).reduce(
    (pr, cv) => pr + cv,
  );
  const skillsUsageStats: Record<
    string,
    { totalTime: number; percentageShare: string; share: number }
  > = {};
  for (let i in skillsUsage) {
    const time = skillsUsage[i]!;
    const share = time / skillUsageTotalTime;
    const percentageShare = `${Math.trunc(share * 10000) / 100}%`;
    skillsUsageStats[i] = { totalTime: time, percentageShare, share };
  }

  const skillShares = Object.values(skillsUsageStats).map((a) => a.share);
  console.log("skillShares:", skillShares);
  const skillNames = Object.keys(skillsUsageStats);
  console.log("skillNames:", skillNames);

  // console.log("data:");
  // console.dir(data, { depth: null });
  console.dir(JSON.stringify(accumulated), { depth: null });

  return (
    <div className="">
      <FrontPage isLangRu={isLangRu} setIsLangRu={setIsLangRu} />
      <div id="work_experience">
        {Object.values(accumulated).map((job: JobData, index: number) => {
          return <WorkExperience job={job} index={index} />;
        })}
      </div>

      <div id="skills_usage" className="max-w-5xl mx-auto h-screen">
        <h1 className="text-center font-bold mt-10 mb-20">
          Skills Total Usage
        </h1>
        <div className="mx-auto w-fit">
          <SkillsTotalUsageDiagram stats={skillsUsageStats} />
        </div>
      </div>
      <div id="skills_rating" className="max-w-2xl mx-auto h-screen">
        <h1 className="text-center font-bold mt-10 mb-20">Skills Rating</h1>

        <div>
          {Object.entries(skills).map(([skillName, level]) => {
            return (
              <div className="flex border-b-1 border-black">
                <div className="flex-4 p-2 flex justify-center items-center">
                  {skillName}
                </div>
                <div className="flex-1 p-2 border-l-1 border-black flex justify-center items-center">
                  <Star mark={level} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
