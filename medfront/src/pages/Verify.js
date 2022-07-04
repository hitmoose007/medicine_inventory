import React from "react";
import { useState, useEffect } from "react";

const Verify = () => {
  const [toMain, setToMain] = useState(false);
  const [toRegister, setToRegister] = useState(false);

  
  

  return (
    <div className='bg-slate-200 w-2/5 m-auto p-7 rounded-md'>
      <h1 className='text-2xl p-6'>Please Verify your email</h1>
      <div className='flex justify-between'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 rounded focus:outline-none focus:shadow-outline'>
          back to register page
        </button>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          I have verified my email
        </button>
      </div>
    </div>
  );
};

export default Verify;
