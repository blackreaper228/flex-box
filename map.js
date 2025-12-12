    // init maps
    {
        const iconSize = [54, 64];
        const iconOffset = [0, -65];
        
        const initMaps = () => {
            const maps = document.querySelectorAll('.js-map');
            
            Array.from(maps).forEach((map) => {
                const myMap = new ymaps.Map(
                    map,
                    {
                      center: [55.494671, 37.423214],
                      zoom: 11,
                      controls: []
                    },
                    {
                        suppressMapOpenBlock: true
                    },
                    {
                      searchControlProvider: 'yandex#search'
                    }
                );
            
                myMap
                    .geoObjects
                    .add(
                        new ymaps.Placemark(
                            // [55.494288, 37.420644],
                            [55.494671, 37.423214],
                            {
                              hintContent: '',
                              balloonContent: ''
                            },
                            {
                              iconLayout: 'default#image',
                              iconImageHref: 'https://i.ibb.co/1tZc4NMG/image.png',
                            //   iconImageHref: 'https://optim.tildacdn.com/tild3038-6536-4530-a130-313166313339/-/format/webp/senkino.png.webp',
                              iconImageSize: iconSize,
                              iconImageOffset: iconOffset,
                            }
                        )
                    );
    
                myMap.controls.add('zoomControl', {
                    position: {
                        right: 15,
                        top: 5
                    }
                });
              
                myMap.behaviors.disable('scrollZoom');
            });
        }
          
        if (document.querySelector('.js-map')){
            ymaps.ready(initMaps);
        }
    }

    <script src="https://api-maps.yandex.ru/v3/?apikey=19d18491-ac85-44ca-85b0-13619854457d&lang=ru_RU" defer></script>
