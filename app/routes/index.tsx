import type { MetaFunction } from "remix";
import Typewriter from 'typewriter-effect';
import hljs from 'highlight.js';

export let meta: MetaFunction = () => {
  return {
    title: "Snippy",
    description: "Homepage | Snippy",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <main>
      <h2 className="title pb-5">Share and discover handy code snippets in any language!</h2>

      <pre>
        <Typewriter
          options={{ delay: 30, deleteSpeed: 0 }}
          onInit={(typewriter) => {
            const demoSnippets = [
              {
                "lang": "bash",
                "code": [
                  `#!/usr/bin/env bash`,
                  ``,
                  `# Get network interface`,
                  `ip route show default | awk '/default/ {print \$5}'`,
                ]
              },
              {
                "lang": "python",
                "code": [
                  `#!/usr/bin/env python`,
                  ``,
                  `# Python 3.10.0 match syntax`,
                  `sort_by = "price"`,
                  ``,
                  `match sort_by:`,
                  `  case "price":`,
                  `    results = sorted(results, key=lambda x: x.price)`,
                  `  case "alphabetical":`,
                  `    results = sorted(results, key=lambda x: x.name)`,
                ]
              },
              {
                "lang": "javascript",
                "code": [
                  `#!/usr/bin/env node`,
                  ``,
                  `// Permuations of list`,
                  `const permutations = (arr, toString=false) => {`,
                  `  // Group each chunk of permutations of each length`,
                  `  // ie. group all the length-1 permutations, and the length-2 permutations, etc...`,
                  `  let chunks = {};`,
                  ``,
                  `  // Add the initial array (length-1 permutations)`,
                  `  chunks[1] = arr.map(item => [item]);`,
                  ``,
                  `  // Add the permutations from length-2 to the full length of the initial array`,
                  `  for (let targetLen = 2; targetLen <= arr.length; targetLen++) {`,
                  `      let newChunk = [];`,
                  ``,
                  `      // Go through each permutation of the previous length`,
                  `      // and each value in the initial array`,
                  `      // If the permutation does not contain the current loop value then make a new permutation`,
                  `      // with the old permutation and the current loop value`,
                  `      for (let permutation of chunks[targetLen - 1]) {`,
                  `          for (let item of arr) {`,
                  `              if (permutation.includes(item)) continue;`,
                  `              newChunk.push([ item, ...permutation ]);`,
                  `          }`,
                  `      }`,
                  `      chunks[targetLen] = newChunk;`,
                  `  }`,
                  ``,
                  `  let results = Object.values(chunks);`,
                  ``,
                  `  // If we want the results as a flat list of strings (which we probably do)`,
                  `  // Then do it...`,
                  `  if (toString) {`,
                  `      let formattedResults = [];`,
                  `      for (let group of results) {`,
                  `          for (let permutation of group) {`,
                  `              formattedResults.push(permutation.join(''));`,
                  `          }`,
                  `      }`,
                  ``,
                  `      return formattedResults;`,
                  `  },`,
                  ``,
                  `  return results;`,
                  `}`,
                ]
              }
            ];

            let counter = 1;

            // TODO: Change cursor not to blink during typing
            for (let snippet of demoSnippets) {
              // Replace spaces with tabs
              let lines = snippet.code.map(line => line.replace(/\s{2}/g, '\t'));
              let highlighted = hljs.highlight(lines.join("\n"), { language: snippet.lang }).value;

              typewriter.typeString(highlighted).start();
              typewriter.pauseFor(1000);

              // Change background color to blue to look like it's selected
              // Then delete the text
              // Unless this is the last example, then just leave it
              if (counter < demoSnippets.length) {
                typewriter.callFunction(e => e.elements.wrapper.style.backgroundColor = '#85ADD6');
                typewriter.pauseFor(500);
                typewriter.callFunction(e => e.elements.wrapper.innerHTML = '');
                typewriter.callFunction(e => e.elements.wrapper.style.backgroundColor = '');
              }

              counter++;
            }
          }} />
      </pre>
    </main >
  );
}
