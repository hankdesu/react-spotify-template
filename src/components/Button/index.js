import React from 'react';

export function LoginButton(props) {
  return (
    <button
      type="button"
      className="group relative bg-base-green p-5 rounded-full font-medium hover:bg-hover-green hover:scale-[1.04] active:bg-active-green"
      {...props}
    >
      <p>Login with Spotify Account</p>
      <div className="absolute top-[-6px] left-[-6px] w-[calc(100%+12px)] h-[calc(100%+12px)] group-active:border-black group-active:rounded-full group-active:border-solid group-active:border-[3px]" />
    </button>
  );
}
