export const get = async (url) => {
    const response = await fetch('/' + url);
    const data = await response.json();
    
    return data;
};

export const post = async (url, payload) => {
    const response = await fetch('/' + url, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json();

    return data;
}