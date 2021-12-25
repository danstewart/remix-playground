import { MetaFunction, LoaderFunction, useLoaderData } from "remix";
import hljs from "highlight.js";

// TODO: Make snippets controller and models to load this data
type Snippet = {
    title: string;
    author: string;
    description: string;
    url: string;
    rank: number;
    language: string;
    code: string[];
}

export const loader: LoaderFunction = () => {
    const snippets: Snippet[] = [{
        title: "hello-world.py",
        author: "Dan Stewart",
        description: "Prints 'Hello World' to the console",
        url: "https://remix.run/snippets/hello-world",
        rank: 1,
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
        language: "ruby",
        code: [
            "#!/usr/bin/env ruby",
            "",
            "puts 'Hello World'",
        ]
    }];

    return snippets;
};

export let meta: MetaFunction = () => {
    return {
        title: "Snippy | Popular",
        description: "Snippy | Popular Snippets",
    };
};

export default function Index() {
    const data = useLoaderData<Snippet[]>();

    return (
        <main>
            <h2 className="title pb-5">This weeks most popular snippets</h2>

            {data.map(snippet => {
                let highlightedCode = hljs.highlight(snippet.code.join("\n"), { language: snippet.language }).value;

                return (
                    <div key={snippet.url}>
                        <div className="flex mb-10">
                            <h3 className="font-bold text-4xl text-secondary-color px-5">#{snippet.rank}</h3>
                            <div className="w-4/5">
                                <h3 className="font-semibold text-lg">{snippet.title}</h3>
                                <p className="text-gray-500 text-sm mb-2">Author: {snippet.author}</p>
                                <p>{snippet.description}</p>
                                <pre className="px-3 py-3 mt-4 border-2" dangerouslySetInnerHTML={{ __html: highlightedCode }}></pre>
                            </div>
                        </div>
                    </div>
                );
            })}
        </main >
    );
}

