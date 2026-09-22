import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import me from "./assets/bw.webp";
import experience from "./assets/exp_wb.webp";
import knowledge from "./assets/knowledge_wb.webp";

export default function App() {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        skillExperienceTranslations {
          skillExperienceId
          isLangRu
          content
          skillExperience {
            id
            skill {
              name
            }
          }
        }
      }
    `,
    {},
  );

  return (
    <div className="[&_div]:border [&_div]:border-solid">
      <div className="max-w-5xl mx-auto bg-amber-200 h-screen">
        <img src={me} />
      </div>
      <div className="max-w-5xl mx-auto bg-blue-200 h-screen">
        <h1>Job Experience</h1>
        <img src={experience} />
        {data.skillExperienceTranslations.map(
          (set) => set.skillExperience.skill.name,
        )}
      </div>
      <div className="max-w-5xl mx-auto bg-yellow-200 h-screen">
        <h1>Skills</h1>
        <img src={knowledge} />
      </div>
    </div>
  );
}
