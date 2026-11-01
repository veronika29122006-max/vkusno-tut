const recipes = [
    {
        id: 1,
        name: 'Паста Карбонара',
        desc: 'Классический итальянский ужин',
        image: 'img/паста.webp',
        type: 'Ужин',
        product: 'Мясо',
        cuisine: 'Итальянская',
        author: 'Мария Иванова',
        time: 25,
        difficulty: 'Легко',
        calories: 320,
        ingredients: [
            { name: 'Спагетти', amount: 200, unit: 'г' },
            { name: 'Гуанчале', amount: 100, unit: 'г' },
            { name: 'Яйца', amount: 3, unit: 'шт' },
            { name: 'Сыр пекорино', amount: 50, unit: 'г' },
            { name: 'Перец чёрный', amount: 1, unit: 'по вкусу' }
        ],
        steps: [
            { title: 'Отварите спагетти до аль денте', desc: 'Вскипятите воду, добавьте соль и варите спагетти 8 минут.', timer: 8 },
            { title: 'Обжарьте гуанчале', desc: 'Разогрейте сковороду и обжарьте гуанчале до хрустящей корочки.', timer: 5 },
            { title: 'Смешайте яйца с сыром', desc: 'Взбейте яйца с тёртым сыром и перцем.', timer: 0 },
            { title: 'Соедините всё и подавайте', desc: 'Смешайте пасту с гуанчале и яичной смесью.', timer: 0 }
        ]
    },
    {
        id: 2,
        name: 'Болоньезе',
        desc: 'Сытная паста с мясным соусом',
        image: 'img/болоньезе.webp',
        type: 'Ужин',
        product: 'Мясо',
        cuisine: 'Итальянская',
        author: 'Анна Петрова',
        time: 45,
        difficulty: 'Средне',
        calories: 450,
        ingredients: [
            { name: 'Спагетти', amount: 250, unit: 'г' },
            { name: 'Фарш говяжий', amount: 300, unit: 'г' },
            { name: 'Томаты', amount: 400, unit: 'г' },
            { name: 'Лук', amount: 1, unit: 'шт' },
            { name: 'Чеснок', amount: 2, unit: 'зуб' }
        ],
        steps: [
            { title: 'Обжарьте лук и чеснок', desc: 'Нарежьте и обжарьте до золотистого цвета.', timer: 5 },
            { title: 'Добавьте фарш', desc: 'Обжарьте фарш до румяной корочки.', timer: 10 },
            { title: 'Добавьте томаты', desc: 'Влейте томаты и тушите на медленном огне.', timer: 20 },
            { title: 'Отварите пасту', desc: 'Отварите спагетти до аль денте.', timer: 8 }
        ]
    },
    {
        id: 3,
        name: 'Стейк Рибай',
        desc: 'Сочный, с румяной корочкой',
        image: 'img/стейк.webp',
        type: 'Ужин',
        product: 'Мясо',
        cuisine: 'Французская',
        author: 'Сергей Мясников',
        time: 20,
        difficulty: 'Средне',
        calories: 600,
        ingredients: [
            { name: 'Стейк Рибай', amount: 400, unit: 'г' },
            { name: 'Сливочное масло', amount: 30, unit: 'г' },
            { name: 'Чеснок', amount: 2, unit: 'зуб' },
            { name: 'Розмарин', amount: 1, unit: 'веточка' },
            { name: 'Соль, перец', amount: 1, unit: 'по вкусу' }
        ],
        steps: [
            { title: 'Достаньте стейк', desc: 'Стейк должен полежать при комнатной температуре 20 минут.', timer: 20 },
            { title: 'Обжарьте на сковороде', desc: 'Разогрейте сковороду и обжарьте по 3 минуты с каждой стороны.', timer: 6 },
            { title: 'Добавьте масло и чеснок', desc: 'Положите масло, чеснок и розмарин.', timer: 2 },
            { title: 'Дайте отдохнуть', desc: 'Дайте стейку отдохнуть под фольгой 5 минут.', timer: 5 }
        ]
    },
    {
        id: 4,
        name: 'Тако с говядиной',
        desc: 'Мексиканская классика',
        image: 'img/тако.png',
        type: 'Ужин',
        product: 'Мясо',
        cuisine: 'Азиатская',
        author: 'Дмитрий Соколов',
        time: 35,
        difficulty: 'Средне',
        calories: 420,
        ingredients: [
            { name: 'Фарш говяжий', amount: 400, unit: 'г' },
            { name: 'Лепешки тортилья', amount: 6, unit: 'шт' },
            { name: 'Помидоры', amount: 2, unit: 'шт' },
            { name: 'Сыр чеддер', amount: 100, unit: 'г' },
            { name: 'Специи для тако', amount: 2, unit: 'ст.л.' }
        ],
        steps: [
            { title: 'Обжарьте фарш', desc: 'Обжарьте фарш на сковороде до готовности.', timer: 10 },
            { title: 'Добавьте специи', desc: 'Добавьте специи и немного воды, тушите.', timer: 5 },
            { title: 'Разогрейте лепёшки', desc: 'Разогрейте тортильи на сухой сковороде.', timer: 3 },
            { title: 'Соберите тако', desc: 'Выложите фарш на лепёшки, добавьте помидоры и сыр.', timer: 0 }
        ]
    },
    {
        id: 5,
        name: 'Борщ',
        desc: 'Наваристый, со сметаной',
        image: 'img/борщ.webp',
        type: 'Обед',
        product: 'Мясо',
        cuisine: 'Русская',
        author: 'Ольга Кузнецова',
        time: 60,
        difficulty: 'Средне',
        calories: 350,
        ingredients: [
            { name: 'Свекла', amount: 2, unit: 'шт' },
            { name: 'Капуста', amount: 300, unit: 'г' },
            { name: 'Картофель', amount: 3, unit: 'шт' },
            { name: 'Говядина', amount: 500, unit: 'г' },
            { name: 'Лук, морковь', amount: 1, unit: 'шт' }
        ],
        steps: [
            { title: 'Сварите бульон', desc: 'Залейте мясо водой, варите 40 минут.', timer: 40 },
            { title: 'Обжарьте овощи', desc: 'Обжарьте лук, морковь и свёклу.', timer: 10 },
            { title: 'Добавьте картофель и капусту', desc: 'Добавьте в бульон и варите.', timer: 10 },
            { title: 'Добавьте зажарку', desc: 'Добавьте обжаренные овощи, варите ещё 10 минут.', timer: 10 }
        ]
    },
    {
        id: 6,
        name: 'Лазанья',
        desc: 'Сытная, с мясным соусом',
        image: 'img/лазанья.webp',
        type: 'Ужин',
        product: 'Мясо',
        cuisine: 'Итальянская',
        author: 'Елена Итальянская',
        time: 55,
        difficulty: 'Средне',
        calories: 520,
        ingredients: [
            { name: 'Листы лазаньи', amount: 12, unit: 'шт' },
            { name: 'Фарш говяжий', amount: 500, unit: 'г' },
            { name: 'Томатный соус', amount: 400, unit: 'г' },
            { name: 'Сыр моцарелла', amount: 200, unit: 'г' },
            { name: 'Соус бешамель', amount: 300, unit: 'мл' }
        ],
        steps: [
            { title: 'Обжарьте фарш', desc: 'Обжарьте фарш с луком до готовности.', timer: 10 },
            { title: 'Добавьте томатный соус', desc: 'Влейте томатный соус и тушите.', timer: 15 },
            { title: 'Соберите лазанью', desc: 'Выкладывайте слоями: соус, листы, бешамель, сыр.', timer: 5 },
            { title: 'Запеките', desc: 'Запекайте при 180°C до золотистой корочки.', timer: 30 }
        ]
    },
    {
        id: 7,
        name: 'Плов с курицей',
        desc: 'Ароматный узбекский плов',
        image: 'img/плов.webp',
        type: 'Обед',
        product: 'Птица',
        cuisine: 'Азиатская',
        author: 'Ирина Азиатская',
        time: 50,
        difficulty: 'Средне',
        calories: 480,
        ingredients: [
            { name: 'Рис', amount: 300, unit: 'г' },
            { name: 'Курица', amount: 500, unit: 'г' },
            { name: 'Морковь', amount: 2, unit: 'шт' },
            { name: 'Лук', amount: 2, unit: 'шт' },
            { name: 'Специи для плова', amount: 1, unit: 'ст.л.' }
        ],
        steps: [
            { title: 'Обжарьте курицу', desc: 'Нарежьте и обжарьте до золотистой корочки.', timer: 10 },
            { title: 'Добавьте лук и морковь', desc: 'Нарежьте и обжарьте вместе с курицей.', timer: 7 },
            { title: 'Добавьте рис и воду', desc: 'Всыпьте рис, залейте водой на 2 см выше.', timer: 5 },
            { title: 'Тушите под крышкой', desc: 'Тушите на медленном огне до готовности риса.', timer: 25 }
        ]
    },
    {
        id: 8,
        name: 'Куриные котлеты',
        desc: 'Сочные, с хрустящей корочкой',
        image: 'img/котлеты.png',
        type: 'Ужин',
        product: 'Птица',
        cuisine: 'Русская',
        author: 'Пётр Домашний',
        time: 30,
        difficulty: 'Легко',
        calories: 380,
        ingredients: [
            { name: 'Куриный фарш', amount: 500, unit: 'г' },
            { name: 'Лук', amount: 1, unit: 'шт' },
            { name: 'Яйцо', amount: 1, unit: 'шт' },
            { name: 'Хлеб белый', amount: 100, unit: 'г' },
            { name: 'Сухари панировочные', amount: 100, unit: 'г' }
        ],
        steps: [
            { title: 'Замочите хлеб', desc: 'Замочите хлеб в молоке.', timer: 5 },
            { title: 'Смешайте фарш', desc: 'Смешайте фарш, лук, яйцо и отжатый хлеб.', timer: 0 },
            { title: 'Сформируйте котлеты', desc: 'Слепите котлеты и обваляйте в сухарях.', timer: 0 },
            { title: 'Обжарьте котлеты', desc: 'Обжарьте по 4 минуты с каждой стороны.', timer: 8 }
        ]
    },
    {
        id: 9,
        name: 'Куриный суп с лапшой',
        desc: 'Домашний, наваристый',
        image: 'img/суп с лапшой.webp',
        type: 'Обед',
        product: 'Птица',
        cuisine: 'Русская',
        author: 'Татьяна Супова',
        time: 40,
        difficulty: 'Легко',
        calories: 250,
        ingredients: [
            { name: 'Курица', amount: 500, unit: 'г' },
            { name: 'Лапша', amount: 100, unit: 'г' },
            { name: 'Морковь', amount: 1, unit: 'шт' },
            { name: 'Лук', amount: 1, unit: 'шт' },
            { name: 'Картофель', amount: 2, unit: 'шт' }
        ],
        steps: [
            { title: 'Сварите бульон', desc: 'Залейте курицу водой, варите, снимая пену.', timer: 25 },
            { title: 'Добавьте овощи', desc: 'Добавьте нарезанные морковь, лук и картофель.', timer: 10 },
            { title: 'Добавьте лапшу', desc: 'Добавьте лапшу и варите 5 минут.', timer: 5 }
        ]
    },
    {
        id: 10,
        name: 'Лосось на гриле',
        desc: 'С лимоном и травами',
        image: 'img/лосось.webp',
        type: 'Ужин',
        product: 'Рыба',
        cuisine: 'Французская',
        author: 'Алексей Фишер',
        time: 25,
        difficulty: 'Легко',
        calories: 380,
        ingredients: [
            { name: 'Филе лосося', amount: 400, unit: 'г' },
            { name: 'Лимон', amount: 1, unit: 'шт' },
            { name: 'Оливковое масло', amount: 2, unit: 'ст.л.' },
            { name: 'Тимьян', amount: 1, unit: 'пучок' },
            { name: 'Соль, перец', amount: 1, unit: 'по вкусу' }
        ],
        steps: [
            { title: 'Замаринуйте лосося', desc: 'Полейте маслом, посыпьте травами.', timer: 10 },
            { title: 'Разогрейте гриль', desc: 'Разогрейте гриль или сковороду-гриль.', timer: 5 },
            { title: 'Обжарьте лосося', desc: 'Обжарьте по 4 минуты с каждой стороны.', timer: 8 },
            { title: 'Подавайте с лимоном', desc: 'Полейте лимонным соком перед подачей.', timer: 0 }
        ]
    },
    {
        id: 11,
        name: 'Запечённая треска',
        desc: 'Лёгкая и полезная',
        image: 'img/треска.png',
        type: 'Ужин',
        product: 'Рыба',
        cuisine: 'Русская',
        author: 'Николай Морской',
        time: 35,
        difficulty: 'Легко',
        calories: 220,
        ingredients: [
            { name: 'Филе трески', amount: 500, unit: 'г' },
            { name: 'Лимон', amount: 1, unit: 'шт' },
            { name: 'Лук', amount: 1, unit: 'шт' },
            { name: 'Сметана', amount: 100, unit: 'г' },
            { name: 'Сыр', amount: 100, unit: 'г' }
        ],
        steps: [
            { title: 'Подготовьте рыбу', desc: 'Выложите филе в форму, посолите.', timer: 0 },
            { title: 'Добавьте лук', desc: 'Нарежьте лук кольцами и выложите на рыбу.', timer: 5 },
            { title: 'Смажьте сметаной', desc: 'Смажьте рыбу сметаной и посыпьте сыром.', timer: 0 },
            { title: 'Запеките', desc: 'Запекайте при 180°C до золотистой корочки.', timer: 25 }
        ]
    },
    {
        id: 12,
        name: 'Уха из сёмги',
        desc: 'Наваристая, прозрачная',
        image: 'img/уха.jpg',
        type: 'Обед',
        product: 'Рыба',
        cuisine: 'Русская',
        author: 'Ольга Рыбакова',
        time: 45,
        difficulty: 'Средне',
        calories: 280,
        ingredients: [
            { name: 'Сёмга', amount: 400, unit: 'г' },
            { name: 'Картофель', amount: 3, unit: 'шт' },
            { name: 'Морковь', amount: 1, unit: 'шт' },
            { name: 'Лук', amount: 1, unit: 'шт' },
            { name: 'Лавровый лист', amount: 2, unit: 'шт' }
        ],
        steps: [
            { title: 'Сварите бульон', desc: 'Залейте рыбу водой и варите 15 минут.', timer: 15 },
            { title: 'Добавьте картофель', desc: 'Добавьте нарезанный картофель, варите.', timer: 10 },
            { title: 'Добавьте овощи', desc: 'Добавьте морковь, лук и лавровый лист.', timer: 10 },
            { title: 'Дайте настояться', desc: 'Снимите с огня и дайте настояться.', timer: 5 }
        ]
    },
    {
        id: 13,
        name: 'Греческий салат',
        desc: 'Свежий и лёгкий',
        image: 'img/салат.webp',
        type: 'Обед',
        product: 'Овощи',
        cuisine: 'Итальянская',
        author: 'Мария Веганова',
        time: 10,
        difficulty: 'Легко',
        calories: 150,
        ingredients: [
            { name: 'Огурец', amount: 1, unit: 'шт' },
            { name: 'Помидоры', amount: 3, unit: 'шт' },
            { name: 'Сыр фета', amount: 100, unit: 'г' },
            { name: 'Оливки', amount: 50, unit: 'г' },
            { name: 'Оливковое масло', amount: 2, unit: 'ст.л.' }
        ],
        steps: [
            { title: 'Нарежьте овощи', desc: 'Нарежьте огурцы и помидоры кубиками.', timer: 0 },
            { title: 'Добавьте фету и оливки', desc: 'Добавьте кубики феты и оливки.', timer: 0 },
            { title: 'Заправьте маслом', desc: 'Полейте маслом, посолите, поперчите.', timer: 0 }
        ]
    },
    {
        id: 14,
        name: 'Томатный суп',
        desc: 'Согревающий зимой',
        image: 'img/суп.webp',
        type: 'Обед',
        product: 'Овощи',
        cuisine: 'Итальянская',
        author: 'Елена Овощная',
        time: 35,
        difficulty: 'Легко',
        calories: 180,
        ingredients: [
            { name: 'Томаты', amount: 800, unit: 'г' },
            { name: 'Лук', amount: 1, unit: 'шт' },
            { name: 'Чеснок', amount: 2, unit: 'зуб' },
            { name: 'Базилик', amount: 1, unit: 'пучок' },
            { name: 'Сливки', amount: 100, unit: 'мл' }
        ],
        steps: [
            { title: 'Обжарьте лук и чеснок', desc: 'Обжарьте на масле до мягкости.', timer: 5 },
            { title: 'Добавьте томаты', desc: 'Добавьте нарезанные томаты и тушите.', timer: 15 },
            { title: 'Пробейте блендером', desc: 'Пробейте суп до однородности.', timer: 3 },
            { title: 'Добавьте сливки', desc: 'Влейте сливки и прогрейте.', timer: 5 }
        ]
    },
    {
        id: 15,
        name: 'Овощи на гриле',
        desc: 'С ароматом дымка',
        image: 'img/овощи.webp',
        type: 'Ужин',
        product: 'Овощи',
        cuisine: 'Итальянская',
        author: 'Андрей Гриль',
        time: 20,
        difficulty: 'Легко',
        calories: 120,
        ingredients: [
            { name: 'Баклажан', amount: 1, unit: 'шт' },
            { name: 'Кабачок', amount: 1, unit: 'шт' },
            { name: 'Перец болгарский', amount: 2, unit: 'шт' },
            { name: 'Оливковое масло', amount: 3, unit: 'ст.л.' },
            { name: 'Специи', amount: 1, unit: 'по вкусу' }
        ],
        steps: [
            { title: 'Нарежьте овощи', desc: 'Нарежьте овощи крупными ломтиками.', timer: 0 },
            { title: 'Смажьте маслом', desc: 'Смажьте овощи маслом, посолите.', timer: 0 },
            { title: 'Обжарьте на гриле', desc: 'Обжарьте по 3-4 минуты с каждой стороны.', timer: 8 }
        ]
    },
    {
        id: 16,
        name: 'Фруктовый салат',
        desc: 'Яркий, витаминный',
        image: 'img/фруктовый.jpg',
        type: 'Завтрак',
        product: 'Фрукты',
        cuisine: 'Французская',
        author: 'Светлана Ягодкина',
        time: 10,
        difficulty: 'Легко',
        calories: 130,
        ingredients: [
            { name: 'Яблоко', amount: 2, unit: 'шт' },
            { name: 'Банан', amount: 2, unit: 'шт' },
            { name: 'Апельсин', amount: 1, unit: 'шт' },
            { name: 'Виноград', amount: 100, unit: 'г' },
            { name: 'Йогурт', amount: 100, unit: 'г' }
        ],
        steps: [
            { title: 'Нарежьте фрукты', desc: 'Нарежьте все фрукты крупными кубиками.', timer: 0 },
            { title: 'Смешайте', desc: 'Смешайте фрукты в большой миске.', timer: 0 },
            { title: 'Заправьте йогуртом', desc: 'Полейте йогуртом перед подачей.', timer: 0 }
        ]
    },
    {
        id: 17,
        name: 'Яблочный пирог',
        desc: 'Домашний, ароматный',
        image: 'img/пирог.webp',
        type: 'Десерт',
        product: 'Фрукты',
        cuisine: 'Русская',
        author: 'Виктор Пекарь',
        time: 60,
        difficulty: 'Средне',
        calories: 350,
        ingredients: [
            { name: 'Яблоки', amount: 5, unit: 'шт' },
            { name: 'Мука', amount: 300, unit: 'г' },
            { name: 'Сахар', amount: 200, unit: 'г' },
            { name: 'Яйца', amount: 3, unit: 'шт' },
            { name: 'Сливочное масло', amount: 150, unit: 'г' }
        ],
        steps: [
            { title: 'Замесите тесто', desc: 'Смешайте муку, сахар, яйца и масло.', timer: 10 },
            { title: 'Нарежьте яблоки', desc: 'Нарежьте яблоки тонкими ломтиками.', timer: 5 },
            { title: 'Соберите пирог', desc: 'Выложите тесто, сверху яблоки, посыпьте сахаром.', timer: 5 },
            { title: 'Запеките', desc: 'Запекайте при 180°C до золотистой корочки.', timer: 40 }
        ]
    },
    {
        id: 18,
        name: 'Банановый смузи',
        desc: 'Питательный завтрак',
        image: 'img/смузи.webp',
        type: 'Завтрак',
        product: 'Фрукты',
        cuisine: 'Азиатская',
        author: 'Олеся Смузи',
        time: 5,
        difficulty: 'Легко',
        calories: 180,
        ingredients: [
            { name: 'Банан', amount: 2, unit: 'шт' },
            { name: 'Молоко', amount: 200, unit: 'мл' },
            { name: 'Мёд', amount: 1, unit: 'ст.л.' },
            { name: 'Корица', amount: 1, unit: 'щепотка' }
        ],
        steps: [
            { title: 'Нарежьте бананы', desc: 'Нарежьте бананы крупными кусочками.', timer: 0 },
            { title: 'Добавьте в блендер', desc: 'Положите бананы, влейте молоко, добавьте мёд.', timer: 0 },
            { title: 'Взбейте', desc: 'Взбейте всё до однородности.', timer: 1 }
        ]
    },
    {
        id: 19,
        name: 'Грибной крем-суп',
        desc: 'Бархатистый, ароматный',
        image: 'img/крем суп.webp',
        type: 'Обед',
        product: 'Грибы',
        cuisine: 'Французская',
        author: 'Ольга Лесная',
        time: 40,
        difficulty: 'Средне',
        calories: 220,
        ingredients: [
            { name: 'Шампиньоны', amount: 500, unit: 'г' },
            { name: 'Лук', amount: 1, unit: 'шт' },
            { name: 'Сливки', amount: 200, unit: 'мл' },
            { name: 'Мука', amount: 2, unit: 'ст.л.' },
            { name: 'Сливочное масло', amount: 50, unit: 'г' }
        ],
        steps: [
            { title: 'Обжарьте грибы с луком', desc: 'Нарежьте и обжарьте на масле.', timer: 10 },
            { title: 'Добавьте муку', desc: 'Посыпьте мукой, перемешайте.', timer: 2 },
            { title: 'Влейте бульон', desc: 'Влейте 500 мл бульона, варите.', timer: 15 },
            { title: 'Пробейте блендером', desc: 'Пробейте суп, влейте сливки.', timer: 5 }
        ]
    },
    {
        id: 20,
        name: 'Жюльен с грибами',
        desc: 'Классика французской кухни',
        image: 'img/жульен.webp',
        type: 'Ужин',
        product: 'Грибы',
        cuisine: 'Французская',
        author: 'Пётр Грибников',
        time: 35,
        difficulty: 'Средне',
        calories: 320,
        ingredients: [
            { name: 'Шампиньоны', amount: 400, unit: 'г' },
            { name: 'Лук', amount: 1, unit: 'шт' },
            { name: 'Сметана', amount: 200, unit: 'г' },
            { name: 'Сыр', amount: 150, unit: 'г' },
            { name: 'Сливочное масло', amount: 30, unit: 'г' }
        ],
        steps: [
            { title: 'Обжарьте грибы с луком', desc: 'Обжарьте на масле до золотистого цвета.', timer: 10 },
            { title: 'Добавьте сметану', desc: 'Добавьте сметану, посолите.', timer: 5 },
            { title: 'Разложите по кокотницам', desc: 'Разложите массу, посыпьте сыром.', timer: 0 },
            { title: 'Запеките', desc: 'Запекайте при 200°C до румяной корочки.', timer: 15 }
        ]
    },
    {
        id: 21,
        name: 'Гречка с грибами',
        desc: 'По-домашнему сытная',
        image: 'img/гречка.webp',
        type: 'Ужин',
        product: 'Грибы',
        cuisine: 'Русская',
        author: 'Иван Кашевар',
        time: 30,
        difficulty: 'Легко',
        calories: 280,
        ingredients: [
            { name: 'Гречка', amount: 200, unit: 'г' },
            { name: 'Шампиньоны', amount: 300, unit: 'г' },
            { name: 'Лук', amount: 1, unit: 'шт' },
            { name: 'Сливочное масло', amount: 30, unit: 'г' }
        ],
        steps: [
            { title: 'Отварите гречку', desc: 'Промойте, залейте водой 1:2 и варите.', timer: 20 },
            { title: 'Обжарьте грибы с луком', desc: 'Обжарьте нарезанные грибы с луком.', timer: 10 },
            { title: 'Смешайте', desc: 'Смешайте гречку с грибами, посолите.', timer: 0 }
        ]
    },
    {
        id: 22,
        name: 'Сырники со сметаной',
        desc: 'Нежные, как в детстве',
        image: 'img/сырники.webp',
        type: 'Завтрак',
        product: 'Молочное',
        cuisine: 'Русская',
        author: 'Татьяна Молочная',
        time: 25,
        difficulty: 'Легко',
        calories: 300,
        ingredients: [
            { name: 'Творог', amount: 500, unit: 'г' },
            { name: 'Яйцо', amount: 1, unit: 'шт' },
            { name: 'Мука', amount: 100, unit: 'г' },
            { name: 'Сахар', amount: 50, unit: 'г' },
            { name: 'Сметана', amount: 100, unit: 'г' }
        ],
        steps: [
            { title: 'Смешайте творог', desc: 'Смешайте творог, яйцо, сахар и муку.', timer: 0 },
            { title: 'Сформируйте сырники', desc: 'Слепите сырники и обваляйте в муке.', timer: 0 },
            { title: 'Обжарьте', desc: 'Обжарьте по 3 минуты с каждой стороны.', timer: 6 },
            { title: 'Подавайте со сметаной', desc: 'Подавайте горячими со сметаной.', timer: 0 }
        ]
    },
    {
        id: 23,
        name: 'Творожная запеканка',
        desc: 'Нежная, с изюмом',
        image: 'img/запеканка.webp',
        type: 'Завтрак',
        product: 'Молочное',
        cuisine: 'Русская',
        author: 'Иван Творогов',
        time: 45,
        difficulty: 'Легко',
        calories: 280,
        ingredients: [
            { name: 'Творог', amount: 500, unit: 'г' },
            { name: 'Яйца', amount: 2, unit: 'шт' },
            { name: 'Сахар', amount: 80, unit: 'г' },
            { name: 'Манка', amount: 50, unit: 'г' },
            { name: 'Изюм', amount: 50, unit: 'г' }
        ],
        steps: [
            { title: 'Смешайте ингредиенты', desc: 'Смешайте творог, яйца, сахар, манку и изюм.', timer: 0 },
            { title: 'Переложите в форму', desc: 'Переложите массу в смазанную форму.', timer: 0 },
            { title: 'Запеките', desc: 'Запекайте при 180°C до золотистой корочки.', timer: 35 }
        ]
    },
    {
        id: 24,
        name: 'Сырная тарелка',
        desc: 'Ассорти из разных сыров',
        image: 'img/тарелка.webp',
        type: 'Ужин',
        product: 'Молочное',
        cuisine: 'Французская',
        author: 'Анна Сырная',
        time: 10,
        difficulty: 'Легко',
        calories: 400,
        ingredients: [
            { name: 'Сыр бри', amount: 100, unit: 'г' },
            { name: 'Сыр чеддер', amount: 100, unit: 'г' },
            { name: 'Сыр дорблю', amount: 80, unit: 'г' },
            { name: 'Виноград', amount: 100, unit: 'г' },
            { name: 'Орехи', amount: 50, unit: 'г' }
        ],
        steps: [
            { title: 'Нарежьте сыры', desc: 'Нарежьте сыры разными кусочками.', timer: 0 },
            { title: 'Добавьте виноград и орехи', desc: 'Разложите виноград и орехи.', timer: 0 },
            { title: 'Подавайте', desc: 'Подавайте с крекерами и мёдом.', timer: 0 }
        ]
    },
    {
        id: 25,
        name: 'Молочный суп с вермишелью',
        desc: 'Домашний, тёплый',
        image: 'img/молочный суп.webp',
        type: 'Завтрак',
        product: 'Молочное',
        cuisine: 'Русская',
        author: 'Елена Молочная',
        time: 20,
        difficulty: 'Легко',
        calories: 250,
        ingredients: [
            { name: 'Молоко', amount: 1, unit: 'л' },
            { name: 'Вермишель', amount: 100, unit: 'г' },
            { name: 'Сахар', amount: 30, unit: 'г' },
            { name: 'Сливочное масло', amount: 20, unit: 'г' }
        ],
        steps: [
            { title: 'Вскипятите молоко', desc: 'Доведите молоко до кипения, добавьте сахар.', timer: 5 },
            { title: 'Добавьте вермишель', desc: 'Всыпьте вермишель и варите.', timer: 7 },
            { title: 'Добавьте масло', desc: 'Снимите с огня, добавьте масло.', timer: 0 }
        ]
    },
    {
        id: 26,
        name: 'Ризотто с грибами',
        desc: 'Кремовое, ароматное',
        image: 'img/ризотто.webp',
        type: 'Ужин',
        product: 'Крупы',
        cuisine: 'Итальянская',
        author: 'Михаил Ризотто',
        time: 40,
        difficulty: 'Средне',
        calories: 380,
        ingredients: [
            { name: 'Рис арборио', amount: 300, unit: 'г' },
            { name: 'Шампиньоны', amount: 300, unit: 'г' },
            { name: 'Лук', amount: 1, unit: 'шт' },
            { name: 'Бульон', amount: 1, unit: 'л' },
            { name: 'Пармезан', amount: 100, unit: 'г' }
        ],
        steps: [
            { title: 'Обжарьте лук', desc: 'Обжарьте лук на масле до прозрачности.', timer: 5 },
            { title: 'Добавьте грибы', desc: 'Добавьте грибы и обжаривайте.', timer: 8 },
            { title: 'Добавьте рис', desc: 'Всыпьте рис, обжаривайте 2 минуты.', timer: 2 },
            { title: 'Постепенно добавляйте бульон', desc: 'Добавляйте бульон по половнику.', timer: 20 }
        ]
    },
    {
        id: 27,
        name: 'Рис с овощами',
        desc: 'Лёгкий гарнир',
        image: 'img/рис.jfif',
        type: 'Обед',
        product: 'Крупы',
        cuisine: 'Азиатская',
        author: 'Азиз Рисов',
        time: 25,
        difficulty: 'Легко',
        calories: 240,
        ingredients: [
            { name: 'Рис', amount: 200, unit: 'г' },
            { name: 'Морковь', amount: 1, unit: 'шт' },
            { name: 'Перец болгарский', amount: 1, unit: 'шт' },
            { name: 'Лук', amount: 1, unit: 'шт' },
            { name: 'Соевый соус', amount: 2, unit: 'ст.л.' }
        ],
        steps: [
            { title: 'Отварите рис', desc: 'Отварите рис в подсоленной воде.', timer: 15 },
            { title: 'Обжарьте овощи', desc: 'Обжарьте нарезанные овощи на масле.', timer: 7 },
            { title: 'Смешайте', desc: 'Смешайте рис с овощами, добавьте соевый соус.', timer: 0 }
        ]
    },
    {
        id: 28,
        name: 'Пицца Маргарита',
        desc: 'Классика неаполитанской кухни',
        image: 'img/пицца.webp',
        type: 'Ужин',
        product: 'Тесто',
        cuisine: 'Итальянская',
        author: 'Олеся Пирогова',
        time: 30,
        difficulty: 'Легко',
        calories: 550,
        ingredients: [
            { name: 'Тесто для пиццы', amount: 1, unit: 'шт' },
            { name: 'Томатный соус', amount: 100, unit: 'г' },
            { name: 'Моцарелла', amount: 150, unit: 'г' },
            { name: 'Базилик', amount: 1, unit: 'пучок' },
            { name: 'Оливковое масло', amount: 2, unit: 'ст.л.' }
        ],
        steps: [
            { title: 'Разогрейте духовку', desc: 'Разогрейте духовку до 250°C.', timer: 10 },
            { title: 'Раскатайте тесто', desc: 'Раскатайте тесто в тонкий круг.', timer: 3 },
            { title: 'Смажьте соусом', desc: 'Смажьте тесто томатным соусом, выложите моцареллу.', timer: 2 },
            { title: 'Запеките', desc: 'Запекайте 10 минут до румяной корочки.', timer: 10 }
        ]
    }
];
if (localStorage.getItem('vkusno_custom_base_recipes')) {
    const custom = JSON.parse(localStorage.getItem('vkusno_custom_base_recipes'));
    custom.forEach(editedRecipe => {
        const index = recipes.findIndex(r => r.id === editedRecipe.id);
        if (index !== -1) {
            recipes[index] = editedRecipe;
        }
    });
}