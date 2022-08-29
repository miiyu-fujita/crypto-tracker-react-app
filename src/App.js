
import axios from "axios";
import {useState, useEffect} from "react";
import Coin from "./Coin";
import './App.css'

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect( () => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false
    `) // promise 
    .then(res => {
      setCoins(res.data)
      console.log(res.data)
    }).catch(error => alert("error!"))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
    console.log(coins)
  }

  function filterCoins(coin) {
    return coin.name.toLowerCase().includes(search.toLowerCase())
  }

  const filteredCoins = coins.filter(filterCoins);

  return (
    <div className="App">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input onChange={handleChange} type="text" placeholder="Search" className="coin-input"/>
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (<Coin 
          key = {coin.id}
          image={coin.image}
          name = {coin.name}
          symbol={coin.symbol}
          price={coin.current_price}
          volume={coin.total_volume}
          priceChange={coin.price_change_percentage_24h}
          marketcap={coin.market_cap}
          low24={coin.low_24h}
          high24={coin.high_24h}
        />)
      }
      )}
    </div>

  );
}

export default App;
