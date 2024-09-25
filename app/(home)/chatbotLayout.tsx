"use client";
import { Button } from "@/components/ui/button";
import { Bot, Loader2, Send, User2 } from "lucide-react";
import { useChat } from "ai/react";
import MarkDown from "@/components/MarkDown";

interface ChatbotLayoutProps {
  isInHomeLayout?: boolean;
  children?: React.ReactNode;
}

const ChatbotLayout = ({ isInHomeLayout, children }: ChatbotLayoutProps) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "/api/genai",
    });
  return (
    <div>
      <div
        className={`${
          isInHomeLayout
            ? "fixed bottom-6 right-6 w-full max-w-xs md:max-w-sm lg:max-w-60 p-4 shadow-lg bg-blue-800 rounded-md overflow-y-hidden z-[10]"
            : "w-full flex  flex-col items-center p-6 bg-blue-800fixed z-[10]  left-[16px] right-[16px]"
        }`}
      >
        {RenderForm()}
        {RenderMessages()}
      </div>
      {children}
    </div>
  );

  function RenderForm() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              prompt: input,
            },
          });
        }}
        className="w-full flex flex-row gap-2 items-center h-full"
      >
        <label> Chatbot </label>
        <input
          type="text"
          className="bg-white text-black border-b border-dashed outline-none w-full auto px-4 py-2
  focus:placeholder-transparent rounded-md disabled:bg-white"
          placeholder={
            isLoading
              ? "Generating info...."
              : "AI Chatbot assistant, Ask me any question....?"
          }
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          className="rounded-full shadow-md border flex flex-row "
        >
          {isLoading ? (
            <Loader2 onClick={stop} className="p-3 h-10 w-10 animate-spin" />
          ) : (
            <Send className="p-3 h-10 w-10 " />
          )}
        </Button>
      </form>
    );
  }

  function RenderMessages() {
    return (
      <div
        id="chatbox"
        className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap"
      >
        {messages.map((m, index) => {
          return (
            <div
              key={index}
              className={`p-4 shadow-md rounded-md text-black ml-10 relative ${
                m.role === "user" ? "bg-stone-300 " : "bg-indigo-200"
              }`}
            >
              {" "}
              {/* {m.content} */}
              <MarkDown text={m.content} />
              {m.role === "user" ? (
                <User2 className="absolute top-2 -left-10 border rounded-full p-1 shadow-lg bg-white" />
              ) : (
                <Bot
                  className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[lightblue] ${
                    isLoading && index === messages.length - 1
                      ? "animate-bounce"
                      : ""
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
};

export default ChatbotLayout;
