# Currency converter

This is a Vite project with React, TypeScript, and shadcn/ui wired with CurrencyBeacon API.

## Installation

Requires [mise](https://mise.jdx.dev):

```sh
mise install       # installs Bun/Node per mise.toml
bun install
```

Copy `.example.env` to `.env.local` and fill in your key:

```
VITE_CURRENCYBEACON_API_KEY=
```

Run the app:

```sh
bun run dev
```

## Scripts

| Command                             | What it does                          |
| ----------------------------------- | ------------------------------------- |
| `bun run dev`                       | Start the Vite dev server             |
| `bun run build` / `bun run preview` | Production build / preview it locally |
| `bun run typecheck`                 | `tsc -b`                              |
| `bun run lint`                      | `oxlint`                              |
| `bun run format` / `format:check`   | `oxfmt`                               |

## Getting an API Key

- To run this assessment, you will be required to make use of the following free API resource: [https://currencybeacon.com](https://currencybeacon.com/register)
- You will need to register for a free account to get access to your `API_KEY` from the main dashboard.

## API Response Mapping

Both endpoints repeat their data at the top level next to a response field, so I read only from response. For currencies specifically, I used `short_code` (the letter `code`) over the numeric code field (`code`, e.g. `"784"`, still a string despite the name suggesting a number), since that's what the convert endpoint and the UI both actually need.

## Limitations

- The dev proxy only covers local dev. No server-side proxy for a real deployment.
- I faced a CORS issue and used Vite proxy to solve it.
- `VITE_` prefixed key ships inside the client bundle and is visible in the browser's Network tab. It's not actually secret, just kept out of git.
- No automated tests, given the scope and time constraints. `formatCurrencyAmount` and the `useConversion/useDebouncedValue` guard logic would be the first candidates, they're pure and self-contained.

## Assumptions

Some assumptions that I made were:

- A plain TypeScript hook instead of a data fetching library. In a real application, I would use a data fetching library like TanStack Query or SWR fetching.
- Debounce the user input to a default number of 400 ms. I took inspiration from the Revolut currency conversion website. [Revolut Currency converter](https://www.revolut.com/currency-converter/).
