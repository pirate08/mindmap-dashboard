import React from 'react';
import Title from '../common/Title';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { Main_Headers, getColorClass } from '../Data'; // Importing Main_Headers and getColorClass from data.js

const Diagram = () => {
  return (
    <div>
      {/* Title goes here */}
      <div className='text-center'>
        <Title>Timeline Dashboard</Title>
      </div>
      {/* First Arrow Section */}
      <div className='flex justify-center mt-8'>
        <FaLongArrowAltDown className='text-5xl bg-white text-violet-700 rounded-full animate-bounce' />
      </div>
      {/* Main Headers goes here */}
      <div className='flex md:justify-between justify-center gap-10 flex-wrap mt-8'>
        {Main_Headers.map((header) => (
          <div key={header.id}>
            <div
              className={`py-2 px-3 rounded-md cursor-pointer ${getColorClass(
                header.id
              )}`}>
              <h1 className='text-xl text-center'>{header.name}</h1>
            </div>
            {/* Arrow under the header */}
            <div className='flex justify-center mt-5'>
              <FaLongArrowAltDown className='text-4xl w-10 bg-white text-violet-700 rounded-full animate-bounce' />
            </div>
            {/* Submenu's for External and Internal */}
            <div className='flex justify-between gap-3 mt-4'>
              {header.children1 &&
                header.children1.map((child1) => (
                  <div key={child1.id} className='flex flex-col items-center'>
                    <div className='bg-red-700 p-2 rounded-md flex items-center justify-center'>
                      {child1.subname}
                    </div>

                    {child1.children2 &&
                      child1.children2.map((child2) => (
                        <div
                          key={child2.id}
                          className='bg-blue-500 p-2 rounded-md mt-2'>
                          {child2.subname1}

                          {child2.children3 &&
                            child2.children3.map((child3) => (
                              <div
                                key={child3.id}
                                className='bg-green-700 p-2 rounded-md mt-2'>
                                {child3.subname2}
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diagram;
