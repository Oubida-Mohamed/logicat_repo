import React, { useState } from 'react';
import { data } from './constants';
import './App.css';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState('WorkshopDataCars');
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const product = data.products[selectedProduct];
  const currencySymbol = data.currencies[selectedCurrency];

  console.log(product.packs)
  return (
    <div className="pricing-table">
      <div className="pricing-header">
        <div className="currency-selector">
          {Object.keys(data.currencies).map(currency => (
            <button
              key={currency}
              className={`currency-btn ${selectedCurrency === currency ? 'active' : ''}`}
              onClick={() => setSelectedCurrency(currency)}
            >
              {currency}
            </button>
          ))}
        </div>
        
        <h1>Our Products</h1>
        
        

        <div className="billing-toggle">
          <button 
            className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
            onClick={() => setBillingCycle('annual')}
          >
            Annual
          </button>
        </div>
      </div>


      <div className="product-selector">
        <div className='togle-side-button'>
          <button 
            className={`toggle-btn ${selectedProduct === 'WorkshopDataCars' ? 'active' : ''}`}
            onClick={() => setSelectedProduct('WorkshopDataCars')}
          >
            WorkshopData Cars
          </button>
          <button 
            className={`toggle-btn ${selectedProduct === 'WorkshopDataTrucks' ? 'active' : ''}`}
            onClick={() => setSelectedProduct('WorkshopDataTrucks')}
          >
            WorkshopData Trucks
          </button>
        </div>
      </div>

      <div className="plans-container">
        {Object.entries(product.packs).map(([packKey, pack]) => (
          <div key={packKey} className="plan-card">
            <h3 className="plan-name">{pack.name}</h3>
            
            <div className="user-options">
              {pack.users.map(userCount => (
                <span key={userCount} className="user-option">
                  {userCount} users
                </span>
              ))}
            </div>
            
            <div className="price">
              {currencySymbol}{pack.pricing[billingCycle][selectedCurrency].price}
              <span className="billing-period">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>
            
            <a 
              href={pack.pricing[billingCycle][selectedCurrency].link}
              className="subscribe-btn"
              target="_blank"
            >
              Subscribe
            </a>
            
            <ul className="features-list">
              {pack.features[billingCycle].map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="checkmark">-</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <a href="#" className="learn-more">
              Learn more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;