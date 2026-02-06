import React from 'react';
import Image from 'next/image';
import defaultAvatar from '../../../public/default-avatar.jpg';

function profile() {
  return (
    <div className="grid grid-cols-1">
      <div>
        <h1 className="text-xl font-semibold">My Profile</h1>
      </div>
      <div className="flex justify-center gap-18">
        <div>
          <div>
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
            <h2 className="flex justify-center text-lg font-semibold">
              My Membership
            </h2>
          </div>
          <div className="flex grid grid-cols-1 justify-center">
            <h4 className="flex justify-center">Premium Plan</h4>
            <button>Manage Membership</button>
          </div>
        </div>
        <div className="flex grid grid-rows-2 gap-8">
          <div>
            <div>
              <div>
                <h2 className="text-lg font-semibold">Edit Profile</h2>
                <div className="flex">
                  <div>
                    <h4>Profile Photo</h4>
                    <Image
                      src={defaultAvatar}
                      width="110"
                      height="110"
                      alt="default avatar placeholder image profile picture"
                    />
                  </div>
                  <div className="flex grid grid-cols-1">
                    <p>download-icon</p>
                    <p>here is where an input field would go</p>
                    <button>Edit Photo</button>
                  </div>
                </div>
                <div className="flex grid grid-cols-1">
                  <h4>Email</h4>
                  <p>here is where an input field would go</p>
                  <button>Edit Email</button>
                </div>
                <div className="flex grid grid-cols-1">
                  <h4>Current Password</h4>
                  <p>here is where an input field would go</p>
                  <button>Edit Password</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex grid grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold">Accessibility</h2>
              <h3 className="text-sm font-normal">
                Customize your experience for comfort and readability
              </h3>
              <p className="text-base font-normal">Dark Mode</p>
              <p className="text-base font-normal">High Contrast</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Devices</h2>
              <h3 className="text-sm font-normal">
                Connect your device to optimize your experience
              </h3>
              <button>Add New Device</button>
            </div>
            <div>
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
