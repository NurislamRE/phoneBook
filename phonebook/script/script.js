'use strict';

let data = [
    {
        name: 'Иван',
        surname: 'Петров',
        phone: '+79514545454',
    },
    {
        name: 'Игорь',
        surname: 'Семёнов',
        phone: '+79999999999',
    },
    {
        name: 'Семён',
        surname: 'Иванов',
        phone: '+79800252525',
    },
    {
        name: 'Мария',
        surname: 'Попова',
        phone: '+79876543210',
    },
];

{
    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    };

    const createHeader = () => {
        const header = document.createElement('header');
        header.classList.add('header');

        const headerContainer = createContainer();
        header.append(headerContainer);

        header.headerContainer = headerContainer;

        return header;
    };

    const createFooter = () => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        const footerContainer = createContainer();
        footer.append(footerContainer);

        footer.footerContainer = footerContainer;

        return footer;
    };

    const createLogo = title => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent = `Телефонный справочник. ${title}`;

        return h1;
    };

    const createLogoFooter = title => {
        const h4 = document.createElement('h4');
        h4.classList.add('footer');
        h4.textContent = `Все права защищены ©${title}`;

        return h4;
    };

    const createMain = () => {
        const main = document.createElement('main');
        
        const mainContainer = createContainer();
        main.append(mainContainer);
        main.mainContainer = mainContainer;

        return main;
        
    };

    const createButtonsGroup = params => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');

        const btns = params.map(({className, type, text}) => {
            const button = document.createElement('button');
            button.type = type;
            button.className = className;
            button.textContent = text;

            return button;
        });

        btnWrapper.append(...btns);

        return {
            btnWrapper,
            btns,
        }
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        thead.insertAdjacentHTML('beforeend', `
            <tr>
            <th class="delete">Удалить</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Телефон</th>
            <th>Действие</th>
            </tr>
        `);
        thead.style.cssText = 'cursor: pointer';        

        const tbody = document.createElement('tbody');
        
        table.append(thead, tbody);
        table.tbody = tbody;

        return table;
    };

    const createForm = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');

        const form = document.createElement('form');
        form.classList.add('form');
        form.insertAdjacentHTML('beforeend', `
            <button class="close" type="button"></button>
            <h2 class="form-title">Добавить контакт</h2>
            <div class="form-group">
                <label class="form-label" for="name">Имя:</label>
                <input class="form-input" name="name" id="name" type="text" required/>
            </div>
            <div class="form-group">
                <label class="form-label" for="surname">Фамилия:</label>
                <input class="form-input" name="surname" id="surname" type="text" required/>
            </div>
            <div class="form-group">
                <label class="form-label" for="phone">Телефон:</label>
                <input class="form-input" name="phone" id="phone" type="number" required/>
            </div>
            `
            );

            const buttonGroup = createButtonsGroup([
                {
                    className: 'btn btn-primary mr-3',
                    type: 'submit',
                    text: 'Добавить',
                },
                {
                    className: 'btn btn-danger',
                    type: 'reset',
                    text: 'Отмена',
                }
            ]);

            form.append(...buttonGroup.btns);

            overlay.append(form);

            return {
                overlay,
                form,
            }
    };

    const renderPhoneBook = (app, title) => {
        const header = createHeader();
        const logo = createLogo(title);
        const logoFooter = createLogoFooter(title);
        const main = createMain();
        const buttonGroup = createButtonsGroup([
            {
                className: 'btn btn-primary mr-3 js-add',
                type: 'button',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'button',
                text: 'Удалить',
            }
        ]);

        const table = createTable();
        const form = createForm();
        const footer = createFooter();

        header.headerContainer.append(logo);
        footer.footerContainer.append(logoFooter);
        main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);

        app.append(header, main, footer);

        return {
            list: table.tbody,
            logo,
            btnAdd: buttonGroup.btns[0],
            btnDel: buttonGroup.btns[1],
            formOverlay: form.overlay,
            form: form.form,
        }
    };

    const createRow = ({name: firstName, surname, phone}) => {
        const tr = document.createElement('tr');
        tr.classList.add('contact');

        const tdDel = document.createElement('td');
        tdDel.classList.add('delete');
        const buttonDel = document.createElement('button');
        buttonDel.classList.add('del-icon');
        tdDel.append(buttonDel);

        const tdName = document.createElement('td');
        tdName.textContent = firstName;

        const tdSurname = document.createElement('td');
        tdSurname.textContent = surname;

        const tdPhone = document.createElement('td');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phone}`;
        phoneLink.textContent = phone;
        tr.phoneLink = phoneLink;
        tdPhone.append(phoneLink);

        const tdEvent = document.createElement('td');
        const btnEdit = document.createElement('button');
        btnEdit.classList.add('edit-icon');
        btnEdit.title = 'Редактировать';
        tdEvent.append(btnEdit);

        tr.append(tdDel, tdName, tdSurname, tdPhone, tdEvent);

        return tr;
    };

    const renderContacts = (elem, data) => {
        const allRow = data.map(createRow);
        elem.append(...allRow); 
        return allRow;
    };

    const hoverRow = (allRow, logo) => {
        const text = logo.textContent;
        allRow.forEach(contact => {
            contact.addEventListener('mouseenter', () => {
                logo.textContent = contact.phoneLink.textContent;
            });
            contact.addEventListener('mouseleave', () => {
                logo.textContent = text;
            });
        });
    };

    const sortByColumn = property => {                      
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            console.log(a);
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    };    

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const phoneBook = renderPhoneBook(app, title);

        const {
            list, 
            logo, 
            btnAdd, 
            formOverlay, 
            form,
            btnDel,
        } = phoneBook;
        
        // Функционал
        const allRow = renderContacts(list, data);
        
        hoverRow(allRow, logo);

        btnAdd.addEventListener('click', () => {
            formOverlay.classList.add('is-visible');
        });        

        formOverlay.addEventListener('click', e => {   
            if (e.target === formOverlay || 
                e.target.closest('.close')) {
                formOverlay.classList.remove('is-visible');
            }             
        });

        btnDel.addEventListener('click', () => {
            document.querySelectorAll('.delete').forEach(del => {
                del.classList.toggle('is-visible');
            });
        });
        
        list.addEventListener('click', e => {
            if (e.target.closest('.del-icon')) {
                e.target.closest('.contact').remove();
            }
        });

        const th = document.querySelectorAll('th');

        th.forEach(item => {
            item.addEventListener('click', e => {
                if (e.target.getAttribute('sortable') == null) {
                    e.target.setAttribute('sortable', 'asc');
                    sortAsc(e.target);                    
                }
                else {               
                    if (e.target.getAttribute('sortable') === 'desc') {                   
                        e.target.setAttribute('sortable', 'asc');
                        sortAsc(e.target);                        
                    }
                    else {
                        e.target.setAttribute('sortable', 'desc');
                        sortDesc(e.target);
                    }                                        
                }
                
            });

        });
        
        const sortAsc = element => {
            if (element.textContent === 'Имя') {      
                data = data.sort((a, b) => (a.name > b.name) ? 1 : -1);                    
                document.querySelector('tbody').textContent = '';
                renderContacts(list, data);
            }
            if (element.textContent === 'Фамилия') {
                data = data.sort((a, b) => (a.surname > b.surname) ? 1 : -1);
                document.querySelector('tbody').textContent = '';
                renderContacts(list, data);
            }
            if (element.textContent === 'Телефон') {
                data = data.sort((a, b) => (a.phone > b.phone) ? 1 : -1);
                document.querySelector('tbody').textContent = '';
                renderContacts(list, data);
            }
        };

        const sortDesc = element => {
            if (element.textContent === 'Имя') {       
                data = data.sort((a, b) => (a.name > b.name) ? -1 : 1);                    
                document.querySelector('tbody').textContent = '';
                renderContacts(list, data);
            }
            if (element.textContent === 'Фамилия') {
                data = data.sort((a, b) => (a.surname > b.surname) ? -1 : 1);
                document.querySelector('tbody').textContent = '';
                renderContacts(list, data);
            }
            if (element.textContent === 'Телефон') {
                data = data.sort((a, b) => (a.phone > b.phone) ? -1 : 1);
                document.querySelector('tbody').textContent = '';
                renderContacts(list, data);
            }
        }

    };

    window.phoneBookInit = init;    
}