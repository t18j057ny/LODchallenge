var map = L.map('map').setView([36.575,135.984], 5);    // 日本を中心に設定

var geojsonFeature = [];
var popupContents = [];
var PopupContents = [];
var ken = ["北海道", "青森", "秋田", "岩手", "山形", "宮城", "福島", "栃木", "茨木", "群馬", "埼玉", "千葉", "東京", "神奈川", "新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", "静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山", "鳥取", "島根", "岡山", "広島", "山口", "徳島", "香川", "愛媛", "高知", "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"];      // ポップアップで表示する内容
var lat = [43.06417,　40.82444, 39.7186, 39.70361, 38.24056,  38.26889,     37.75,  36.56583,  36.34139,  36.39111, 35.85694, 35.60472, 35.68944, 35.44778, 37.90222, 36.69528, 36.59444, 36.06528, 35.66389, 36.65139, 35.39111, 34.97694, 35.18028, 34.73028, 35.00444, 35.02139, 34.68639, 34.69139, 34.68528, 34.22611, 35.50361, 35.47222, 34.66167, 34.39639, 34.18583, 34.06583, 34.34028, 33.84167, 33.55972, 33.60639, 33.24944, 32.74472, 32.78972, 33.23806, 31.91111, 31.56028, 26.2125];               // 緯度
var lon = [141.34694, 140.74,  140.1025, 141.1525, 140.36333, 140.87194, 140.46778, 139.88361, 140.44667, 139.06083, 139.64889, 140.12333, 139.69167, 139.6425, 139.02361, 137.21139, 136.62556, 136.22194, 138.56833, 138.18111, 136.72222, 138.38306, 136.90667, 136.50861, 135.86833, 135.75556, 135.52, 135.18306, 135.83278, 135.1675, 134.23833, 133.05056, 133.935, 132.45944, 131.47139, 134.55944, 134.04333, 132.76611, 133.53111, 130.41806, 130.29889, 129.87361, 130.74167, 131.6125, 131.42389, 130.55806, 127.68111];            // 経度


var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 19
    });
tileLayer.addTo(map);


L.geoJson(geojsonFeature,
    {
       onEachFeature: function(feature, layer){
        if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent);
        } 
      }
    }).addTo(map);



function grass_request() {
    let req = new XMLHttpRequest();

    req.open("get", "https://t18j057ny.github.io/LODchallenge/data/wild_grass.csv", true);
    req.send(null);
    req.onload = function() {
        grass_search(convertCSVtoArray(req.responseText));
    }
}


function grass_search(data) {
    let textbox = document.getElementById("g_query");
    let query = textbox.value;
    let words = [query];//.replace(/["　"]/g, " ").split(" ",0);

    grass_clear()

    for(let i=0; i<words.length; ++i) {
        let word = words[i];
        for(let j=0; j<data.length; ++j) {
            for(let k=0; k<data[j].length; ++k) {
                d = data[j][k];
                if (d.indexOf(word) != -1) {
                    console.log(data[j]);
                    grass_draw(data[j]);
                    break;
                }
            }
        }
    }
}


function convertCSVtoArray(str) {
    let result = [];
    let tmp = str.split("\n");

    for(let i=0; i<tmp.length; ++i) {
        result[i] = tmp[i].split(',');
    }
    
    return result;
}


function grass_clear() {
    let doc_count = document.getElementById("grass_count");
    let name = document.getElementById("grass_name");
    let parent = document.getElementById("grass_result_list");

    doc_count.innerHTML = Number(0);
    name.innerHTML = "";
parent.innerHTML = "";
    PopupContents = [];
}


function grass_draw(data) {
    let dic = ["薬草の名称","アク抜き時の火力","薬用","害の有無","野草の分布","野草の生育地"];
    let name = document.getElementById("grass_name");
    let doc_count = document.getElementById("grass_count");
    let count = doc_count.textContent;
    let parentDiv = document.getElementById("grass_result_list");
    let Ele = document.getElementById("grass_text-" + Number(count-1))
    let newElement = document.createElement("div");
    let kenContents = [];

    newElement.setAttribute("id","grass_result-" + Number(count));
    parentDiv.insertBefore(newElement, Ele);

    for (let i=0; i<data.length; ++i) {
        let child = document.createElement("p");
        child.appendChild(document.createTextNode(dic[i] + " : " + data[i]));

        let parentnode = document.getElementById("grass_result-" + Number(count));
        parentnode.append(child);
    }

    let button = document.createElement("input");
    button.setAttribute("id", Number(count));
    button.setAttribute("type","button");
    button.setAttribute("value","位置情報の表示");
    button.setAttribute("onclick","grass_map(this.id)");

    let parentnode = document.getElementById("grass_result-" + Number(count));
    parentnode.append(button);
    
    parentDiv.insertBefore(document.createElement("hr"), document.getElementById("grass_text-" + Number(count)));

    count = Number(count) + Number(1);
    doc_count.innerHTML = Number(count);
    
    if (data[4].indexOf("日本全土") != -1) {
        for (var i = 0; i < 47; i++){
            kenContents.push(ken[i]);
        }
        PopupContents.push(kenContents);
    } else {
        for (var i = 0; i < 47; i++){
            if (data[4].indexOf(ken[i]) != -1) {
                kenContents.push(ken[i]);
            }
        }
        PopupContents.push(kenContents);
    }
}


function grass_map(id) {
    var id = Number(id);
    map.remove();
    map = null;
    map = L.map('map').setView([36.575,135.984], 5);  
    var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 19
    });
    tileLayer.addTo(map);
	
    var geojsonFeature = [];
    var popupContents = [];

    for (var i = 0; i < PopupContents[id].length; i++){
        for (let j=0; j<47; ++j){
	    console.log(PopupContents[id][i]);
            console.log(ken[j]);
            if (PopupContents[id][i] == ken[j]) {
                geojsonFeature.push({    
                    "type": "Feature",
                    "properties": {
                        "popupContent": ken[j]
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [lon[j], lat[j]]
                    }
                });
            }
        }
    }

    L.geoJson(geojsonFeature,
        {
           onEachFeature: function(feature, layer){
            if (feature.properties && feature.properties.popupContent) {
              layer.bindPopup(feature.properties.popupContent);
            } 
          }
        }).addTo(map);
}
