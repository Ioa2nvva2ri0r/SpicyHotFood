import React from 'react';
import ContentLoader from 'react-content-loader';
import { nanoid } from 'nanoid';
// Slider-Swiper
import { Pagination, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Context
import { AppContext } from '../../App';
// Styles
import styles from './slider.module.scss';

const Slider = () => {
  // React-Context
  const { API } = React.useContext(AppContext);

  const arrayDataSlide = [
    {
      src: 'https://img.freepik.com/free-photo/top-view-of-pepperoni-pizza-sliced-into-six-slices_141793-2157.jpg?w=1060&t=st=1659524348~exp=1659524948~hmac=d097722194c0e1fdf4d86f136acaa073319f0ea138010503794e848a1f93f0d3',
      alt: 'Пицца',
      desc: (
        <>
          <span className={styles.desc__start}>При заказе </span>
          <strong className={`${styles.desc__name} ${styles.desc__m10}`}>
            «Пицца Пепперони на тонком тесте»
          </strong>{' '}
          <strong
            className={`${styles.desc__note} ${styles.desc__note_red} ${styles.desc__note_mw} ${styles.desc__end}`}
          >
            вторая бесплатно!
          </strong>
        </>
      ),
    },
    {
      src: 'https://img.freepik.com/free-photo/top-view-sushi-set-with-soy-sauce-and-chopsticks-in-wooden-serving-board_176474-3466.jpg?w=1060&t=st=1659524421~exp=1659525021~hmac=2e80686efd660120be1965a4df2acc4f12a32d0bd222683bbedda0ebf4187103',
      alt: 'Суши',
      desc: (
        <>
          <strong className={styles.desc__note}>Только по будням!</strong>{' '}
          <span className={`${styles.desc__end} ${styles.desc__note_red}`}>
            С 11.00 до 14.00{' '}
            <strong className={styles.desc__note}>скидка на всё 10%</strong>
            Успей купить!
          </span>
        </>
      ),
    },
    {
      src: 'https://img.freepik.com/free-photo/pizza-with-salami-tomatoes-olives-and-cheese-on-a-dough-with-whole-wheat-flour-italian-food_2829-6855.jpg?w=1060&t=st=1659524389~exp=1659524989~hmac=61b26913564083dbdd6e2d6c6e2485044d8fb027a654dc18abdee24aa041a5cc',
      alt: 'Пицца',
      desc: (
        <>
          <strong className={`${styles.desc__note} ${styles.desc__center}`}>
            ТОЛЬКО РАЗ В МЕСЯЦ!!!
          </strong>{' '}
          <span className={`${styles.desc__m10} ${styles.desc__center}`}>
            Каждый четвёртый четверг месяца с 11.00 до 17.00
          </span>{' '}
          <strong
            className={`${styles.desc__note} ${styles.desc__note_red} ${styles.desc__center}`}
          >
            скидка 50%!
          </strong>
        </>
      ),
    },
    {
      src: 'https://img.freepik.com/free-photo/mexican-tacos-with-beef-in-tomato-sauce-and-salsa_2829-14250.jpg?w=1060&t=st=1659525940~exp=1659526540~hmac=80e4c2a7f981f8607b97a62ac3b826a96cb5526204f1c48bd55c3529455c5e7b',
      alt: 'Тако',
      desc: (
        <>
          <strong
            className={`${styles.desc__note} ${styles.desc__note_red} ${styles.desc__center}`}
          >
            ХИТ ЭТОГО СЕЗОНА!
          </strong>{' '}
          <strong className={styles.desc__name}>
            «Тако с говядиной в томатном соусе и сальсой»
          </strong>
        </>
      ),
    },
  ];

  return (
    <div className={styles.main__container}>
      {API.loading ? (
        <ContentLoader
          speed={1}
          width={1370}
          height={400}
          viewBox="0 0 1370 400"
          backgroundColor="#f8f5f1"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="15" ry="15" width="1370" height="400" />
        </ContentLoader>
      ) : (
        <Swiper
          className={styles.main}
          modules={[Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          fadeEffect={{
            crossFade: true,
          }}
          loop={true}
          speed={800}
          pagination={{ clickable: true }}
        >
          {arrayDataSlide.map((obj) => (
            <SwiperSlide key={nanoid()}>
              <div className={styles.content}>
                <picture className={styles.img__box}>
                  <source className={styles.img} srcSet={obj.src} />
                  <img className={styles.img} src={obj.src} alt={obj.alt} />
                </picture>
                <p className={styles.desc}>{obj.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Slider;
