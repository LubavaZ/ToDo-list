'use strict'
//turn on/off dark theme
function switchTheme() {
    let boxButton = document.querySelector('.theme');
    let button = document.querySelector('.theme__switch');
    let body = document.getElementById('dark__theme');

    boxButton.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('dark');
        button.classList.toggle('dark__switch');
        body.classList.toggle('dark__body');
    });
}
switchTheme();

//todo
class Todo {
    constructor() {
        this.todoItems = document.querySelector('.todo__items');
        this.searchInput = document.getElementById('search-text');
        this.infoTable = document.querySelector('.info-table');
        this.form = document.querySelector('form');
    }

    action(e) {
        const target = e.target;
        if(target.classList.contains('todo-action')) {
            const action = target.dataset.todoAction;
            const elemItem = target.closest('.todo__item');
            if(action === 'delete') {
                elemItem.remove();
                location.reload();
            } else if (action === 'edit') {
                if (elemItem.getAttribute('contenteditable') === 'true') {
                    elemItem.setAttribute('contenteditable', 'false');
                } else {
                elemItem.setAttribute('contenteditable', 'true');
                elemItem.classList.toggle('focusForEdit');
                }
                elemItem.addEventListener('blur', () => {
                elemItem.setAttribute('contenteditable', 'false');
                elemItem.classList.remove('focusForEdit');
                this.save();
                })
            } else if (action === 'done') {
                elemItem.classList.add('done');
            }
            this.save();
        } else if(target.classList.contains('form-title')) {
            this.form.classList.toggle('form-hidden');
        } else if (target.classList.contains('add')) {
            this.add();
            this.save();
        }
    }

    init() {
        const fromStorage = localStorage.getItem('todo');
        if(fromStorage) {
            this.todoItems.innerHTML = fromStorage;
        }
        document.addEventListener('click', this.action.bind(this));
    }

    create(name, description, date, priority) {
        let numOfPriority = 0;
        if(priority === 'Very important') {
            numOfPriority = 3;
        } else if(priority === 'Important') {
            numOfPriority = 2;
        } else if(priority === 'Note important') {
            numOfPriority = 1;
        }
        return `<tr class="todo__item">
        <td class="item__edit">${name}</td>
        <td class="item__edit">${description}</td>
        <td class="item__edit">${date}</td>
        <td class="item__edit"><span style='visibility: hidden; font-size: 0'>${numOfPriority}</span>${priority}</td>
        <td class="item__edit">
        <ul>
        <li class="icon">
            <img class="todo-action" data-todo-action='done' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACS0lEQVRoge2YP2/TQBiHn4tDjWJQC0JsLGzs/JNaFSNZJ7UljJ0AqTDxIRj5DmSglSzBB6ClTSKB3Kpd+BSVYAcJKMTkfAxNwLj50ziJbYl7lkivz+fn53Ps1waDwWAwGAyG/xeRt8AgpC8dFfFC6dKzYK1+2GtMKWup01KtVSsqEpsgHlhC73rr3tVe4wq5AtKXTlvxVghxJ1Y+tCK92Hzc/BgfW7gV6J75hDzAp/Bc+Dk5vlArUK1VK0d2uAXcTWzaV5XWUrAafEvuU5gAaeShIAHSykMBAowjDzkHGFcecgwwCXnIKcCk5CGHAJOUh4wDTFoeMgwwDXmAcr8Ncl1eiSzxvCT00+aj5vc0k/+Zy5fOURRuA4vxutZ6t2yx8m41SD1/z15I+vKyKomG1jxUkajPv7x/Pu0B/naV/8oD+5ET3hv35JwI4L6uXlKReA9c65QWzlqt7TQhpnXZxDkRoK0jBeJHojxyiEHyP5W9PAl56PMnXni1csH+pZqgr/c6+MGTN18HTTpMftj+o9D3LuRuuHOWsJvAjXhdIw5aamapn0SW8jDghSZYC74o3ZLAh3hdoOdtK9zpdTllLX/sM4TOSjSAm/F6ciXykIdTPsi8mjfLjNXQglvxejfExbZWecjDCE9id8OdK2PXkyGAvc5v8j6/Z5X08rj3+WGM1Ep4NW9W26U6iNtDhk79zHcZuRfq88kjTmbykLKZO/5iJrYAN7EpU3kYoxvtESJzeRizne6E2ATO5CE/EaQvHelLJ28Pg8FgyIffSE5umrSwoVIAAAAASUVORK5CYII="/>
        </li>
        <li class="icon">
            <img class="todo-action" data-todo-action='edit' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACDklEQVRoge3ZzYtNcRzH8ReNp42Np82UnaImajaU8pCahVlNSmEhYidZWNjIf4CFhYWNSCM2slHETikShViIMvKcmqs8XGNxfpczw733d6975pwznXf9OnXu957f533P7+F0LhUVzRjAC5xDX85ZumYlXmMitEuYk2uiLpgqUUqZZhKlkmknUQqZWIlCy3QqUUiZbiUKJfO/EoWQ6ZVErjK9lshFZgBvM5BotPMzQWICr7KWyGo4pds4NlYSlUQl8bvVZorEpkqikqgkKolKopQSC/EmY4lxbMhSAvaHzu7gQUYSme7YDW6HDrdL3suWUmJF6PAD5uvtHalhc6+CtnvrvTccL+CbZNLDI4ziJVbhUMS10tQwjFsdfKdr+jAm+fUGw7khjGD2lNrjOrsT0zKcGmwNHT+MqN0nh+GUptVw2B2OZyKuszSi5otkON2MqO0Zi/A1tCUR9Y2VLbfNrhkHQoDLEbVrFVQC7oUQwxG1a/ARz3FXslRnPidiWB1CjOn8T8l1uKgAEnAiBIl9HdmPI3hs8o6dq8RcvAthfmJPk7oF2IFrqPsjcB8HsTjzpG0YMXmi1rEr9fkgTuJ9quYTTmP9tCZtwxV/rzrfcQpPU+d+4Cq2YV4uSVuwTPI81WopfYJjWJ5TxigO+3f4zziLLZiVW7oOSD+i13EdOyUTu1TcwDMcVfChU1EGfgHKndziFFFWEAAAAABJRU5ErkJggg=="/>
        </li>
        <li class="icon">
            <img class="todo-action" data-todo-action='delete' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABIElEQVRoge3aPUoEMRiH8Z8fjffQxo8DyFoo3sBTCIJaipWViPWyx/AQit5ALGzFKwiru2shVuJssk7GiO8DqSa87/9JmKSYIQiCJuYK1DzF3pQ5Vzgv0Ls1zjBJHBdtNk7ZkUWcYAsLDfOW0Mvsf4uXhucjXOMSb5m1v3AsfZVLjaNpIecTRNYT5pRmo40iu3j1e7sxxM60kKmn1io2Nb8jJRjhDg8d9w2CT3Ju9h7WSgX5hnsfd02r9HV/YvVTw6XcI3+CEKmNEKmNEKmNEKmNEKmNEKmNEKmNEKmNEKmNEKmNEKmNEKmNHJFJsRQt9MwReZ4hyE95KlF0RbdfroZYLiEChxh3IDHGQU6wWX4Y2Ma+cqv1iAFuCtUPgn/JO8iTtGT3lUPNAAAAAElFTkSuQmCC"/>
        </li>
    </ul>
        </td>
    </tr>`
    }
    save() {
        localStorage.setItem('todo', this.todoItems.innerHTML);
    }

    add() {
        const form = document.querySelector('form');
        const noteName = document.getElementById('NAME');
        const noteDescription = document.getElementById('DESCRIPTION');
        const noteDate = document.getElementById('DATE');
        const notePriority = form.elements.priority;
        let checkedRadio = '';
        let counter = 0;

        for(let i = 0; i < notePriority.length; i++) {
            if(!notePriority[i].checked) {
                counter += 1;
                continue;
            } else {
                checkedRadio = notePriority[i].value;
            }
        }

        if(!noteName.value.length || !noteDescription.value.length || !noteDate.value.length || counter === notePriority.length) {
            return;
        }

        this.todoItems.insertAdjacentHTML('beforeend', this.create(noteName.value, noteDescription.value, noteDate.value, checkedRadio));
        noteName.value = '';
        noteDescription.value = '';
        noteDate.value = '';
        this.form.classList.toggle('form-hidden');
        location.reload();
    }
}
const todo = new Todo;

todo.init();

//language
const LANG_LIST = {
    'unit': {
        'ru': 'Cписок задач',
        'en': 'ToDo List',
    },
    'main-title': {
        'ru': 'Мой список задач',
        'en': 'My To Do List',
    },
    'form-title': {
        'ru': 'Добавить записть',
        'en': 'Add your note',
    },
    'name': {
        'ru': 'Название',
        'en': 'Name',
    },
    'description': {
        'ru': 'Описание',
        'en': 'Description',
    },
    'expiration': {
        'ru': 'Дата окончания',
        'en': 'Expiration date',
    },
    'prioprity-title': {
        'ru': 'Приоритетность',
        'en': 'Priority',
    },
    'very-important': {
        'ru': 'Очень важно',
        'en': 'Very important',
    },
    'important': {
        'ru': 'Важно',
        'en': 'Important',
    },
    'note-important': {
        'ru': 'Не важно',
        'en': 'Note important',
    },
    'add': {
        'ru': 'Добавить',
        'en': 'add',
    },
    'actions': {
        'ru': 'Действия',
        'en': 'Actions',
    },
}
const selectLang = document.getElementById('language');
const allLang = ['en', 'ru'];

selectLang.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
    let lang = selectLang.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage() {
let hash = window.location.hash;
hash = hash.substr(1);
    if(!allLang.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    selectLang.value = hash;
    document.querySelector('title').innerHTML = LANG_LIST['unit'][hash];
    for (let key in LANG_LIST) {
        if (key === 'add') {
            document.querySelector('.add').value = LANG_LIST[key][hash]
        } else if (key === 'name') {
            document.querySelector('.lng-name-th').innerHTML = LANG_LIST[key][hash];
            document.querySelector('.lng-' + key).innerHTML = LANG_LIST[key][hash];
        } else if (key === 'description') {
            document.querySelector('.lng-description-th').innerHTML = LANG_LIST[key][hash];
            document.querySelector('.lng-' + key).innerHTML = LANG_LIST[key][hash];
        } else if (key === 'expiration') {
            document.querySelector('.lng-expiration-th').innerHTML = LANG_LIST[key][hash];
            document.querySelector('.lng-' + key).innerHTML = LANG_LIST[key][hash];
        } else if (key === 'prioprity-title') {
            document.querySelector('.lng-prioprity-th').innerHTML = LANG_LIST[key][hash];
            document.querySelector('.lng-' + key).innerHTML = LANG_LIST[key][hash];
        } else if (key === 'actions') {
            document.querySelector('.lng-actions-th').innerHTML = LANG_LIST[key][hash];
        } else {
            document.querySelector('.lng-' + key).innerHTML = LANG_LIST[key][hash];
        }
    }
}

changeLanguage();