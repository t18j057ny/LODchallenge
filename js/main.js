function convertCSVtoArray(str) {
    let result = [];
    let tmp = str.split("\n");

    for(let i=1; i<tmp.length; ++i) {
        result[i] = tmp[i].split(',');
    }
    
    return result;
}


function clear() {
    let doc_count = document.getElementById("count");
    //let name = document.getElementById("name");
    let parent = document.getElementById("result_list");

    doc_count.innerHTML = Number(0);
    //name.innerHTML = "";
	parent.innerHTML = "";
}


function draw(data, key) {
    let dic;
    //let name = document.getElementById("name");
    let doc_count = document.getElementById("count");
    let count = doc_count.textContent;
    let parentDiv = document.getElementById("result_list");
    let Ele = document.getElementById("text-" + Number(count-1))
    let newElement = document.createElement("div");

    if (key == "water") {
        //name.innerHTML = "食品名 / 製品URL / 製造メーカ名 / 製品の名称 / 製品の保存期間 / 製品の内容量 / 水の硬度";
        dic = ["食品名","製品URL","製造メーカ名","製品の名称","製品の保存期間","製品の内容量","水の硬度"];
    } else if (key == "alphamai") {
        //name.innerHTML = "食品名 / 製品URL / 製造メーカ名 / 製品の名称 / 製品の保存期間 / 製品の内容量 / 製品の出来上がり量 / 製品の原材料 / 製品に含まれるアレルゲン";
        dic = ["食品名","製品URL","製造メーカ名","製品の名称","製品の保存期間","製品の内容量","製品の出来上がり量","製品の原材料","製品に含まれるアレルゲン"];
    } else if (key == "soup") {
        //name.innerHTML = "食品名 / 製品URL / 製造メーカ名 / 製品の名称 / 製品の保存期間 / 製品の内容量 / 製品の原材料 / 製品に含まれるアレルゲン";
        dic = ["食品名","製品URL","製造メーカ名","製品の名称","製品の保存期間","製品の内容量","製品の原材料","製品に含まれるアレルゲン"];
    } else if (key == "bread") {
        //name.innerHTML = "食品名 / 製品URL / 製造メーカ名 / 製品の名称 / 製品の保存期間 / 製品の内容量 / 製品の原材料 / 製品に含まれるアレルゲン";
        dic = ["食品名","製品URL","製造メーカ名","製品の名称","製品の保存期間","製品の内容量","製品の原材料","製品に含まれるアレルゲン"];
    } else if (key == "men") {
        //name.innerHTML = "食品名 / 製品URL / 製造メーカ名 / 製品の名称 / 製品の保存期間 / 製品の内容量 / 製品の出来上がり / 製品の原材料 / 製品に含まれるアレルゲン";
        dic = ["食品名","製品URL","製造メーカ名","製品の名称","製品の保存期間","製品の内容量","製品の出来上がり量","製品の原材料","製品に含まれるアレルゲン"];
    } else if (key == "can") {
        //name.innerHTML = "食品名 / 製品URL / 製造メーカ名 / 製品の名称 / 製品の保存期間 / 製品の内容量 / 製品の原材料 / 製品に含まれるアレルゲン";
        dic = ["食品名","製品URL","製造メーカ名","製品の名称","製品の保存期間","製品の内容量","製品の原材料","製品に含まれるアレルゲン"];
    } else if (key == "grass") {
        //name.innerHTML = "薬草の名称 / アク抜き時の火力 / 薬用 / 害の有無 / 野草の分布 / 野草の生育地";
        dic = ["薬草の名称","アク抜き時の火力","薬用","害の有無","野草の分布","野草の生育地"];
    }

    newElement.setAttribute("id","result-" + Number(count));
    parentDiv.insertBefore(newElement, Ele);

    for (let i=0; i<data.length; ++i) {
        let child = document.createElement("p");
        child.appendChild(document.createTextNode(dic[i] + " : " + data[i]));

        let parentnode = document.getElementById("result-" + Number(count));
        parentnode.append(child);
    }
    
    parentDiv.insertBefore(document.createElement("hr"), document.getElementById("text-" + Number(count)));

    count = Number(count) + Number(1);
    doc_count.innerHTML = Number(count);
}


function search(data, key) {
    let textbox = document.getElementById("query");
    let query = textbox.value;
    let words = [query];//.replace(/["　"]/g, " ").split(" ",0);

    clear()

    for(let i=0; i<words.length; ++i) {
        let word = words[i];
        for(let j=0; j<data.length; ++j) {
            for(let k=0; k<data[j].length; ++k) {
                d = data[j][k];
                if (d.indexOf(word) != -1) {
                    console.log(data[j]);
                    draw(data[j], key);
                    break;
                }
            }
        }
    }
}


function request() {
    let req = new XMLHttpRequest();
    let path = "";
    let key = "";
    let elem_water = document.getElementById("water");
    let elem_alphamai = document.getElementById("alphamai");
    let elem_soup = document.getElementById("soup");
    let elem_pan = document.getElementById("pan");
    let elem_ = document.getElementById("men");
    let elem_men = document.getElementById("can");
    let elem_grass = document.getElementById("grass");
    

    if (elem_water.checked) {
	    path = "https://t18j057ny.github.io/LODchallenge/data/stockpile_water.csv";
        key = "water";
    } else if (elem_alphamai.checked) {
	    path = "https://t18j057ny.github.io/LODchallenge/data/stockpile_foods.csv";
        key = "alphamai";
    } else if (elem_soup.checked) {
	    path = "https://t18j057ny.github.io/LODchallenge/data/stockpile_soop.csv";
        key = "soup";
    } else if (elem_pan.checked) {
	    path = "https://t18j057ny.github.io/LODchallenge/data/stockpile_canned_bread.csv";
        key = "bread";
    } else if (elem_.checked) {
	    path = "https://t18j057ny.github.io/LODchallenge/data/stockpile_men.csv";
        key = "men";
    } else if (elem_men.checked) {
	    path = "https://t18j057ny.github.io/LODchallenge/data/stockpile_can.csv";
        key = "can";
    } else if (elem_grass.checked) {
	    path = "https://t18j057ny.github.io/LODchallenge/data/wild_grass.csv";
        key = "grass";
    }

    console.log(path);

    req.open("get", path, true);
    req.send(null);
    req.onload = function() {
        search(convertCSVtoArray(req.responseText), key);
    }
}
