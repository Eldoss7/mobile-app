export type Chat = {
  id: string;
  name: string;
  text: string;
  unread?: number;
};

export type Message = {
  id: number;
  mine: boolean;
  text: string;
  label?: string;
};

export const chats: Chat[] = [
  { id: 'haley', name: 'Хейли Джеймс', text: 'Отстаивай то, во что веришь', unread: 9 },
  {
    id: 'nathan',
    name: 'Нейтан Скотт',
    text: 'В один день тебе семнадцать, и ты строишь планы на потом. А затем тихо и без...',
  },
  { id: 'brooke', name: 'Брук Дэвис', text: 'Я такая, какая есть. Без оправданий.', unread: 2 },
  {
    id: 'jamie',
    name: 'Джейми Скотт',
    text: 'Некоторые люди немного другие. По-моему, это круто.',
  },
  {
    id: 'marvin',
    name: 'Марвин Макфадден',
    text: 'Вчера в НБА «Шарлотт Бобкэтс» тихо сделали ход, который большинство болельщиков...',
  },
  { id: 'antwon', name: 'Антуон Тейлор', text: 'Встретимся на Ривер-корте' },
  {
    id: 'jake',
    name: 'Джейк Ягельски',
    text: 'В жизни ты побываешь в замечательных местах и сделаешь много прекрасного.',
  },
];

export const brookeThread: Message[] = [
  { id: 1, mine: false, label: 'Брук', text: 'Привет, Лукас!' },
  { id: 2, mine: false, text: 'Как продвигается твой проект?' },
  { id: 3, mine: true, label: 'Лукас', text: 'Привет, Брук!' },
  { id: 4, mine: true, text: 'Всё хорошо. Спасибо, что спросила!' },
  { id: 5, mine: false, label: 'Брук', text: 'Не за что. Дай знать, если понадобится помощь 😔' },
];
