import React from 'react';

import Logo from '../../../assets/images/logo.svg';

function Banner() {
  return (
    <div className="flex px-[24px] text-white mb-[18px] justify-between">
      <Logo className="h-[40px] max-w-[131px] w-full" />
    </div>
  );
}

export default Banner;
