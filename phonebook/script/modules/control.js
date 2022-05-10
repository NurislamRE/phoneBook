import { removeStorage, addContactData, getStorage, setStorage } from './serviceStorage.js';
import elements from './createElements.js';
import render from './render.js';
const { createRow } = elements;
const { renderPhoneBook, renderContacts } = render;

export const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
        formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
        formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);        

    formOverlay.addEventListener('click', e => {   
        if (e.target === formOverlay || 
            e.target.closest('.close')) {
            closeModal();
        }             
    });

    return {
        closeModal,
    }
};

export const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
        document.querySelectorAll('.delete').forEach(del => {
            del.classList.toggle('is-visible');
        });
    });
    
    list.addEventListener('click', e => {
        if (e.target.closest('.del-icon')) {
            const phoneNumber = e.target.closest('.contact').children[3].textContent;
            removeStorage('contacts', phoneNumber);
            e.target.closest('.contact').remove();
            
        }
    });
};

export const addContactPage = (contact, list) => {
    list.append(createRow(contact));
};

export const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newContact = Object.fromEntries(formData);

        addContactPage(newContact, list);
        addContactData(newContact);
        form.reset();
        closeModal();
    })
};

export const hoverRow = (allRow, logo) => {
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

const sortAsc = (list, data, element) => {
    let sorteredData;
    if (element.textContent === 'Имя') {      
        sorteredData = data.sort((a, b) => (a.name > b.name) ? 1 : -1);                    
        document.querySelector('tbody').textContent = '';
        renderContacts(list, sorteredData);            
    }
    if (element.textContent === 'Фамилия') {
        sorteredData = data.sort((a, b) => (a.surname > b.surname) ? 1 : -1);
        document.querySelector('tbody').textContent = '';
        renderContacts(list, sorteredData);
        
    }
    if (element.textContent === 'Телефон') {
        sorteredData = data.sort((a, b) => (a.phone > b.phone) ? 1 : -1);
        document.querySelector('tbody').textContent = '';
        renderContacts(list, sorteredData);
    }

    localStorage.removeItem('contacts');
    localStorage.setItem('contacts', JSON.stringify(sorteredData));
};

const sortDesc = (list, data, element) => {
    let sorteredData;
    if (element.textContent === 'Имя') {       
        sorteredData = data.sort((a, b) => (a.name > b.name) ? -1 : 1);                    
        document.querySelector('tbody').textContent = '';
        renderContacts(list, sorteredData);
    }
    if (element.textContent === 'Фамилия') {
        sorteredData = data.sort((a, b) => (a.surname > b.surname) ? -1 : 1);
        document.querySelector('tbody').textContent = '';
        renderContacts(list, sorteredData);
    }
    if (element.textContent === 'Телефон') {
        sorteredData = data.sort((a, b) => (a.phone > b.phone) ? -1 : 1);
        document.querySelector('tbody').textContent = '';
        renderContacts(list, sorteredData);
    }

    localStorage.removeItem('contacts');
    localStorage.setItem('contacts', JSON.stringify(sorteredData));
};

export const sort = (list, th) => {        
    const data = getStorage('contacts');
    th.forEach(item => {
        item.addEventListener('click', e => {
            localStorage.removeItem('sortColumnInfo');
            setStorage('sortColumnInfo', e.target.textContent);
            if (e.target.getAttribute('sortable') == null) {
                e.target.setAttribute('sortable', 'asc');
                sortAsc(list, data, e.target);                    
            } else {               
                if (e.target.getAttribute('sortable') === 'desc') {                   
                    e.target.setAttribute('sortable', 'asc');
                    sortAsc(list, data, e.target);                        
                }
                else {
                    e.target.setAttribute('sortable', 'desc');
                    sortDesc(list, data, e.target);
                }                                        
            }
            
        });

    });
};