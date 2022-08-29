import classes from './Trends.module.scss'
import React from 'react';

function Trends() {

    const trends = [{ title: '#Ukraine', trendingWith: '#Russia', number: '160K Rweets', category: 'War in Ukraine', key: Math.random() },
    { title: 'House of the Dragon', number: '50K Rweets', category: 'Television', key: Math.random() },
    { title: 'COVID-19: News and updates', category: 'COVID-19', key: Math.random() },
    { title: '#Wordle429', category: 'Crossword puzzles', key: Math.random() }, { title: '#TheRingsOfPower', number: '10K Rweets', category: 'Television', key: Math.random() }];
    return <div > <h2>What&apos;s happening</h2>
        <div >{trends.map((trend) => (
            <div key={trend.key} className={classes.trending}><p>{trend.category}</p><p className={classes.trendtitle}>{trend.title}</p>{trend.number && <p>{trend.number}</p>} {trend.trendingWith && <p>Trending with {trend.trendingWith}</p>}</div>
        )

        )
        }  </div>
    </div>

}
export default Trends