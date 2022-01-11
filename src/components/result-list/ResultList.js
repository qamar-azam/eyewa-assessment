import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuickViewOfAlbum from '../quick-view-of-album/QuickViewOfAlbum';
import {
  selectSearchSuggestions,
  selectSearchTerm,
  fetchTracksByAlbum
} from '../search/searchSlice';

const ALBUM_PER_COL = 4;

const ResultList = () => {
  const dispatch = useDispatch();
  const suggestions = useSelector(selectSearchSuggestions);
  const searchTerm = useSelector(selectSearchTerm);

  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const getTracksForAlbum = (id, index) => {
    dispatch(fetchTracksByAlbum(id));
    setSelectedAlbum(index);
  };

  if (searchTerm) {
    return (
      <>
        <h3 className='border-bottom mb-4'>
          Search results for "{searchTerm}"
        </h3>

        <div className='row result-list'>
          {suggestions.map((artist, index) => {
            let count = index + 1;
            return (
              <>
                <div
                  className='col mb-3'
                  key={index}
                  onClick={() => getTracksForAlbum(artist.album.id, count)}
                >
                  <img
                    src={artist.album.cover_medium}
                    alt={artist.album.title}
                    className='rounded mb-1'
                  />
                  <p className='text-center'>{artist.album.title}</p>
                </div>

                {selectedAlbum !== null &&
                count % ALBUM_PER_COL === 0 &&
                selectedAlbum <= count &&
                selectedAlbum > count - ALBUM_PER_COL ? (
                  <QuickViewOfAlbum />
                ) : null}
              </>
            );
          })}
        </div>
      </>
    );
  }

  return null;
};

export default ResultList;
