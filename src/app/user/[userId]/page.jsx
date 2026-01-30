import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import playstation from '../../../../public/playstation.png';
import { users } from '../../userData/profileData/profiles.js'
import { notFound } from 'next/navigation';

// function Navigation() {
//   return (
//     <nav>
//       <Link href="/">Home</Link>
//       <Link href="/about">About Us</Link>
//     </nav>
//   );
// }


export default async function professionalProfile({ params }) {
    const { userId } = await params;
    const profile = users.find(user => user.id === userId)
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
                    <Image src={playstation} width='220' height='220' alt="playstation default avatar placeholder image profile picture"/>
                </div>
                <div>
                    <h1 className='text-xl font-semibold flex justify-center'>{ profile.name }</h1>
                    <h3 className='text-sm font-normal flex justify-center'>{ profile.specialty }</h3>
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
                        <li>{ profile.specialty1 }</li>
                        <li>{ profile.specialty2 }</li>
                        <li>{ profile.specialty3 }</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className='m-24 flex justify-center grid grid-cols-1'>
            <div>
                <h4 className='text-lg font-semibold'>Content By { profile.name }</h4>
            </div>
            <div className='justify-center'>
                <ul className='flex grid grid-cols-3 gap-35 justify-center'>
                    <li className='flex justify-center'>{ profile.content1.title }</li>
                    <li className='flex justify-center'>{ profile.content2.title }</li>
                    <li className='flex justify-center'>{ profile.content3.title }</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

// export default async function professionalProfile({ params }){
//     const { userId } = await params;
// };
