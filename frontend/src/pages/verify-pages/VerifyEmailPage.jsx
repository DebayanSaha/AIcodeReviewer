import React from 'react'

const VerifyEmailPage = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tl from-stone-900 to-green-950">
      <div className="w-105 bg-white p-6 rounded-2xl">

        <div className="flex items-center mb-4 justify-center">
          <h2 className="text-xl font-[font2] font-semibold text-gray-800 ">
           ✅ Verify your email
          </h2>
        </div>

        <p className="text-[16px] text-gray-600 leading-relaxed mt-2 text-center">
          We’ve sent a verification email to your registered email address.
          Please check your inbox and click on the
          <span className="font-bold text-blue-500"> verify </span>
          button.
        </p>

        <p className="text-xs text-center text-gray-500 mt-4">
          Didn’t receive the email? Check your spam folder.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmailPage