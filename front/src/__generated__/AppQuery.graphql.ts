/**
 * @generated SignedSource<<c35e305c06aa4570f0c7dbc6c2a2bfbd>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AppQuery$variables = Record<PropertyKey, never>;
export type AppQuery$data = {
  readonly skills: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
};
export type AppQuery = {
  response: AppQuery$data;
  variables: AppQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Skill",
    "kind": "LinkedField",
    "name": "skills",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
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
    "selections": (v0/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": (v0/*:: as any*/)
  },
  "params": {
    "cacheID": "d1822e43086b6efcc0e44c28f410fb81",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  skills {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "64e5a55c99f7aad7a486ffb5f92c3743";

export default node;
