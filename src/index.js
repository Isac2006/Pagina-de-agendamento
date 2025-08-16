import dayjs from "dayjs";
import "./style.css";
console.log("Hello, World!");
var inputdata = document.getElementById("data");
var datahj = dayjs().format("YYYY-MM-DD");
inputdata.value = datahj;
inputdata.min = datahj;
