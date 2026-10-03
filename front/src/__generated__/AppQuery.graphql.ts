/**
 * @generated SignedSource<<9204f23c5bf45c913aff1ca094ad36cf>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AppQuery$variables = Record<PropertyKey, never>;
export type AppQuery$data = {
  readonly skillExperiences: ReadonlyArray<{
    readonly content: string;
    readonly contentRu: string;
    readonly id: string;
    readonly job: {
      readonly content: string;
      readonly contentRu: string;
      readonly endedAt: string;
      readonly id: string;
      readonly startedAt: string;
      readonly title: string;
      readonly titleRu: string;
    };
    readonly shareOfJob: number;
    readonly skill: {
      readonly id: string;
      readonly level: number;
      readonly name: string;
    };
  }>;
};
export type AppQuery = {
  response: AppQuery$data;
  variables: AppQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contentRu",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "SkillExperience",
    "kind": "LinkedField",
    "name": "skillExperiences",
    "plural": true,
    "selections": [
      (v0/*:: as any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "shareOfJob",
        "storageKey": null
      },
      (v1/*:: as any*/),
      (v2/*:: as any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Skill",
        "kind": "LinkedField",
        "name": "skill",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "level",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Job",
        "kind": "LinkedField",
        "name": "job",
        "plural": false,
        "selections": [
          (v0/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "titleRu",
            "storageKey": null
          },
          (v1/*:: as any*/),
          (v2/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endedAt",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": (v3/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": (v3/*:: as any*/)
  },
  "params": {
    "cacheID": "deb823d55c830a993ad4afc3b1c895db",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  skillExperiences {\n    id\n    shareOfJob\n    content\n    contentRu\n    skill {\n      id\n      name\n      level\n    }\n    job {\n      id\n      title\n      titleRu\n      content\n      contentRu\n      startedAt\n      endedAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9c47eb485889943b899c35ddf9a1de4d";

export default node;
