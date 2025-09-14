import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown"
// import { useTypewriter } from "../utils/typeWriterEffect";
import { useUrl } from "../context/urlContext";



const AiPage = () => {
  const {url} = useUrl()
  const [chat, setChat] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();
  const chatRef = useRef(null);
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChat((prev) => [...prev, { role: "user", content: prompt }]);
    setPrompt("");
    setIsLoading(true);
    const token = await getToken();

    //sending request
    try {
      // const res = await fetch(`${url}/api/ai/suggestions`, {
      const res = await fetch(`${url}/api/ai/suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log(data.data);
      setChat((prev) => [...prev, { role: "ai", content: data.data }]);
    } catch (error) {
      console.error("Failed to respond", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 mx-auto w-3/4 ">
        <div
          ref={chatRef}
          className="h-[calc(100vh-200px)] overflow-y-auto p-4 space-y-4 scrollbar-hidden"
        >
          {chat.map((chat, i) => (
            <div
              key={i}
              className={`flex ${
                chat.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`whitespace-pre-wrap p-3 rounded-xl inline-block ${
                  chat.role === "user"
                    ? "bg-neutral-700 text-white"
                    : "bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white "
                } ${chat.role === "user" ? "max-w-[80%]" : "max-w-[90%]"}`}
              >
                <ReactMarkdown>{chat.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white p-3 rounded-xl max-w-[80%] self-start border border-neutral-200 dark:border-neutral-700 animate-pulse">
              Typing...
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="border-neutral-200 dark:border-neutral-800 p-4">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 items-center w-3/4 mx-auto relative"
        >
          <Textarea
            rows={1}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask CareerPilot AI..."
            className="resize-none w-full min-h-[50px] max-h-[150px] pr-[100px] overflow-y-auto bg-white dark:bg-neutral-900 scrollbar-hidden"
          />
          <Button
            type="submit"
            variant="default"
            disabled={!prompt.trim() || isLoading}
            className="absolute bottom-2 right-2"
          >
            Send
          </Button>
        </form>
      </div>
    </>
  );
};

export default AiPage;
