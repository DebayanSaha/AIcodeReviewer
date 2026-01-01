import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
  return (
    <>
        <main className='h-screen bg-linear-to-b from-neutral-950 to-zinc-900'>
            <div className='h-full p-4'>
                <div className='relative h-full border-2 border-[#0F9D00] rounded-4xl flex items-center justify-center gap-1.5'>
                    <div className='h-35  absolute flex flex-col items-center justify-center top-15'>
                        <h1 className=' font-[font2] text-white text-8xl '>REVI.</h1>
                        <h3 className=' font-[font3] text-white text-xl mt-4'> Review code instantly with AI precision </h3>
                    </div>
                    <img className='h-60 w-50' src="imgs/bot.png" alt="" />
                    <div className='absolute h-60 w-90 right-30 bottom-40'>
                        <p className='font-[font3] text-white text-[15px]'>
                            "Detect bugs, optimize performance, and uncover security vulnerabilities in seconds. Ship cleaner, safer code with confidence."
                        </p>
                    </div>
                    <div className='absolute h-20 w-75 flex items-center justify-center gap-4 p-2 font-[font3] bottom-40'>
                        <button onClick={()=>{navigate('/login')}} className='cursor-pointer px-8 py-3 rounded-full bg-emerald-500 text-black font-semibold'>Log In</button>
                        <button onClick={()=>{navigate('/code-review')}} className='cursor-pointer px-8 py-3 rounded-full bg-emerald-100 text-black font-semibold'>Continue</button>
                    </div>
                    <h2 className='absolute bottom-25 font-[font3] text-white text-[15px] text-center'>Please Log in to continue to the page..</h2>
                    
                </div>
                
            </div>
        </main> 
    </>
  )
}

export default HomePage