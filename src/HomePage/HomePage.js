import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartJSComponent from '../components/ChartJSComponent';
import D3Component from '../components/D3Component';
import './HomePage.scss';

function HomePage() {
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:3000/budget');
        setBudgetData(response.data);
      } catch (err) {
        setError('Failed to load budget data. Please try again later.');
        console.error('Error fetching budget data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, []);

  return (
    <main className="center" id="main">
      <section className="page-area">
        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to track it down,
            you would get surprised! Proper budget management depends on real data... and this
            app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
          </p>
        </article>

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get out of debt faster!
            Also, they to live happier lives... since they expend without guilt or fear... 
            because they know it is all good and accounted for.
          </p>
        </article>

        <article>
          <h1>Free</h1>
          <p>
            This app is free!!! And you are the only one holding your data!
          </p>
        </article>

        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to track it down,
            you would get surprised! Proper budget management depends on real data... and this
            app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
          </p>
        </article>

        {error && (
          <article>
            <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          </article>
        )}

        {loading ? (
          <article>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h3>Loading Budget Data...</h3>
              <p>Please wait while we fetch your budget information.</p>
            </div>
          </article>
        ) : (
          <div className="chart-container">
            <article className="chart-article">
              <h1>Chart.js</h1>
              <ChartJSComponent data={budgetData} type="doughnut" />
            </article>

            <article className="chart-article">
              <h1>D3.js Chart</h1>
              <D3Component data={budgetData} />
            </article>
          </div>
        )}

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get out of debt faster!
            Also, they to live happier lives... since they expend without guilt or fear... 
            because they know it is all good and accounted for.
          </p>
        </article>
      </section>
    </main>  
  );
}

export default HomePage