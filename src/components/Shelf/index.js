import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function ShelfItemH({ name, image }) {
  return (
    <div className="h-[80px] bg-[rgba(255,255,255,.1)] flex rounded hover:bg-[rgba(255,255,255,.2)] cursor-pointer">
      <img src={image} alt="item-cover" className="w-[80px] h-[80px]" />
      <div className="flex justify-between px-4 items-center text-white text-base font-bold text-ellipsis flex-1 overflow-hidden">
        <span>{name}</span>
        <div className="h-[48px] w-[48px]G" />
      </div>
    </div>
  );
}

function ShelfItemV({ name, image, artistNames }) {
  return (
    <div className="p-4 flex flex-col bg-[#181818] rounded hover:bg-[#282828] cursor-pointer">
      <div className="relative flex justify-center">
        <img src={image} alt="item-cover" className="h-[160px] w-[160px] mb-4 rounded" />
        <div className="h-[48px] w-[48px] absolute bottom-6 right-6" />
      </div>
      <span className="text-white overflow-hidden whitespace-nowrap text-ellipsis">{name}</span>
      <span className="text-sm text-[#a7a7a7]">{artistNames}</span>
    </div>
  );
}

function Shelf({ data, orientation, title }) {
  const isHorizontal = orientation === 'horizontal';
  const isVertical = orientation === 'vertical';
  const ShelfItem = isHorizontal ? ShelfItemH : ShelfItemV;

  function renderItems() {
    if (!Array.isArray(data)) return null;
    const elements = data.map(({
      image, name, id, artistNames,
    }, index) => <ShelfItem key={`item-${id}-${index + 1}`} image={image} name={name} artistNames={artistNames} />);
    return elements;
  }

  return (
    <div className="flex flex-col">
      {title && (
      <span className={classNames({
        'mb-4 text-4xl text-white font-bold': isHorizontal,
        'mb-4 text-2xl text-white font-bold': isVertical,
      })}
      >
        {title}
      </span>
      )}
      <div className={classNames({
        'grid gap-y-4 gap-x-[24px] grid-rows-[auto] grid-cols-repeat-fill-25%-1fr': isHorizontal,
        'grid gap-4 grid-rows-1 grid-cols-8': isVertical,
      })}
      >
        {renderItems()}
      </div>
    </div>
  );
}

Shelf.defaultProps = {
  data: [],
  title: '',
  orientation: 'vertical',
};

Shelf.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  orientation: PropTypes.string,
};

const defaultProps = {
  name: '',
  image: '',
};

const propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};

ShelfItemH.defaultProps = {
  ...defaultProps,
};

ShelfItemH.propTypes = {
  ...propTypes,
};

ShelfItemV.defaultProps = {
  ...defaultProps,
  artistNames: '',
};

ShelfItemV.propTypes = {
  ...propTypes,
  artistNames: PropTypes.string,
};

export default Shelf;
