import React, { useState } from 'react';
import '../styles/AvatarSeletor.css';

const avatarList = [
  { id: 'raposa', src: '/avatar/avatar1.png', alt: 'Avatar Raposa' },
  { id: 'macaco', src: '/avatar/avatar2.png', alt: 'Avatar Macaco' },
  { id: 'tigre', src: '/avatar/avatar3.png', alt: 'Avatar Tigre' },
  { id: 'panda', src: '/avatar/avatar4.png', alt: 'Avatar Panda' },
];

const AvatarSeletor = ({ selectedAvatar, onSelect }) => {
  return (
    <div className="avatar-selector">
      {avatarList.map((avatar) => (
        <div
          key={avatar.id}
          className={`avatar-option ${selectedAvatar === avatar.id ? 'selected' : ''}`}
          onClick={() => onSelect(avatar.src.replace('/avatar/', '').replace('.png', ''))}
        >
          <img src={avatar.src} alt={avatar.alt} />
        </div>
      ))}
    </div>
  );
};

export default AvatarSeletor;
