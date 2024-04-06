import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1118`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPokemonList(data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemonList(filtered);
    setCurrentPage(1); // Reset currentPage when search query changes
  }, [pokemonList, searchQuery]);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalPages = Math.ceil(filteredPokemonList.length / ITEMS_PER_PAGE);

  return (
    <div>
      <div className='navbar p-4 shadow mb-5 justify-content-between align-items-center' style={{ backgroundColor: 'rgba(85, 44, 140, 1)'}} >
     <h1 className='fw-bolder text-white'>Pokemon List</h1>
      <div className="d-flex">
    <input
      className='form-control mr-sm-2'
      type="text"
      placeholder="Search Pokemon..."
      value={searchQuery}
      onChange={handleSearchInputChange}
    />
  </div>
</div>


      <div className='container'>
        <ul className='row'>
          {filteredPokemonList
            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
            .map((pokemon, index) => (
              <li className='col-md-3 card list-unstyled shadow m-4  bg-gradient' style={{ backgroundColor: 'rgba(182, 148, 228, 0.8)' }} key={index}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`}
                  className="p-0 m-0 card-img"
                  alt={`Imagen de ${pokemon.name}`}
                />
                <p className='fw-bold text-capitalize fs-4 text-center'>{pokemon.name}</p>
              </li>
            ))}
        </ul>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link text-white fs-2" style={{ backgroundColor: 'rgba(182, 148, 228, 0.8)' }} onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link text-white fs-2" style={{ backgroundColor: 'rgba(182, 148, 228, 0.8)' }} onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
            </li>
          </ul>
          <div className="pagination justify-content-center">
            <span className="page-link text-white fw-normal fs-3" style={{ backgroundColor: 'rgba(182, 148, 228, 0.8)' }}>{currentPage} / {totalPages}</span>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
