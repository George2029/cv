import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import bw from "./assets/bw.webp";

export default function App() {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        skills {
          id
          name
        }
      }
    `,
    {},
  );

  return (
    <div className="max-w-5xl">
      <div className="">
        <h1>Skills</h1>
        <img src={bw} />
        <ul>
          {data.skills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
