export type Snippet = {
    title: string;
    author: string;
    description: string;
    url: string;
    rank: number;
    created: number;  // Unix timestamp
    language: string;
    code: string[];
}

type SnippetSearch = {
    limit: number;
    sortBy: "created" | "rank";
}

// TODO: Retrieve from database
export function getSnippets(filter: SnippetSearch): Snippet[] {
    const snippets: Snippet[] = [{
        title: "hello-world.py",
        author: "Dan Stewart",
        description: "Prints 'Hello World' to the console",
        url: "https://remix.run/snippets/hello-world",
        rank: 1,
        created: 0,
        language: "python",
        code: [
            "#!/usr/bin/env python",
            "",
            "print('Hello World')",
        ]
    }, {
        title: "hello-world.sh",
        author: "Dan Stewart",
        description: "Prints 'Hello World' to the console",
        url: "https://remix.run/snippets/hello-world",
        rank: 2,
        created: 0,
        language: "bash",
        code: [
            "#!/usr/bin/env bash",
            "",
            "echo 'Hello World'",
        ]
    }, {
        title: "hello-world.rb",
        author: "Dan Stewart",
        description: "Prints 'Hello World' to the console",
        url: "https://remix.run/snippets/hello-world",
        rank: 3,
        created: 0,
        language: "ruby",
        code: [
            "#!/usr/bin/env ruby",
            "",
            "puts 'Hello World'",
        ]
    }];

    const results = snippets.sort((a, b) => a[filter.sortBy] - b[filter.sortBy]);
    return results.slice(0, filter.limit);
}
