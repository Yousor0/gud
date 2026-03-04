import React from 'react';
import Image from 'next/image';
import defaultAvatar from '../../../public/default-avatar.jpg';
import Button from '../../components/ui/Button'

function profile() {
  return (
    <div className="grid grid-cols-1 m-24">
      <div className='m-8'>
        <h1 className="text-xl font-semibold">My Profile</h1>
      </div>
      <div className="flex justify-center gap-8">
        <div>
          <div className="flex flex-col gap-6 rounded-sm bg-white p-5">
            <div className="flex justify-center">
              <Image
                src={defaultAvatar}
                width="220"
                height="220"
                alt="default avatar placeholder image profile picture"
              />
            </div>
            <h2 className="flex justify-center text-lg font-semibold">
              profileName
            </h2>
            <h3 className="flex justify-center text-sm font-normal">
              profileEmail
            </h3>
          </div>
          <div>
            <div>
              <h2 className="flex justify-center text-lg font-semibold">
                My Membership
              </h2>
            </div>
            <div className="flex grid grid-cols-1 justify-center gap-6 rounded-sm bg-white p-5">
              <h4 className="flex justify-center">Premium Plan</h4>
              <Button text='Manage Membership'/>
            </div>
          </div>
        </div>
        <div className="flex grid gap-8">
          <div className="gap-6 rounded-sm bg-white p-5">
            <div >
              <div >
                <h2 className="text-lg font-semibold">Edit Profile</h2>
                <div className="flex grid-cols-2">
                  <div className="p-3">
                    <h4>Profile Photo</h4>
                    <Image
                      src={defaultAvatar}
                      width="80"
                      height="80"
                      alt="default avatar placeholder image profile picture"
                    />
                  </div>
                  <div>
                    <div className="mx-flex w-full max-w-full min-w-60 items-center gap-2 justify-self-start rounded-md border pl-3 sm:max-w-md md:max-w-xl lg:max-w-2xl">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full text-sm focus:outline-none sm:text-base"
                      />
                    </div>
                    <div className="">
                      <Button text='Edit Photo'/>
                    </div>
                  </div>
                </div>
                <div className="flex grid grid-cols-1">
                  <h4>Email</h4>
                  <div className="mx-auto flex w-full max-w-full min-w-60 items-center gap-2 justify-self-start rounded-md border pl-3 sm:max-w-md md:max-w-xl lg:max-w-2xl">
                    <input
                      type="text"
                      placeholder=""
                      className="w-full text-sm focus:outline-none sm:text-base"
                    />
                  </div>
                  <Button text='Edit Email'/>
                </div>
                <div className="flex grid grid-cols-1">
                  <h4>Current Password</h4>
                  <div className="mx-auto flex w-full max-w-full min-w-60 items-center gap-2 justify-self-start rounded-md border pl-3 sm:max-w-md md:max-w-xl lg:max-w-2xl">
                    <input
                      type="text"
                      placeholder=""
                      className="w-full text-sm focus:outline-none sm:text-base"
                    />
                  </div>
                  <Button text='Edit Password'/>
                </div>
                <div className='flex justify-center'>
                  <Button text='Delete Account' variant='delete'/>
                </div>
              </div>
            </div>
          </div>
          <div className="flex grid grid-cols-2 gap-8">
            <div className="rounded-sm bg-white p-5">
              <h2 className="text-lg font-semibold">Accessibility</h2>
              <h3 className="text-sm font-normal">
                Customize your experience for comfort and readability
              </h3>
              <p className="text-base font-normal">Dark Mode</p>
              <p className="text-base font-normal">High Contrast</p>
            </div>
            <div className="rounded-sm bg-white p-5">
              <h2 className="text-lg font-semibold">Devices</h2>
              <h3 className="text-sm font-normal">
                Connect your device to optimize your experience
              </h3>
              <Button text='Add New Device'/>
            </div>
            <div className="rounded-sm bg-white p-5 col-span-2">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <h3 className="text-sm font-normal">
                Choose what notifications you want to recieve from GÜD
              </h3>
              <p className="text-base font-normal">Email Updates</p>
              <p className="text-base font-normal">New Content Announcement</p>
              <p className="text-base font-normal">Message Notifications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
