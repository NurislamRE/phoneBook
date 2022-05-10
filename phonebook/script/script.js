import render from './modules/render.js';
import { getStorage } from './modules/serviceStorage.js';
import * as controls from './modules/control.js';
{
    const { renderPhoneBook, renderContacts } = render;
    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);

        const { list, logo, btnAdd, formOverlay, form, btnDel } = renderPhoneBook(app, title);
        const th = document.querySelectorAll('th');
        
        // Функционал
        //localStorage.setItem('contacts', JSON.stringify(data));
        const allRow = renderContacts(list, getStorage('contacts'));
        const {closeModal} =  controls.modalControl(btnAdd, formOverlay);

        controls.hoverRow(allRow, logo);        
        controls.deleteControl(btnDel, list);
        controls.formControl(form, list, closeModal);    
        controls.sort(list, th);           
    };

    window.phoneBookInit = init;    
}