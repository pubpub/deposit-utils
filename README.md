# deposit-utils

Deposit works to digital object repositories like Crossref and Datacite using statically-typed primitives that are validated against official XSD schemas.

## Getting Started

Deposits for each supported registry (Crossref or Datacite) can be defined in one of three ways: JSX, Hyperscript, or plain JavaScript objects.

### JSX

Update your tsconfig.json to translate JSX syntax to function calls:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "x",
    "jsxFragmentFactory": "null"
  }
}
```

```tsx
import { x, renderXml } from "@pubpub/deposit-utils/datacite";

const depositXml = renderXml(
  <resource>
    <titles>
      <title xml:lang="en-US">deposit-utils XML Example</title>
    </titles>
    {/*...*/}
  </resource>
);
```

### Hyperscript

```ts
import { x, renderXml } from "@pubpub/deposit-utils/datacite";

const depositXml = renderXml(
  x("resource", [
    x("titles", [
      x("title", { "xml:lang": "en-US" }, "deposit-utils XML Example"),
    ]),
  ])
);
```

### Plain objects ([xast](https://github.com/syntax-tree/xast) AST):

```ts
import { renderXml } from "@pubpub/deposit-utils/datacite";

const xml = renderXml({
  type: "element",
  name: "resource",
  children: [
    {
      type: "element",
      name: "titles",
      children: [
        {
          type: "element",
          name: "title",
          attributes: { "xml:lang": "en-US" },
          children: ["deposit-utils XML Example"],
        },
      ],
    },
  ],
});
```

### Development

Fetch XSD and generate TypeScript types:

```sh
npm run gen
```
