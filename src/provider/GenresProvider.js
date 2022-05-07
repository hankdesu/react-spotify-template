import React from 'react';
import PropTypes from 'prop-types';

import useAvailableGenreSeedsQuery from '../hooks/Genres/useAvailableGenreSeedsQuery';
import { GenresContext } from '../store/contextStore';

function GenresProvider({ children }) {
  const { data } = useAvailableGenreSeedsQuery();

  return <GenresContext.Provider value={data?.genres}>{children}</GenresContext.Provider>;
}

GenresProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GenresProvider;
