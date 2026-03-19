export function getProducts() {
    return fetch('https://dummyjson.com/products').then(d => d.json())
}