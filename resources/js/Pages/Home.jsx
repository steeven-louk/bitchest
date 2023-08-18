
import React from 'react'

import { Card } from 'antd';

const Home = () => {
  return (
    <>
      <div className="cryptoList flex flex-wrap">
        <Card className='card bg-slate-500 text-white rounded-md'>
          <div className="header inline-flex gap-3 align-baseline">
            <div className="card-img">Img</div>
            <h5 className="name">Bitcoin <br /> <span>BTC</span></h5>
          </div>
          <div className="card-bottom flex justify-between">
            <div className="amount">
              <h4>$52,291</h4>
            </div>

            <div className="chart">
              chart
            </div>
          </div>
        </Card>
        <Card className='card bg-slate-500 text-white rounded-md'>
          <div className="header inline-flex gap-3 align-baseline">
            <div className="card-img">Img</div>
            <h5 className="name">Bitcoin <br /> <span>BTC</span></h5>
          </div>
          <div className="card-bottom flex justify-between">
            <div className="amount">
              <h4>$52,291</h4>
            </div>
            <div className="chart">
              chart
            </div>
          </div>
        </Card>
        <Card className='card bg-slate-500 text-white rounded-md'>
          <div className="header inline-flex gap-3 align-baseline">
            <div className="card-img">Img</div>
            <h5 className="name">Bitcoin <br /> <span>BTC</span></h5>
          </div>
          <div className="card-bottom flex justify-between">
            <div className="amount">
              <h4>$52,291</h4>
            </div>
            <div className="chart border-green-700 w-[100%] h-[100%]">
              chart
            </div>
          </div>
        </Card>
        <Card className='card bg-slate-500 text-white rounded-md'>
          <div className="header inline-flex gap-3 align-baseline">
            <div className="card-img">Img</div>
            <h5 className="name">Bitcoin <br /> <span>BTC</span></h5>
          </div>
          <div className="card-bottom flex justify-between">
            <div className="amount">
              <h4>$52,291</h4>
            </div>
            <div className="chart">
              chart
            </div>
          </div>
        </Card>
        <Card className='card bg-slate-500 text-white rounded-md'>
          <div className="header inline-flex gap-3 align-baseline">
            <div className="card-img">Img</div>
            <h5 className="name">Bitcoin <br /> <span>BTC</span></h5>
          </div>
          <div className="card-bottom flex justify-between">
            <div className="amount">
              <h4>$52,291</h4>
            </div>
            <div className="chart">
              chart
            </div>
          </div>
        </Card>
        <Card className='card bg-slate-500 text-white rounded-md'>
          <div className="header inline-flex gap-3 align-baseline">
            <div className="card-img">Img</div>
            <h5 className="name">Bitcoin <br /> <span>BTC</span></h5>
          </div>
          <div className="card-bottom flex justify-between">
            <div className="amount">
              <h4>$52,291</h4>
            </div>
            <div className="chart">
              chart
            </div>
          </div>
        </Card>
      </div>

      <article className='flex gap-2 mt-2'>
        <Card className="portfolio bg-slate-500 text-white rounded-md" style={{ width: 220 }}>
          <h3>Portfolio</h3>
          <div className="currency mt-5 flex justify-between">
            <div className="flex flex-col">
              <span>Etherium</span>
              <span className='text-gray-300'>$2156</span>
            </div>
            <div className="flex-col flex">
              <span className='text-red-500'>-13.45</span>
              <span>0.2452145 ETH</span>
            </div>
          </div>

          <div className="currency mt-5 flex justify-between">
            <div className="flex flex-col">
              <span>Etherium</span>
              <span className='text-gray-300'>$2156</span>
            </div>
            <div className="flex-col flex">
              <span className='text-red-500'>-13.45</span>
              <span>0.2452145 ETH</span>
            </div>
          </div>

          <div className="currency mt-5 flex justify-between">
            <div className="flex flex-col">
              <span>Etherium</span>
              <span className='text-gray-300'>$2156</span>
            </div>
            <div className="flex-col flex">
              <span className='text-red-500'>-13.45</span>
              <span>0.2452145 ETH</span>
            </div>
          </div>

          <div className="currency mt-5 flex justify-between">
            <div className="flex flex-col">
              <span>Etherium</span>
              <span className='text-gray-300'>$2156</span>
            </div>
            <div className="flex-col flex">
              <span className='text-red-500'>-13.45</span>
              <span>0.2452145 ETH</span>
            </div>
          </div>

          <div className="currency mt-5 flex justify-between">
            <div className="flex flex-col">
              <span>Etherium</span>
              <span className='text-gray-300'>$2156</span>
            </div>
            <div className="flex-col flex">
              <span className='text-red-500'>-13.45</span>
              <span>0.2452145 ETH</span>
            </div>
          </div>

        </Card>
        <div className="chart text-center">
          <h1>CHART JS</h1>
        </div>
      </article>
    </>
  )
}

export default Home