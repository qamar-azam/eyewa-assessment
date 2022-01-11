import { useSelector } from 'react-redux';
import { selectAlbum } from '../search/searchSlice';

const QuickViewOfAlbum = () => {
  const album = useSelector(selectAlbum);

  if (!album) {
    return null;
  }

  return (
    <div className='col-12 mb-4'>
      <div className='row'>
        <div className='col'>
          <img
            src={album.cover_medium}
            alt={album.title}
            className='rounded mb-1'
          />
        </div>
        <div className='col-9'>
          <h3>{album.title}</h3>

          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Artist</th>
                <th scope='col'>Time</th>
                <th scope='col'>Released</th>
              </tr>
            </thead>
            <tbody>
              {album.tracks?.data?.map((track, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{track.title}</td>
                  <td>{track.artist.name}</td>
                  <td>{(track.duration / 60).toFixed(2)}</td>
                  <td>{album.release_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuickViewOfAlbum;
