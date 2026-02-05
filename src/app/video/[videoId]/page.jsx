import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import noVideo from '../../../../public/default-thumbnail.png';
import defaultAvatar from '../../../../public/default-avatar.jpg';

export default function media({ params }) {
  return (
    <div className="m-24 flex justify-center">
      <div style={{ width: '1280px', justifyContent: 'center' }}>
        <div className="grid grid-cols-1">
          <Image
            src={noVideo}
            width="1280"
            height="720"
            alt="placeholder video image"
          />
          <div>
            <h1 className="flex justify-start text-2xl font-semibold">
              mediaName
            </h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex">
              <Image
                src={defaultAvatar}
                width="50"
                height="50"
                alt="default avatar placeholder image profile picture"
              />
              <div>
                <h2 className="flex justify-start text-xs font-normal">
                  professionalName
                </h2>
                <h3 className="flex justify-start text-sm font-normal">
                  specialty
                </h3>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button>subscribe</button>
              <button>bell-icon</button>
              <button>heart-icon</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
