import * as $ from "jquery";
import {Portal, Link} from "./Portal"

// for(let i = 0; i < 10000; i++){
//     console.log(httpGet('http://localhost:50000/hello'))
// }

function asyncRead() {
    $.post('http://localhost:50000/hey', function(data) {
        console.log(data);
        console.log(JSON.parse(data));
    }, 'text');
}
// asyncRead();

function getValues(){
    let req = $.ajax({
    url: 'http://localhost:8080/singular',
    method: 'POST',
    data: JSON.stringify({at:[[0,1],[2,3],[4,3]],dimension: 2}), // sends fields with filename mimetype etc
    // data: aFiles[0], // optional just sends the binary
    processData: false, // don't let jquery process the data
    contentType: false // let xhr set the content type
});
    req.done((res)=>{
        console.log(res);
    });
}

// getValues();

let link = Portal.importFunc(8080, 2);
let count = 0;
for(let i = 0; i<5000; i++){
    link.get([i,-i],(val)=>{
        console.log(val);
        // count++;
        // console.log(count);
    });
}