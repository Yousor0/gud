import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import noVideo from '../../../../../../public/noVideo.png';
import playstation from '../../../../../../public/playstation.png';

export default async function media({ params }) {
  return (
    <div className='flex justify-center m-24'>
      <div style={{width:'1280px', justifyContent:'center'}}>
        <div className='grid grid-cols-1'>
          <Image src={noVideo} width='1280' height='720' alt="placeholder video image"/>
          <div>
            <h1 className='text-2xl font-semibold flex justify-start'>mediaName</h1>
          </div>
          <div className='flex grid grid-cols-2'>
            <div className='flex'>
              <Image src={playstation} width='50' height='50' alt="playstation default avatar placeholder image profile picture"/>
              <div>
                <h2 className='text-xs font-normal flex justify-start'>professionalName</h2>
                <h3 className='text-sm font-normal flex justify-start'>specialty</h3>
              </div>
            </div>
            <div className='flex justify-end gap-4'>
              <button>subscribe</button>
              <button>bell-icon</button>
              <button>heart-icon</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
