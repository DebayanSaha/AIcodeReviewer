import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import axios from "axios"
import Markdown from "react-markdown"
import rehype from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import 'remixicon/fonts/remixicon.css'
import { getData } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { motion } from 'framer-motion'
import { pageVariants } from '../animations/pageVariants'

const CodeReviewerPage = () => {
  const { user } = getData()
  const [code, setCode] = useState(``);
  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("https://aicodereviewer-liq8.onrender.com/ai/get-review", { code });
    setReview(response.data);
  }

  return (
    <>
      {
        user ?
          <motion.main
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <main className='relative flex flex-col md:flex-row p-3 md:p-4 gap-4 md:gap-6'>

              {/* left */}
              <section className='relative w-full md:w-1/2 h-[45vh] md:h-[85vh] bg-black rounded-2xl overflow-hidden flex flex-col'>
                <div className='w-full flex-1 overflow-auto p-3 md:p-4'>
                  {code.trim() === "" && (
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
                      fontFamily: '"Fira code","Fira Mono",monospace',
                      fontSize: 15,
                      backgroundColor: "transparent",
                      color: "#f8f8f2",
                      minHeight: "100%",
                      outline: "none"
                    }}
                  />
                </div>

                <button
                  onClick={reviewCode}
                  className='absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-blue-500 hover:bg-blue-600 
                    text-white px-4 md:px-5 py-2.5 rounded-xl font-medium
                    shadow-lg transition active:scale-95 cursor-pointer'
                >
                  Review<i className="ml-2 ri-send-ins-fill"></i>
                </button>
              </section>

              {/* right */}
              <section className='relative h-[45vh] md:h-[85vh] w-full md:w-1/2 bg-[#343434] rounded-2xl overflow-auto'>
                <div className='text-white font-medium p-3 md:p-4 text-[16px] md:text-[18px]'>
                  {review.trim() === "" && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm select-none text-center px-6">
                      Click the <span className="text-blue-400 mx-1">Review</span> button to get your AI review result
                    </div>
                  )}

                  <Markdown rehypePlugins={[rehype]}>
                    {review}
                  </Markdown>
                </div>
              </section>

            </main>
          </motion.main>
          : <Navigate to={'/login'} />
      }
    </>
  );
};

export default CodeReviewerPage;
