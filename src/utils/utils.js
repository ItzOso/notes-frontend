export const categoryNotesAmount = (category, state) => {
    if (state.notes === []) return 0;

    let count = 0;

    state.notes.forEach((note) => {
        if (note.category === category?._id) {
            count = count + 1;
        }
    });

    return count;
};

export const noteContentPreview = (content) => {
    if (content.length <= 100) return content

    return `${content.substring(0, 100)}...`
}

export const formatDate = (givenDate) => {
    const date = new Date(givenDate)
    let dateMDY = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    return dateMDY
}