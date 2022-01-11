import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { searchAutoComplete, searchByArtist } from './searchSlice';
import SearchSuggestion from './SearchSuggestion';

// styling
import './Search.scss';

const SEARCH_DELAY_TIME = 2000;

const Search = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);

  /**
   * hide the search suggestion dialog if clicked outside or ESC key pressed
   */
  useEffect(() => {
    const clickedOutsideOrESCKey = (e) => {
      if (showSuggestion) {
        if (
          (ref.current && !ref.current.contains(e.target)) ||
          e.keyCode === 27
        ) {
          setShowSuggestion(false);
        }
      }
    };

    document.addEventListener('mousedown', clickedOutsideOrESCKey);
    document.addEventListener('keydown', clickedOutsideOrESCKey);

    return () => {
      document.removeEventListener('mousedown', clickedOutsideOrESCKey);
      document.removeEventListener('keydown', clickedOutsideOrESCKey);
    };
  }, [showSuggestion]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        dispatch(searchAutoComplete(searchTerm));
        setShowSuggestion(true);
      }
    }, SEARCH_DELAY_TIME);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByArtist(searchTerm));
    setShowSuggestion(false);
  };

  return (
    <div className='search-bar'>
      <form className='center' onSubmit={handleSubmit}>
        <div className='form-row justify-content-md-center position-relative'>
          <div className='col-sm-6 my-1' ref={ref}>
            <label className='sr-only' htmlFor='inlineFormInputName'>
              Search by artist
            </label>
            <input
              type='search'
              className='form-control'
              value={searchTerm}
              placeholder='Search by Artist'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {showSuggestion && <SearchSuggestion />}
          </div>

          <div className='col-auto my-1'>
            <button type='submit' className='btn btn-primary'>
              SEARCH
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
