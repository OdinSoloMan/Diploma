export function PostData(type, userData){
    
    let BaseURL = "https://localhost:44367/";
    return new Promise((resolve, reject) => {
        fetch(BaseURL+type, {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(userData) 
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            resolve(responseJSON);
        })
        .catch((error) => {
            reject(error);
        });
    });
}