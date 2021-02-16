import 'netslider/dist/styles.min.css';
import React, { useEffect, useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ListTabByInstrument.css';

const ListTabByInstrument = (props) => {
  const { sendRequest } = useHttpClient();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [loadedTabsByInstrument, setLoadedTabsByInstrument] = useState();

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tabs/allByInstrumentId/${props.id}`
        );
        console.log(responseData.tabs);
        setLoadedTabsByInstrument(responseData.tabs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTabs();
  }, [sendRequest, props.id]);

  return (
    <>
      {loadedTabsByInstrument && (
        <div className="main-tabs-instru">
          <div className="tab">
            <>
              <h2>{props.name}</h2>
              <Slider {...settings}>
                {loadedTabsByInstrument &&
                  loadedTabsByInstrument.map((tab) => (
                    <Card className="card-data-last-instru">
                      <div key={tab.id} className="data-last-instru">
                        <Link
                          className="link-datas-instru"
                          to={`/tab/${tab.id}`}
                        >
                          {tab.name} - {tab.chanteur}
                        </Link>
                        <div className="instru-all-data">
                          <div className="tabs-data-instru">
                            <label>Difficulty:</label>
                            {tab.difficulty.name === 'easy' ? (
                              <h4 className="dif easy">
                                {tab.difficulty.name}
                              </h4>
                            ) : tab.difficulty.name === 'medium' ? (
                              <h4 className="dif medium">
                                {tab.difficulty.name}
                              </h4>
                            ) : tab.difficulty.name === 'hard' ? (
                              <h4 className="dif hard">
                                {tab.difficulty.name}
                              </h4>
                            ) : null}
                          </div>
                          <div className="tabs-data-instru">
                            <label>Type:</label>
                            <h4> {tab.type.name}</h4>
                          </div>
                          <div className="tabs-data-instru">
                            <label>Instrument:</label>
                            <h4>{tab.instrument.name}</h4>
                          </div>
                        </div>
                      </div>
                      <Link className="tabs-choose" to={`/tab/${tab.id}`}>
                        <button className="pill button ">Choisir</button>
                      </Link>
                    </Card>
                  ))}
              </Slider>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default ListTabByInstrument;