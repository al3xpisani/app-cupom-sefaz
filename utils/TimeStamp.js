
const months = ["0", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
export const TimeStamp = (secs) => {
    var t = new Date(secs*1000);
    return `${t.getDate()} ${months[t.getMonth()+1]} ${t.getFullYear()} às ${t.getHours()}:${t.getMinutes()}`;
}

export const TimeStampStringFormat = (dateStamp) => {
    let stringDateStamp = String(dateStamp)
    return `${stringDateStamp.substring(0,2)} de ${months[Number(stringDateStamp.substring(3,5))]} ${stringDateStamp.substring(6,10)} às ${stringDateStamp.substring(11,16)} `
}

export const TimeStampISOStringFormat = (dateStamp) => {
    let stringDateStamp = String(dateStamp)
    return `${stringDateStamp.substring(8,10)} de ${months[Number(stringDateStamp.substring(5,7))]} ${stringDateStamp.substring(0,4)} às ${stringDateStamp.substring(11,16)} `
}

export const convertBrazilTimeStampToISO = (BRTimeStamp) => {
    return `${BRTimeStamp.substring(6,10)}-${BRTimeStamp.substring(3,5)}-${BRTimeStamp.substring(0,2)}T${BRTimeStamp.substring(11,16)}`
}