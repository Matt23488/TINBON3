// 5/4/18: https://www.c-sharpcorner.com/blogs/generate-guid-using-javascript1
export default function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, c => {
            const r = Math.random()*16|0;
            const v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
}