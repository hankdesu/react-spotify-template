import React, {
  useCallback,
  useId,
  useRef,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import classNames from 'classnames';

import IconTimer from '../../../assets/images/icon-timer.svg';

function Cell() {
  return null;
}

function Table({
  indexCell, timeCell, data, loadMoreRef, children,
}) {
  const id = useId();
  const titleRef = useRef();
  const [titleVisible, setTitleVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setTitleVisible(!entries[0].isIntersecting);
    });
    if (titleRef.current) observer.observe(titleRef.current);
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, []);

  function calculateLoadMoreRefPosition() {
    const dataLength = data.length;
    const eightyPercentIndex = Math.floor(dataLength * 0.8);
    return eightyPercentIndex;
  }

  function renderCells(rowData, cells) {
    if (Array.isArray(cells) && cells.length > 0) {
      return cells.map((cell) => {
        const { dataKey, render } = cell.props;
        if (render && isFunction(render)) {
          return render({ rowData, dataKey });
        }
        return <div key={`${dataKey}}-${rowData.id}`} className="flex items-center justify-start"><span className="text-sm">{rowData[dataKey] || ''}</span></div>;
      });
    }
    return null;
  }

  function renderRows(cells) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((rowData, index) => (
        <div
          key={rowData.id}
          className="grid gap-[16px] grid-cols-playlist-table px-[16px] text-[#b3b3b3] cursor-default h-[56px] rounded hover:bg-[rgba(255,255,255,.1)]"
          ref={loadMoreRef && index === calculateLoadMoreRefPosition() ? loadMoreRef : null}
        >
          {indexCell && <div className="flex items-center relative"><span className="absolute right-1">{index + 1}</span></div>}
          {renderCells(rowData, cells)}
          {timeCell && <div className="flex items-center justify-end">{rowData.duration}</div>}
        </div>
      ));
    }
    return null;
  }

  function renderTitleRow(cells) {
    if (Array.isArray(cells) && cells.length > 0) {
      return (
        <>
          {indexCell && <div className="flex items-center">#</div>}
          {cells.map((cell) => {
            const { name } = cell.props;
            return <div key={`${id}-${name}`} className="flex items-center justify-start"><span className="text-xs uppercase">{name}</span></div>;
          })}
          {timeCell && <div className="flex items-center justify-end"><IconTimer className="fill-current" /></div>}
        </>
      );
    }
    return null;
  }

  const getCells = useCallback(
    () => React.Children.toArray(children).filter(({ type }) => type === Cell),
    [children],
  );

  const cells = getCells(children);

  return (
    <>
      <div ref={titleRef} />
      <div className={classNames(
        'h-[36px] mb-[16px] sticky mx-[-32px] px-[32px] top-0 z-10',
        { 'bg-[#181818]': titleVisible, 'border-b border-solid border-[rgba(255,255,255,.1)]': titleVisible },
      )}
      >
        <div className={classNames(
          'grid gap-[16px] grid-cols-playlist-table px-[16px] text-[#b3b3b3] border-b border-solid h-full',
          { 'border-[rgba(255,255,255,.1)]': !titleVisible, 'border-[transparent]': titleVisible },
        )}
        >
          {renderTitleRow(cells)}
        </div>
      </div>
      {renderRows(cells)}
    </>
  );
}

Cell.defaultProps = {
  name: '',
};

Cell.propTypes = {
  name: PropTypes.string,
};

Table.defaultProps = {
  data: [],
  indexCell: true,
  timeCell: true,
  loadMoreRef: () => null,
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  indexCell: PropTypes.bool,
  timeCell: PropTypes.bool,
  loadMoreRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({}),
  ]),
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

Table.Cell = Cell;

export default Table;
