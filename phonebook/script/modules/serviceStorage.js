
export const getStorage = key => {
    let data;
    try {
        data = JSON.parse(localStorage.getItem(key));
    } catch {
        data = data;
    }       
    return data ?? [];
};

export const setStorage = (key, contacts) => {
    const dataFromStorage = getStorage(key);
    dataFromStorage.push(contacts);
    localStorage.setItem(key, JSON.stringify(dataFromStorage));
};    

export const removeStorage = (key, phone) => {
    const contacts = getStorage(key);
    const filteredContacts = contacts.filter(item => item.phone != phone);
    localStorage.setItem(key, JSON.stringify(filteredContacts));
};

export const addContactData = contact => {
    setStorage('contacts', contact);
};