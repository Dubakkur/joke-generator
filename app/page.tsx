/**
 * The `Chat` component is the main entry point for the chat functionality in the application. It provides a user interface for generating and critiquing jokes based on user selections.
 *
 * The component uses the `useChat` hook to manage the chat messages and state. It renders a set of options for the user to select the type of joke and the tone, and provides buttons to generate a new joke and critique the previous joke.
 *
 * The generated joke or critique is displayed in a separate section of the component, and the user can continue the conversation by generating more jokes or critiquing the previous one.
 *
 * @returns {JSX.Element} The `Chat` component
 */
"use client";

import { useState } from "react";
import { useChat } from "ai/react";

/**
 * The `Chat` component is the main entry point for the chat functionality in the application. It provides a user interface for generating and critiquing jokes based on user selections.
 *
 * The component uses the `useChat` hook to manage the chat messages and state. It renders a set of options for the user to select the type of joke and the tone, and provides buttons to generate a new joke and critique the previous joke.
 *
 * The generated joke or critique is displayed in a separate section of the component, and the user can continue the conversation by generating more jokes or critiquing the previous one.
 *
 * @returns {JSX.Element} The `Chat` component
 */
export default function Chat() {
  const { messages, append, isLoading } = useChat();
  const Options = [
    { emoji: "🧑‍💼", value: "Jobs" },
    { emoji: "📺", value: "TV Show" }, 
    { emoji: "🐅", value: "Animals" },
    { emoji: "🐅", value: "Dad-Jokes" },
  ];
  const tones = [
    { emoji: "😊", value: "Apt" },
    { emoji: "😏", value: "Edgy" },
    { emoji: "😂", value: "Funny" },
  ];

  const [state, setState] = useState({
    Option: "",
    tone: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Joke Generator</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the Joke by selecting the option and tone.
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Option</h3>

            <div className="flex flex-wrap justify-center">
              {Options.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}

                    name="Option"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>

            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"

            disabled={isLoading || !state.Option || !state.tone}
            onClick={() =>
              {
                append({
                role: "user",

                content: `Generate a ${state.Option} Joke in a ${state.tone} tone. start the response with the '++' keyword`,
              });
              
            }

            }
          >
            Generate Joke
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate") ||
              messages[messages.length - 1]?.content.startsWith("Critique") ||
              messages[messages.length - 1]?.content.startsWith("**")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
          >
            {
            messages[messages.length - 1]?.content
            }
          </div>
          
          <button
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate") ||
              messages[messages.length - 1]?.content.startsWith("Critique")
            }
            onClick={() =>
              append({
                role: "user",
                content: `Critique the following joke: "${messages[messages.length - 2]?.content}".  start the response with the '**' keyword`,
              })
            }
          >
            Critique
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Critique") ||
              messages[messages.length - 1]?.content.startsWith("++") ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4 mt-4"
          >
            {messages[messages.length - 1]?.content}
          </div>
        </div>
      </div>
    </main>
  );
}