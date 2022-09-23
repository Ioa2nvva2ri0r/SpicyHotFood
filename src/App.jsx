import React from 'react';
import { Routes, Route } from 'react-router-dom';
// lazysizes Image
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
// Auxiliary Functions
import {
  dataAPI,
  dataLocalStorage,
} from './auxiliary-functions/DataProcessing';
import { calculationCost } from './auxiliary-functions/CalculationCost';
import { discount } from './auxiliary-functions/Discount';
// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Message from './components/Message/Message';
import ModalBasket from './components/Modal/Modal-Basket/ModalBasket';
import ModalUserOrder from './components/Modal/Modal-UserOrder/ModalUserOrder';
import Main from './components/Main/Main';

// Context
export const AppContext = React.createContext({});

function App() {
  const searchCategory = new URLSearchParams(
    decodeURI(document.location.search)
  ).get('product');
  // Main
  const [dataApi, setDataApi] = React.useState([]);
  const [arrayCategory, setArrayCategory] = React.useState([]);
  const [category, setCategory] = React.useState(
    searchCategory !== null ? searchCategory : 'Популярные'
  );
  const [preloaderCatalog, setPreloaderCatalog] = React.useState(false);
  // Basket
  const [dataBasket, setDataBasket] = React.useState([]);
  const [modalBasket, setModalBasket] = React.useState(false);
  // Favorite
  const [dataFavorite, setDataFavorite] = React.useState([]);
  // Basket-Favorite
  const [changeDataBasketFavorite, setChangeDataBasketFavorite] =
    React.useState({});
  // User-Order
  const [dataApiUser, setDataApiUser] = React.useState([]);
  const [completeOrder, setCompleteOrder] = React.useState(false);
  const [changeDataUserOrder, setChangeDataUserOrder] = React.useState({});
  const [preloaderUserOrder, setPreloaderUserOrder] = React.useState(false);
  const [modalUserOrder, setModalUserOrder] = React.useState(false);
  const [modalUserOrOrder, setModalUserOrOrder] = React.useState('');
  const [messageUserOrOrder, setMessageUserOrOrder] = React.useState('');
  // Final Cost
  const [finalCost, setFinalCost] = React.useState(0);
  const [discountWeekdays, setDiscountWeekdays] = React.useState(0);
  // Message Output
  const [messageOutput, setMessageOutput] = React.useState(false);

  // Screen Size
  const [screenSize, setScreenSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  React.useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      setScreenSize([window.innerWidth, window.innerHeight]);
    });
  }, []);

  // GET-Data-API -> Catalog  &&  // GET-Data-LocalStorage -> Favorite
  React.useEffect(() => {
    dataAPI(
      { path: 'product', method: 'GET', category: category },
      {
        loading: setPreloaderCatalog,
        ...(category !== 'Избранные' && {
          getData: setDataApi,
        }),
        getCategories: setArrayCategory,
      }
    );
    dataLocalStorage({ method: 'GET', key: 'favorite' }, setDataFavorite);
  }, [category]);

  // GET-Data-API -> User
  React.useEffect(() => {
    dataAPI(
      { path: 'user', method: 'GET' },
      {
        loading: setPreloaderUserOrder,
        getData: setDataApiUser,
      }
    );
  }, [modalUserOrder]);

  // GET-Data-LocalStorage -> Basket
  React.useEffect(() => {
    dataLocalStorage({ method: 'GET', key: 'basket' }, setDataBasket);
    setDiscountWeekdays(
      discount({ day: 'weekdays' }, '11-14', 10) +
        discount(
          {
            week: 4,
            day: 'tuesday',
          },
          '11-17',
          50
        )
    );
  }, [modalBasket, messageUserOrOrder]);

  // Change Final Cost Basket
  React.useEffect(() => {
    setFinalCost(
      dataBasket
        .map((obj) =>
          calculationCost(obj.name, obj.amount, obj.size, obj.price, true)
        )
        .reduce((prev, curr) => prev + curr, 0)
    );
  }, [dataBasket]);

  // Change Data -> Basket & Favorite
  React.useEffect(() => {
    if (Object.keys(changeDataBasketFavorite).length !== 0)
      dataLocalStorage(
        {
          method: changeDataBasketFavorite.method,
          key: changeDataBasketFavorite.category,
          data: changeDataBasketFavorite.data,
        },
        changeDataBasketFavorite.category === 'basket'
          ? setDataBasket
          : setDataFavorite,
        setMessageOutput
      );
  }, [changeDataBasketFavorite]);

  React.useEffect(() => {
    if (Object.keys(changeDataUserOrder).length !== 0) {
      dataAPI(
        {
          path: changeDataUserOrder.path,
          method: changeDataUserOrder.method,
          id: changeDataUserOrder.id,
          data: changeDataUserOrder.data,
          process: changeDataUserOrder.process,
        },
        {
          loading: setPreloaderUserOrder,
          getData: setDataApiUser,
          getMessage: setMessageUserOrOrder,
        }
      );
    }
  }, [changeDataUserOrder]);

  return (
    <AppContext.Provider
      value={{
        screenSize,
        API: {
          data: dataApi,
          loading: preloaderCatalog,
        },
        category: {
          active: category,
          array: arrayCategory,
          funCategory: setCategory,
        },
        basket: {
          data: dataBasket,
          length: dataBasket.length,
          modal: modalBasket,
          funChange: setChangeDataBasketFavorite,
          funModal: setModalBasket,
        },
        favorite: {
          data: dataFavorite,
          length: dataFavorite.length,
        },
        order: {
          complete: completeOrder,
          funComplete: setCompleteOrder,
        },
        userOrder: {
          active: modalUserOrOrder,
          funActive: setModalUserOrOrder,
          funModal: setModalUserOrder,
        },
        finalCost,
        discount: discountWeekdays,
      }}
    >
      <div className="container">
        <Header />
        <Routes>
          <Route path={`/`} element={<Main path={searchCategory} />} />
        </Routes>
        <Footer />
        {modalBasket && <ModalBasket />}
        {modalUserOrder && (
          <ModalUserOrder
            dataUsers={dataApiUser}
            message={messageUserOrOrder}
            loading={preloaderUserOrder}
            funСhangingData={setChangeDataUserOrder}
            funMessage={setMessageUserOrOrder}
            funLoading={setPreloaderUserOrder}
          />
        )}
        {messageOutput !== false ? (
          <Message message={messageOutput} funMessage={setMessageOutput} />
        ) : null}
      </div>
    </AppContext.Provider>
  );
}

export default App;
