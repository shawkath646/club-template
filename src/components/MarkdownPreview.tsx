import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGFM from 'remark-gfm';

export default function MarkdownPreview({ markdownContent }: { markdownContent: string; }) {

    const mdxOptions = {
        remarkPlugins: [remarkGFM],
    };

    const components = {
        h1: (props: any) => (
            <h1 className="text-3xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100">
                {props.children}
            </h1>
        ),
        h2: (props: any) => (
            <h2 className="text-2xl font-semibold mt-5 mb-2 text-gray-900 dark:text-gray-100">
                {props.children}
            </h2>
        ),
        h3: (props: any) => (
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-200">
                {props.children}
            </h3>
        ),
        p: (props: any) => (
            <p className="mt-2 mb-4 text-gray-800 dark:text-gray-300 leading-relaxed">
                {props.children}
            </p>
        ),
        ul: (props: any) => (
            <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-300">
                {props.children}
            </ul>
        ),
        ol: (props: any) => (
            <ol className="list-decimal pl-6 space-y-2 text-gray-800 dark:text-gray-300">
                {props.children}
            </ol>
        ),
        li: (props: any) => (
            <li className="mt-1 text-gray-800 dark:text-gray-300">{props.children}</li>
        ),
        blockquote: (props: any) => (
            <blockquote className="border-l-4 border-gray-400 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 mt-4 mb-4">
                {props.children}
            </blockquote>
        ),
        code: (props: any) => (
            <code className="bg-gray-200 dark:bg-gray-700 text-red-600 dark:text-red-300 px-1 py-0.5 rounded">
                {props.children}
            </code>
        ),
        pre: (props: any) => (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-4 mb-4">
                {props.children}
            </pre>
        ),
        table: (props: any) => (
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 mt-4 mb-4">
                {props.children}
            </table>
        ),
        thead: (props: any) => (
            <thead className="bg-gray-100 dark:bg-gray-800">
                {props.children}
            </thead>
        ),
        th: (props: any) => (
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">
                {props.children}
            </th>
        ),
        td: (props: any) => (
            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-300">
                {props.children}
            </td>
        ),
        a: (props: any) => (
            <a
                className="text-blue-600 dark:text-blue-400 hover:underline"
                href={props.href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {props.children}
            </a>
        ),
        hr: () => <hr className="my-6 border-gray-300 dark:border-gray-600" />,
    };

    return (
        <MDXRemote
            source={markdownContent}
            options={{ mdxOptions }}
            components={components}
        />
    );
};
