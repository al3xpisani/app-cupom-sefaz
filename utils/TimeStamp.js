
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
export const TimeStamp = (secs) => {
    var t = new Date(secs*1000);
    return `${t.getDate()} ${months[t.getMonth()]} ${t.getFullYear()} às ${t.getHours()}:${t.getMinutes()}`;
}