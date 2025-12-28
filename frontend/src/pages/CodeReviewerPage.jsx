import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import axios from "axios"
import Markdown from "react-markdown"
import rehype from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

const CodeReviewerPage = () => {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("http://localhost:8080/ai/get-review", { code });
    setReview(response.data);
  }

  return (
    <>
      <main className='relative h-screen w-screen flex p-6 gap-6'>
        {/* left */}
        <section className='relative w-1/2 h-full bg-black rounded-2xl overflow-hidden flex flex-col'>
            <div className='w-full flex-1 overflow-auto p-4'>
              {code.trim()=== ""&& (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                  Write your code here to get an AI review
                </div>
              )}
              <Editor 
                value={code} 
                onValueChange={code => setCode(code)}
                highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
                padding={16}
                style={{
                  fontFamily:'"Fira code","Fira Mono",monospace',
                  fontSize:15,
                  backgroundColor:"transparent",
                  color:"#f8f8f2",
                  minHeight:"100%",
                  outline:"none"
                }}/>
            </div>
            <button onClick={reviewCode} className='absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 
                     text-white px-5 py-2.5 rounded-xl font-medium
                     shadow-lg transition active:scale-95 cursor-pointer'>Review</button>
        </section>
        {/* right */}
        <section className='h-full  w-1/2 bg-[#343434] rounded-2xl overflow-auto'>
          <div className=' text-white font-medium p-4  text-[18px]'>
            {review.trim() === "" && (
               <div className="absolute mt-[20%] right-50 flex items-center justify-center text-gray-500 text-sm select-none">
                Click the <span className="text-blue-400 mx-1">Review</span> button to get your AI review result
              </div>
            )}
            <Markdown rehypePlugins={[rehype]}>
              {review}
            </Markdown>
          </div>
        </section>       
      </main>
    </>
  );
};

export default CodeReviewerPage;
