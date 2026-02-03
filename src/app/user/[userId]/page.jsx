import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import defaultAvatar from '../../../../public/default-avatar.jpg';
import { users } from '../../../data/users.js'
import { notFound } from 'next/navigation';

export default async function professionalProfile({ params }) {
  const { userId } = await params;
  const profile = users.find((user) => user.id === userId);
  if (!profile) {
    notFound();
  }

  return (
    // add boiler plates for headers and footers
    <div>
        <div>User ID: { userId }</div>
        <div className='m-24 grid grid-cols-2 gap-20 flex justify-center'>
            <div>
                <div className='flex justify-center'>
                    <Image src={defaultAvatar} width='220' height='220' alt="default avatar placeholder image profile picture"/>
                </div>
                <div>
                    <h1 className='text-xl font-semibold flex justify-center'>{ profile.name.firstName } { profile.name.lastName } </h1>
                    <h3 className='text-sm font-normal flex justify-center'>{ profile.specialty[0] }</h3>
                </div>
                <div className='grid grid-cols-2 flex justify-center gap-5'>
                    <button className='flex justify-end'>{ profile.state } Professional</button>
                    <button className='flex justify-start'>heart-icon</button>
                </div>
            </div>

            <div>
                <div className='grid grid-cols-1 gap-4'>
                    <h2 className='text-lg font-semibold'>{ profile.about.header }</h2>
                    <p className='text-base font-normal'>{ profile.about.description }</p>
                    <button className='flex justify-left'>Message Professional</button>
                </div>
                <div>
                    <h2 className='text-lg font-semibold'>Specialties:</h2>
                    <ul className='text-sm font-normal'>
                        <li>{ profile.specialty[1] }</li>
                        <li>{ profile.specialty[2] }</li>
                        <li>{ profile.specialty[3] }</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>

        <div className='m-24 flex justify-center grid grid-cols-1'>
            <div>
                <h4 className='text-lg font-semibold'>Content By { profile.name.firstName } { profile.name.lastName }</h4>
            </div>
            <div className='justify-center'>
                <ul className='flex grid grid-cols-3 gap-35 justify-center'>
                    <li className='flex justify-center'>{ profile.content1 }</li>
                    <li className='flex justify-center'>{ profile.content2 }</li>
                    <li className='flex justify-center'>{ profile.content3 }</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}

// export default async function professionalProfile({ params }){
//     const { userId } = await params;
// };
