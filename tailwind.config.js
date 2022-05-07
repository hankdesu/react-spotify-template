module.exports = {
  content: ['./src/*.{html,js,jsx}', './src/**/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: 'auto 1fr',
        8: 'repeat(8, minmax(0, 1fr))',
        'repeat-fill-25%-1fr': 'repeat(auto-fill, minmax(25%, 1fr))',
        'playlist-table': '[index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px,1fr)',
      },
      gridTemplateRows: {
        layout: '1fr auto',
      },
      boxShadow: {
        '3xl': '0 4px 60px rgb(0 0 0 / 50%)',
      },
      colors: {
        'base-black': '#121212',
        'base-green': '#1ed760',
        'hover-green': '#1fdf64',
        'active-green': '#169c46',
        'base-grey': '#b3b3b3',
        'loved-songs-gradient': 'linear-gradient(135deg,#450af5,#c4efd9)',
        'half-black': 'rgba(0,0,0,.5)',
        '144-24-48': 'rgb(144, 24, 48)',
        '72-160-176': 'rgb(72, 160, 176)',
        '184-96-0': 'rgb(184, 96, 0)',
        '240-24-48': 'rgb(240, 24, 48)',
        '80-32-32': 'rgb(80, 32, 32)',
        '144-144-152': 'rgb(144, 144, 152)',
        '160-80-80': 'rgb(160, 80, 80)',
        '48-56-80': 'rgb(48, 56, 80)',
        '128-72-72': 'rgb(128, 72, 72)',
        '112-152-216': 'rgb(112, 152, 216)',
        '72-32-40': 'rgb(72, 32, 40)',
        '83-83-83': 'rgb(83, 83, 83)',
        '48-48-64': 'rgb(48, 48, 64)',
        '16-136-184': 'rgb(16, 136, 184)',
        '216-16-136': 'rgb(216, 16, 136)',
      },
    },
  },
  plugins: [],
};
