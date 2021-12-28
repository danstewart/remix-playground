import { MetaFunction, LoaderFunction, useLoaderData } from "remix";
import hljs from "highlight.js";
import { Snippet, getSnippets } from "~/controllers/snippets";

export const loader: LoaderFunction = () => {
    return getSnippets({ limit: 5, sortBy: "rank" });
};

export let meta: MetaFunction = () => {
    return {
        title: "Popular | Snippy",
        description: "Popular Snippets | Snippy",
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

