export const transformName = name => {
    const username = name.split(" ")
    return username.map(letter =>{
        letter.toUpperCase()
        return letter[0]
    }).join(" ");
}