import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";

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
    <div>
      <h1>Skills</h1>
      <ul>
        {data.skills.map((skill) => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
}

