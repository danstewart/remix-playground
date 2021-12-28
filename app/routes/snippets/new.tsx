import { useActionData, useTransition, MetaFunction, Form, redirect, ActionFunction } from "remix";
import invariant from "tiny-invariant";
import { NewSnippet, Snippet, createSnippet } from "~/controllers/snippets";

export let meta: MetaFunction = () => {
    return {
        title: "New Snippet | Snippy",
        description: "Add a new snippet | Snippy",
    };
};

type PostError = {
    title?: boolean;
    language?: boolean;
    description?: boolean;
    code?: boolean;
}

export const action: ActionFunction = async ({ request }) => {
    const submitted = await request.formData();

    const title = submitted.get("title");
    const language = submitted.get("language");
    const description = submitted.get("description");
    const code = submitted.get("code");

    const errors: PostError = {};
    if (!title) errors.title = true;
    if (!language) errors.language = true;
    if (!description) errors.description = true;
    if (!code) errors.code = true;

    if (Object.keys(errors).length) {
        return errors;
    }

    invariant(typeof title === "string");
    invariant(typeof language === "string");
    invariant(typeof description === "string");
    invariant(typeof code === "string");

    await createSnippet({
        title: title,
        language: language,
        description: description,
        author: "dan",  // TODO: Get user
        created: Math.floor(new Date().getTime() / 1000),
        code: code.split("\n"),
    });

    // TODO: Redirect to newly created snippet
    return redirect("/");
}

export default function Index() {
    const errors = useActionData();
    const transition = useTransition();

    return (
        <main className="pb-20">
            <h2 className="title pb-5">Create new snippet</h2>

            {/* TODO: Figure out smarter way to handle form error display */}
            <div className={`${errors ? "" : "hidden"} bg-red-400 p-5 mb-5`}>
                <p className="text-white font-bold">Invalid submission: Please review the highlighted fields</p>
            </div>

            <Form method="post">
                <div className="flex mb-5">
                    <label className="block grow mr-5">
                        <span className="text-gray-700">Filename</span>
                        <input className={`block mt-1 w-full ${errors?.title ? "border-red-500" : ""}`} type="text" name="title" />
                    </label>
                    <label className="block grow">
                        <span className="text-gray-700">Filetype</span>

                        {/* TODO: Change to autocomplete list of all languages */}
                        <select name="language" className={`block mt-1 w-full ${errors?.language ? "border-red-500" : ""}`}>
                            <option hidden selected disabled></option>
                            <option value="py">Python (.py)</option>
                            <option value="sh">Shell (.sh)</option>
                            <option value="rb">Ruby (.rb)</option>
                        </select>
                    </label>
                </div>

                <label className="block mb-5">
                    <span className="text-gray-700">Description</span>
                    <textarea name="description" className={`block w-full ${errors?.description ? "border-red-500" : ""}`} rows={3}>
                    </textarea>
                </label>

                <label className="block mb-5">
                    <span className="text-gray-700">Code</span>

                    <textarea name="code" className={`block w-full ${errors?.code ? "border-red-500" : ""}`} rows={20}>
                    </textarea>
                </label>

                <button className="btn btn-primary">{transition.submission ? "Creating..." : "Create"}</button>
            </Form>
        </main >
    );
}


