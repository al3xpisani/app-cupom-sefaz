
const months = ["0", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
export const TimeStamp = (secs) => {
    var t = new Date(secs*1000);
    return `${t.getDate()} ${months[t.getMonth()+1]} ${t.getFullYear()} às ${t.getHours()}:${t.getMinutes()}`;
}

export const TimeStampStringFormat = (dateStamp) => {
    let stringDateStamp = String(dateStamp)
    return `${stringDateStamp.substring(0,2)} de ${months[Number(stringDateStamp.substring(3,5))]} ${stringDateStamp.substring(6,10)} às ${stringDateStamp.substring(11,16)} `
}