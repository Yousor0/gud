import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import playstation from '../../../../public/playstation.png';

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

    return (
        // add boiler plates for headers and footers
    <div>
        <div>User ID: { userId }</div>;
        <div className='m-24 grid grid-cols-2 gap-20 flex justify-center'>
            <div>
                <div className='flex justify-center'>
                    <Image src={playstation} width='220' height='220' alt="playstation default avatar placeholder image profile picture"/>
                </div>
                <div>
                    <h1 className='text-xl font-semibold flex justify-center'>professionalName</h1>
                    <h3 className='text-sm font-normal flex justify-center'>specialty</h3>
                </div>
                <div className='grid grid-cols-2 flex justify-center gap-5'>
                    <button className='flex justify-end'>fitnessNutritionProfessional</button>
                    <button className='flex justify-start'>heart-icon</button>
                </div>
            </div>

            <div>
                <div className='grid grid-cols-1 gap-4'>
                    <h2 className='text-lg font-semibold'>Get a personalized fitnessNutrition plan</h2>
                    <p className='text-base font-normal'>Achieve your fitness goals with a custom workoutNutritional plan tailored to your needs and goals</p>
                    <button className='flex justify-left'>Message Professional</button>
                </div>
                <div>
                    <h2 className='text-lg font-semibold'>Specialties:</h2>
                    <ul className='text-sm font-normal'>
                        <li>specialty1</li>
                        <li>specialty2</li>
                        <li>specialty3</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className='m-24 flex justify-center grid grid-cols-1'>
            <div>
                <h4 className='text-lg font-semibold'>Content By professionalName</h4>
            </div>
            <div className='justify-center'>
                <ul className='flex grid grid-cols-3 gap-35 justify-center'>
                    <li className='flex justify-center'>content1</li>
                    <li className='flex justify-center'>content2</li>
                    <li className='flex justify-center'>content3</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

// export default async function professionalProfile({ params }){
//     const { userId } = await params;
// };
