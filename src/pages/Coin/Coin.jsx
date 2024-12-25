import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {

  const {coinId} = useParams();
  const [coinData, setCoinData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const {currency} = useContext(CoinContext)
  const [loading, setLoading] = useState(false);

  
  const fetchCoinData = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ifmWiV3j8ANiqq4YuawNVw3E'}
    };
    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    console.log(data);
    setCoinData(data); // Set the coin data
    setLoading(false)
  })
  .catch(err => {
    console.error('Fetch error:', err);
  })
  .finally(() => {
    setLoading(false); // Ensure loading state is reset
  });
  }

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ifmWiV3j8ANiqq4YuawNVw3E'}
    };
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,options);
      const data = await response.json();
      console.log(data)
      setHistoricalData(data);
      console.log("Hii")
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
  },[currency])



  // if(coinData && historicalData){
  // return (
  
//   )
// }else{

return (
  <>
    {loading ? (
      <div className="spinner">
        <div className="spin"></div> {/* Ensure this spinner has visible styles */}
      </div>
    ) : (
      <div className="coin">
        <div className="coin-name">
          {coinData.image?.large && (
            <img src={coinData.image.large} alt={coinData.name} />
          )}
          <p>
            <b>
              {coinData.name} ({coinData.symbol})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData}/>
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Crypto Price</li>
            <li>{currency.symbol} {coinData?.market_data?.current_price?.[currency.name]?.toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market cap</li>
            <li>{currency.symbol} {coinData?.market_data?.market_cap?.[currency.name]?.toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol} {coinData?.market_data?.high_24h?.[currency.name]?.toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol} {coinData?.market_data?.low_24h?.[currency.name]?.toLocaleString()}</li>
          </ul>
        </div>
      </div>
    )}
  </>
);
};


export default Coin
