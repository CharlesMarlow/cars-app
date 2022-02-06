import React from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce, renderErrorMessage } from '../../helpers/utils';
import { getMakes, getModels } from '../../api/api';
import Modal from '../Modal/Modal';
import '../../styles/main.css';

const Home = () => {
  const navigate = useNavigate();
  const [makes, setMakes] = React.useState([]);
  const [term, setTerm] = React.useState('');
  const [modelsError, setModelsError] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);

  const renderSearchInput = () => {
    return (
      <form action='/' method='get' className='search-form'>
        <h3>Search by manufacturer:</h3>
        <div className='action-container'>
          <input
            type='text'
            data-testid='home-search'
            placeholder='For example: Ford, BMW'
            className='search-input'
            value={term}
            onChange={(e) => debounce(onSearchChange(e))}
          />
        </div>
      </form>
    );
  };

  const onSearchChange = async (e) => {
    e.preventDefault();
    setTerm(e.target.value);
  };

  const onMakeClick = async () => {
    const { data, err } = await getModels(term);
    if (err) {
      setServerError(true);
      return;
    }
    if (data.length === 0) {
      setModelsError(true);
    }

    if (data && data.length >= 1) {
      setModelsError(false);
      navigate('/models', { state: { models: data, make: term } });
    }
  };

  const renderModelErrorMessage = () => {
    setTimeout(() => {
      setModelsError(false);
    }, 3000);
    return renderErrorMessage('models');
  };

  const renderMakes = () => {
    if (makes && makes.length === 0) return [];
    if (term === '') return [];
    return makes.map((make) => {
      return renderSingleMake(make);
    });
  };

  const renderSingleMake = (make) => {
    return (
      <div key={make}>
        <button data-testid='single-make' className='item-button' onClick={() => onMakeClick()}>
          {make}
        </button>
      </div>
    );
  };

  const fetchMakes = React.useCallback(async () => {
    if (term === '') {
      setModelsError(false);
    }
    const { data, err } = await getMakes(term);
    if (err) {
      setServerError(true);
    } else {
      setServerError(false);
      setMakes(data);
    }
  }, [term]);

  React.useEffect(() => {
    fetchMakes();
  }, [fetchMakes]);

  return (
    <div className='screen-container'>
      {renderSearchInput()}
      {modelsError && renderModelErrorMessage()}
      {renderMakes()}
      {serverError && (
        <Modal
          text={'Service unavailable. Please try again'}
          closeModal={setServerError}
        />
      )}
    </div>
  );
};

export default Home;
