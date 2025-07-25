"use client"

import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import type { BlocksContent } from "@strapi/blocks-react-renderer"
import React from "react"

type Props = {
  content: BlocksContent
}

export default function RichText({ content }: Props) {
  return (
    <BlocksRenderer
  content={content}
  blocks={{
    paragraph: ({ children }) => (
  <p className="leading-tight mb-2">{children}</p>
),
    heading: ({ children, level }) =>
      React.createElement(
        `h${level}`,
        {
          className: `mt-6 mb-2 font-bold ${
            level === 1
              ? "text-3xl"
              : level === 2
              ? "text-2xl"
              : "text-xl"
          }`,
        },
        children
      ),
    list: ({ children, format }) =>
      format === "unordered" ? (
        <ul className="list-disc pl-6 mb-4">{children}</ul>
      ) : (
        <ol className="list-decimal pl-6 mb-4">{children}</ol>
      ),
    "list-item": ({ children }) => <li className="mb-1">{children}</li>,

    quote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic text-gray-300 my-4">
        {children}
      </blockquote>
    ),
    // ✅ LE BON ENDROIT POUR LES LIENS
    link: ({ children, url }) => (
        <a
        href={url}
        className="text-blue-500 underline hover:text-blue-700 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  }}
  modifiers={{
    bold: ({ children }) => <strong>{children}</strong>,
    italic: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    
    // ❌ à ne PAS mettre ici : link
  }}
/>

  )
}
