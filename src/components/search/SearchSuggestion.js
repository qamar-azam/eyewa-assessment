import { useSelector, useDispatch } from 'react-redux';

import { selectSearchSuggestions, searchByArtist } from './searchSlice';

const SearchSuggestion = () => {
  const dispatch = useDispatch();
  const suggestions = useSelector(selectSearchSuggestions);
  return (
    <div className='search-suggestion'>
      <ul>
        {suggestions.map((item) => {
          return (
            <li onClick={() => dispatch(searchByArtist(item.artist.name))}>
              {item.artist.name} - {item.album.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchSuggestion;
