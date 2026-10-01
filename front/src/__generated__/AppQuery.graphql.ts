/**
 * @generated SignedSource<<539d9ccd31ad87011f90ffd07c24e269>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AppQuery$variables = Record<PropertyKey, never>;
export type AppQuery$data = {
  readonly skillExperienceTranslations: ReadonlyArray<{
    readonly content: string;
    readonly isLangRu: boolean;
    readonly skillExperience: {
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
    };
    readonly skillExperienceId: number;
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
  "name": "content",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "SkillExperienceTranslation",
    "kind": "LinkedField",
    "name": "skillExperienceTranslations",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "skillExperienceId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isLangRu",
        "storageKey": null
      },
      (v0/*:: as any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "SkillExperience",
        "kind": "LinkedField",
        "name": "skillExperience",
        "plural": false,
        "selections": [
          (v1/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shareOfJob",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Skill",
            "kind": "LinkedField",
            "name": "skill",
            "plural": false,
            "selections": [
              (v1/*:: as any*/),
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
              (v1/*:: as any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              (v0/*:: as any*/),
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
    "selections": (v2/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": (v2/*:: as any*/)
  },
  "params": {
    "cacheID": "bfb115c509de4d28c01a66c53bef58f1",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  skillExperienceTranslations {\n    skillExperienceId\n    isLangRu\n    content\n    skillExperience {\n      id\n      shareOfJob\n      skill {\n        id\n        name\n        level\n      }\n      job {\n        id\n        title\n        content\n        startedAt\n        endedAt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b5850ae5efb6c77540ff9ee5bc4f30f8";

export default node;
