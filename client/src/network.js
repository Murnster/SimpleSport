// Network call shorthand for GET
export const get = async (url) => {
    // Build production
    // const response = await fetch('http://localhost:5000/' + url);
    // npm run build
    // serve -s build

    const response = await fetch('/' + url);
    const data = await response.json();
    
    return data;
};

// Network call shorthand for POST
export const post = async (url, payload) => {
    // Build production
    // const response = await fetch('http://localhost:5000/' + url);
    // npm run build
    // serve -s build

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