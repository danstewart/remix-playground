export type NewSnippet = {
    title: string;
    author: string;
    description: string;
    created: number;  // Unix timestamp
    language: string;
    code: string[];
}

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

export function createSnippet(snippet: NewSnippet) {
    // TODO: Store snippet
}

// TODO: Retrieve from database
export function getSnippets(filter: SnippetSearch): Snippet[] {
    const snippets: Snippet[] = [{
        title: "hello-world.py",
        author: "Dan Stewart",
        description: "Prints 'Hello World' to the console",
        url: "/snippets/hello-world.py",
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
        url: "/snippets/hello-world.sh",
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
        url: "/snippets/hello-world.rb",
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
