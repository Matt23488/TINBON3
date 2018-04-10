export function containsAll(source, items) {
    const remainingSource = [...source];
    const remainingItems = [...items];
    for (let i = 0; i < remainingItems.length; i++) {
        //if (!remainingSource.includes(remainingItems[i])) return false;
        const sourceIndex = remainingSource.findIndex(item => item === remainingItems[i]);
        if (sourceIndex === -1) return false;

        remainingSource.splice(sourceIndex, 1);
        remainingItems.splice(i, 1);
        i--;
    }

    return true;
}