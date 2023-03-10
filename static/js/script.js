let result = document.getElementById('container1');
let jData=[];
let jData_num=[];
let jarr=[];
let word_arr=[];
let id_arr=[];
let head_arr=[];
let dep_arr=[];
let jpos_arr= [];
let pos_arr=[];
let read_arr=[];
let type_arr=[];
let wcount_arr=[];
let wcount_o_arr=[];
let wtype_arr=[];
let stemWeight_arr = [];
let root;
let textalpha;
const char_list = [];



//植物にするボタンを押した時の処理
$('#draw').on('click', function(){
    return $.ajax({
            data:{w_box : $('#w_box').val()},
            url:"/data",
            type:"POST", 
    })  
    .done(function(response){
            
            console.log('success');
            
            jData = response.flat();
            //console.log(jData);
            jarr = [];
            jData_num = (jData.length)/8
            //console.log(jData.length);
            for (let i = 0; i<jData_num;i++){
                var darr = {};
                darr.id = jData.shift();
                darr.word = jData.shift();
                darr.dep = jData.shift();
                darr.pos = jData.shift();
                darr.head = jData.shift();
                darr.read = jData.shift();
                darr.jpos = jData.shift();
                darr.lemma = jData.shift();
                jarr.push(darr);
            }
            
            word_arr=jarr.map(obj => obj.word);
            id_arr=jarr.map(obj => obj.id);
            head_arr=jarr.map(obj => obj.head);
            dep_arr=jarr.map(obj => obj.dep);
            pos_arr=jarr.map(obj => obj.pos);
            read_arr=jarr.map(obj => obj.read);
            jpos_arr=jarr.map(obj => obj.jpos);
            lemma_arr=jarr.map(obj => obj.lemma);
            setup();
            draw();
            
  
            
            
        }).fail(function(err){
            console.log('error');
    
        })
    

    
});





function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  
  canvas.parent(result);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(10);
  
  
  //ここから植物の描画処理
  for (var a in jarr) {
    if (jarr[a].dep === "ROOT") {
      root = jarr[a].head;
      delete jarr[a].head;
      console.log(jarr);
    }
  }

}

function draw() {
  //noLoop();
  background(0);
  
  
  
  push();
  scale(0.45);


  //scale(width / (id_arr.length * width * 0.07));
  //console.log(width / (id_arr.length * width * 0.15));
//ROOTの取り出し


    //植物の彩度
  let saturation;
  const tense1 = jarr.some((t) => (((t.dep === "aux" && t.word===("だ")&& t.head === root))));
  const tense2 = jarr.some((t) => (((t.dep === "aux" && t.word===("た")&& t.head === root))));
  const adj = jarr.some((a) => (a.dep === "ROOT")&&(a.pos === "ADJ"));
  if((tense1 === true)&&(adj === true)){
  saturation = 70;
  }else if((tense2 === true)&&(adj === true)){
    saturation = 30;
    }else if(((tense1 === true)||(tense2 === true))&&(adj === false)){
      saturation = 30;
      }else{
  saturation = 70;}
  

  //文全体を常体か敬体を判断
  let lineStyle;
  const literaryStyle = jarr.some((l) => (l.jpos === "助動詞" && l.lemma === "ます") || (l.jpos === "助動詞" && l.lemma === "です"));
  if(literaryStyle === true){
  lineStyle = 1;
  console.log(lineStyle);
  }else{
  lineStyle = 2;}


      wcount_o_arr = countReadLengths(read_arr);
      //console.log(wcount_o_arr);
      wcount_arr = countWordLengths(word_arr);
      //console.log(wcount_arr);
      
      
      wtype_arr = spritChar(word_arr);
      
    
      for (let i = 0; i < id_arr.length; i++) {
        for (let j = 0; j < head_arr.length; j++) {
          if (id_arr[j] === head_arr[i]) {
            stemWeight_arr = stemWeight(jpos_arr);
            stem(
              id_arr[i],
              id_arr[j], 
              head_arr[i], 
              head_arr[j],
              stemWeight_arr[i],
              jpos_arr[i],
              saturation,
              lineStyle,
              word_arr[i],
              );
            }
          }
        }
        angleMode(DEGREES);
      for (let a = 0; a < id_arr.length; a++) {
        for (let b = 0; b < head_arr.length; b++) {
          if (id_arr[b] === head_arr[a]) {
            flower_position(
              id_arr[a],
              id_arr[b],
              head_arr[a],
              head_arr[b],
              wcount_arr[a],
              wcount_o_arr[a],
              pos_arr[a],
              wtype_arr[a],
              wcount_arr[a],
              jpos_arr[a],
              saturation,
              read_arr[a],
              word_arr[a], 
            );
            
          }
        }
      }
//全体の色
let filterPink = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="ピンク" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ピンク色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ぴんく" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ぴんく色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="桃色")||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="もも色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="桃いろ" ));
if(filterPink === true){
  push();
  blendMode(DODGE);
  
  rectMode(CORNER);
  for(let i = 0; i<100;i++){
  drawingContext.shadowColor = color(323,100,100,40);
  drawingContext.shadowBlur = 100;
  noStroke();
  fill(323,100,100,40);
  ellipse(random(0,windowWidth*2),random(0,windowHeight*2),random(50,300));
}
pop();
}
let filterMurasaki = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="紫" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="むらさき" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ムラサキ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="紫色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="むらさき色")||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ムラサキ色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="パープル" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ヴァイオレット" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="すみれ色" ));
if(filterMurasaki === true){
  push();
  blendMode(MULTIPLY);
  
  rectMode(CORNER);
  for(let i = 0; i<100;i++){
  drawingContext.shadowBlur = 100;
  drawingContext.shadowColor = color(275,100,100,30);
  noStroke();
  fill(275,100,100,30);
  ellipse(random(0,windowWidth*2),random(0,windowHeight*2),random(50,300));
}
pop();
}
let filterGreen = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="緑" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="翠" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ミドリ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="みどり" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="緑色")||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="翠色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ミドリ色" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="みどり色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="グリーン" ));
if(filterGreen === true){
  push();
  blendMode(MULTIPLY);
  
  rectMode(CORNER);
  for(let i = 0; i<100;i++){
  drawingContext.shadowBlur = 100;
  drawingContext.shadowColor = color(95,100,100,30);
  noStroke();
  fill(95,100,100,30);
  ellipse(random(0,windowWidth*2),random(0,windowHeight*2),random(50,300));
}
pop();
}
let filterOrenge = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="オレンジ" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="橙" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="だいだい" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="オレンジ色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="橙色")||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="だいだい色" ));
if(filterOrenge === true){
  push();
  blendMode(MULTIPLY);
  
  rectMode(CORNER);
  for(let i = 0; i<100;i++){
  drawingContext.shadowBlur = 100;
  drawingContext.shadowColor = color(38,100,100,30);
  noStroke();
  fill(38,100,100,30);
  ellipse(random(0,windowWidth*2),random(0,windowHeight*2),random(50,300));
}
pop();
}
let filterBlue = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="青" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="蒼" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="碧" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="あお" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="アオ")||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="青色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="蒼色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="碧色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="あお色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="アオ色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ブルー" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="真っ青" )||
(f.jpos === "形容詞-一般" && f.lemma==="青い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="蒼い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="碧い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="あおい" ) ||(f.jpos === "形容詞-一般" && f.lemma==="アオい" ));
if(filterBlue === true){
  push();
  blendMode(DODGE);
  
  rectMode(CORNER);
  for(let i = 0; i<100;i++){
  drawingContext.shadowBlur = 100;
  drawingContext.shadowColor = color(232,100,100,30);
  noStroke();
  fill(232,100,100,30);
  ellipse(random(0,windowWidth*2),random(0,windowHeight*2),random(50,300));
}
pop();
}
let filterYellow = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="黄" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="黄色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="きいろ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="キイロ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="イエロー" )||
(f.jpos === "形容詞-一般" && f.lemma==="黄色い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="きいろい" ) ||(f.jpos === "形容詞-一般" && f.lemma==="キイロイ" ));
if(filterYellow === true){
  push();
  blendMode(DODGE);
  
  rectMode(CORNER);
  for(let i = 0; i<100;i++){
  drawingContext.shadowBlur = 100;
  drawingContext.shadowColor = color(59,100,60,30);
  noStroke();
  fill(59,100,60,30);
  ellipse(random(0,windowWidth*2),random(0,windowHeight*2),random(50,300));
}
pop();
}
let filterRed = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="赤" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="紅" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="緋" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="朱" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="あか" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="アカ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="あか" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="レッド" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="赤色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="紅色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="朱色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="緋色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="あか色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="アカ色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="真っ赤" )||
(f.jpos === "形容詞-一般" && f.lemma==="赤い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="緋い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="紅い" )||(f.jpos === "形容詞-一般" && f.lemma==="朱い" )||(f.jpos === "形容詞-一般" && f.lemma==="あかい" )||(f.jpos === "形容詞-一般" && f.lemma==="アカイ" ));
if(filterRed === true){
  push();
  blendMode(MULTIPLY);
  
  rectMode(CORNER);
  for(let i = 0; i<100;i++){
  drawingContext.shadowBlur = 100;
  drawingContext.shadowColor = color(0,100,100,30);
  noStroke();
  fill(0,100,100,30);
  ellipse(random(0,windowWidth*2),random(0,windowHeight*2),random(50,300));
}
pop();
}
let filterWhite = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="白" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="シロ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="しろ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="白色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="しろ色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="シロ色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="真っ白" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ホワイト" )||
(f.jpos === "形容詞-一般" && f.lemma==="白い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="シロイ" ) ||(f.jpos === "形容詞-一般" && f.lemma==="しろい" ));
if(filterWhite === true){
  push();
  blendMode(DODGE);
  
  rectMode(CORNER);
  for(let i = 0; i<100;i++){
  drawingContext.shadowBlur = 100;
  drawingContext.shadowColor = color(0,0,100,30);
  noStroke();
  fill(0,0,100,30);
  ellipse(random(0,windowWidth*2),random(0,windowHeight*2),random(50,300));
}
pop();
}

let filterBlack = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="黒" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="クロ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="くろ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="黒色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="くろ色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="クロ色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="真っ黒" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ブラック" )||
(f.jpos === "形容詞-一般" && f.lemma==="黒い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="クロイ" ) ||(f.jpos === "形容詞-一般" && f.lemma==="くろい" ));
if(filterBlack === true){
  push();
  blendMode(MULTIPLY);
  
  rectMode(CORNER);
  for(let i = 0; i<100;i++){
  drawingContext.shadowBlur = 100;
  drawingContext.shadowColor = color(0,0,0,30);
  noStroke();
  fill(0,0,0,30);
  ellipse(random(0,windowWidth*2),random(0,windowHeight*2),random(50,300));
}
pop();
}

for (let c = 0; c < id_arr.length; c++) {
  for (let d = 0; d < head_arr.length; d++) {
    if (id_arr[d] === head_arr[c]) {
      drawGraund(id_arr[c],
        id_arr[d],head_arr[c],head_arr[d]
               );
      }
    }
  }
  for (let e = 0; e < id_arr.length; e++) {
    for (let f = 0; f < head_arr.length; f++) {
      
      if (id_arr[e] === head_arr[f]) {
        drawText(id_arr[f],
              id_arr[e],
              head_arr[f],
              head_arr[e],
              word_arr[f],textalpha,);
            }
        }
      }
pop();
//最後

}
//母音
function colorHue(words){
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let color;
    let lastChar = word.slice(-1);
    if(lastChar === "ー") {
      lastChar = word.slice(-2, -1);
    }
    console.log(lastChar);
    switch(lastChar) {
      case "ア":case "ァ":case "カ":case "サ":case"タ":case"ナ":case"ハ":case"マ":case"ラ":case"ヤ": case"ャ":case"ワ":case"ガ":case"ザ":case"ダ":case"バ":case"パ":
        color = int(random(330,360))||int(random(0,30));
        break;
      case "イ":case"ィ":case"キ":case"シ":case"チ":case"ニ":case"ヒ":case"ミ":case"リ":case"ギ":case"ジ":case"ヂ":case"ビ":case"ピ":
        color = int(random(30,90));
        break;
      case "ウ": case"ゥ":case "ク":case "ス":case "ツ":case "ヌ":case "フ":case "ム":case "ル":case "ユ":case "ュ":case"グ":case "ズ":case "ヅ":case "ブ":case "プ":
        color = int(random(90,150));
        break;
      case "エ":case "ェ":case "ケ":case "セ":case "テ":case "ネ":case "ヘ":case "メ":case "レ":case "ゲ":case "ゼ":case "デ":case "ベ":case "ペ":
        color = int(random(270,330));
        break;
      case "オ":case "ォ":case "コ":case "ソ":case "ト":case "ノ":case "ホ":case "モ":case "ヨ":case "ョ":case "ロ":case "ヲ":case "ゴ":case "ゾ":case "ド":case "ボ":case "ポ":
        color = int(random(210,270));
        break;
      case "ン":
        color = int(random(150,210));
        break;
      default:
        color = 361;
    }
    console.log(color);
    return color;
  }
  
}
//濁音を判断
function Dakuon(words){
  const dakuonChars = "ガギグゲゴザジズゼゾダヂヅデドバビブベボヴヷヸヹヺパピプペポ";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // 単語の中に濁音文字があるかどうかを判別する
    for (let j = 0; j < word.length; j++) {
      if (dakuonChars.includes(word[j])) {
        
        return 100;
      }else if((word === "。" )||( word === ".")||(word === "、" )|| (word === ",")) {
        return 0;
      }else{
        
        return 50;
      }
      
    }
  }
  
}

//単語を１文字ずつ分解して文字タイプ判断
function spritChar(word_arr){
  const result = [];
  for(let i = 0; i<word_arr.length; i++){
    const word_list = [];
    const chars = word_arr[i].split('');
  
  for(const char of chars){
    let type;
    if(/[\u4e00-\u9faf]/.test(char)){
      //漢字
      type = 1;
    }else if(/[\u3040-\u309f]/.test(char)){
      //ひらがな
      type = 2;
    }else if(/[\u30a0-\u30ff]/.test(char)){
      //カタカナ
      type = 3;
    }else if((/[a-zA-Z]/.test(char))||(/[0-9]/.test(char))){
      //英語と数字
      type = 4;
    }else{
      //その他(記号)
      type = 5;
    }
    word_list.push(type);
   
  }
  result.push(word_list);

  }
  
  return result;
}
//よみがなの文字数をカウントする
function countReadLengths(words) {
  // 新しいリストを作成する
  var lengths = [];

  // 二次元配列の各要素を反復処理する
  for (var i = 0; i < words.length; i++) {
    for (var j = 0; j < words[i].length; j++) {
      // 単語の文字数をカウントする
      var length = words[i][j].length;
      // 新しいリストに追加する
      lengths.push(length);
    }
  }

  // 新しいリストを返す
  return lengths;
}
function countWordLengths(words) {
  // 新しいリストを作成する
  var lengths = [];

  // 配列の各要素を反復処理する
  for (var i = 0; i < words.length; i++) {
    // 単語の文字数をカウントする
    var length = words[i].length;
    // 新しいリストに追加する
    lengths.push(length);
  }

  // 新しいリストを返す
  return lengths;
}

function stem(x1, y1, x2, y2,stemWeight,jpos_arr,saturation,lineStyle,word) {
  
  var ix1 = windowWidth/3 + x1 * 50;
  var ix2 =  windowWidth/3 + x2 * 50;
  var iy1 =  windowHeight/3 + y1 * 50;
  var iy2 =  windowHeight/3 + y2 * 50;
  strokeCap(ROUND);
  strokeWeight(stemWeight);
  stroke(100, saturation, 60, 100);
  if ((word === "。" || word === "."||word === "、" || word === ",")){
    noStroke();}
  noFill();
if(lineStyle===1){
  if (x1 === root) {
    //line(ix1, iy1, ix2, iy2);
  } else if (y1 === x2 && x2 === root) {
    spiralLine(ix1, iy1, ix2, iy2 + 250);
  } else if (y1 === x2 && x2 !== root) {
    spiralLine(ix1, iy1, ix2, iy2);
  }
}else if(lineStyle===2){
  if (x1 === root) {
    //waveLine(ix1, iy1, ix2, iy2);
  } else if (y1 === x2 && x2 === root) {
    waveLine(ix1, iy1, ix2, iy2 + 250);
  } else if (y1 === x2 && x2 !== root) {
    waveLine(ix1, iy1, ix2, iy2);
  }
}
  //console.log(y1);
}

function stemWeight(jpos_arr){
  let stemWeight = [];
    let stemw=3;

  for(var i = 0; i<jpos_arr.length; i++){
    if (jpos_arr[i] === "補助記号-読点") {
      stemw  += 3;
  }
   stemWeight.push(stemw);
}
//console.log(stemWeight);
return stemWeight;

}
stemWeight_arr = stemWeight(jpos_arr);

function drawGraund(x1, y1,x2,y2){
  var ix1 = windowWidth/3 + x1 * 50;
  var ix2 =  windowWidth/3 + x2 * 50;
  var iy1 =  windowHeight/3 + y1 * 50;
  var iy2 =  windowHeight/3 + y2 * 50;
 if (x1 === root) {
strokeWeight(1.7);
stroke(255,100);
waveLine(0,iy1+ 250,windowWidth*3,iy1+ 250);
    }
}
function drawText(x1, y1,x2,y2,word,x){
  var ix1 = windowWidth/3 + x1 * 50;
  var ix2 =  windowWidth/3 + x2 * 50;
  var iy1 =  windowHeight/3 + y1 * 50;
  var iy2 =  windowHeight/3 + y2 * 50;
  //Font('Zen Kaku Gothic New');
  textSize(24);
    if (x1 === root) {
      stroke(0,0,100,x);
      fill(0,0,100,x);
      text(word, ix1+20, iy1+270);
    } else if (y1 === x2 && x2 === root) {
      if (word === "。" || word === "."||word === "、" || word === ",") {
        noFill();
        stroke(0,0,0,0);
      }else{stroke(0,0,100,x);
        fill(0,0,100,x);
        strokeWeight(1);}
      text(word, ix1+20, iy1+20);
    } else if (y1 === x2 && x2 !== root) {
      if (word === "。" || word === "."||word === "、" || word === ",") {
        noFill();
        stroke(0,0,0,0);
      }else{stroke(0,0,100,x);
        fill(0,0,100,x);;
        strokeWeight(1);}
      text(word, ix1+20, iy1+20);
    }
    
}

function flower_position(x1, y1, x2, y2, count_p, count_o, part, wtype_arr, wcount_arr,jpos_arr,saturation,read_arr,word) {
  var ix1 = windowWidth/3 + x1 * 50;
  var ix2 =  windowWidth/3 + x2 * 50;
  var iy1 =  windowHeight/3 + y1 * 50;
  var iy2 =  windowHeight/3 + y2 * 50;
  if (x1 === root) {
    console.log(root);

    if ((jpos_arr === "名詞-普通名詞-一般")||(jpos_arr === "名詞-普通名詞-サ変可能")||(jpos_arr === "名詞-普通名詞-形状詞可能")||(jpos_arr === "名詞-普通名詞-サ変形状詞可能")||
    (jpos_arr === "名詞-普通名詞-副詞可能")||(jpos_arr === "名詞-普通名詞-助数詞可能")||(jpos_arr === "名詞-助動詞語幹")) {
      //名詞
      rootA(ix1, iy1 + 250, count_o);
    } else if ((jpos_arr === "名詞-固有名詞-一般")||(jpos_arr === "名詞-固有名詞-人名-一般")||(jpos_arr === "名詞-固有名詞-人名-姓")||
               (jpos_arr === "名詞-固有名詞-人名-名")||(jpos_arr === "名詞-固有名詞-地名-一般")||(jpos_arr === "名詞-固有名詞-地名-国")) {
      //固有名詞
      rootA(ix1, iy1 + 250, count_o);
    }else if (jpos_arr === "代名詞") {
      //代名詞
      rootA(ix1, iy1+ 250, count_o);
    } else if ((jpos_arr === "動詞-一般")||(jpos_arr === "動詞-非自立可能")) {
      //動詞
      rootB(ix1, iy1 + 250, count_o,saturation);
    } else if ((jpos_arr === "形容詞-一般")||(jpos_arr === "形容詞-非自立可能")) {
      //形容詞
      rootC(ix1, iy1 + 250, count_o,saturation);
    }else if ((jpos_arr === "形状詞-一般")||(jpos_arr === "形状詞-タリ")||(jpos_arr === "形状詞-助動詞語幹")) {
      //形状詞
      rootC(ix1, iy1 + 250, count_o,saturation);
    }else if (jpos_arr === "連体詞"){
      //連体詞
      rootD(ix1, iy1 + 250, count_o,saturation);
    }else if (jpos_arr === "副詞"){
      //副詞
      rootD(ix1, iy1 + 250, count_o,saturation);
    }else if (jpos_arr === "助動詞"){
      //助動詞
      rootE(ix1, iy1 + 250, count_o);
    }else if((jpos_arr === "接尾辞-名詞的-一般")||(jpos_arr === "接尾辞-名詞的-サ変可能")||(jpos_arr === "接尾辞-名詞的-形状詞可能")||
             (jpos_arr === "接尾辞-名詞的-サ変形状詞可能")||(jpos_arr === "接尾辞-名詞的-副詞可能")||(jpos_arr === "接尾辞-名詞的-助数詞")||
             (jpos_arr === "接尾辞-形状詞的")||(jpos_arr === "接尾辞-動詞的")||(jpos_arr === "接尾辞-形容詞的")){
      //接尾辞
      rootE(ix1, iy1 + 250, count_o);
    }else if((jpos_arr === "接頭辞")){
      //接頭辞
      rootE(ix1, iy1 + 250, count_o);
    }else if(jpos_arr === "接続詞"){
      //接続詞
      rootE(ix1, iy1 + 250, count_o);
    }else if((jpos_arr === "助詞-格助詞")||(jpos_arr === "助詞-副助詞")||(jpos_arr === "助詞-係助詞")||
             (jpos_arr === "助詞-接続助詞")||(jpos_arr === "助詞-終助詞")||(jpos_arr === "助詞-準体助詞")){
      //助詞
      rootE(ix1, iy1 + 250, count_o);
    }else if((jpos_arr === "名詞-数詞")||(jpos_arr === "記号-一般")||(jpos_arr === "記号-文字")||(jpos_arr === "補助記号-一般")||(jpos_arr === "補助記号-読点")||(jpos_arr === "補助記号-句点")||
    (jpos_arr === "補助記号-括弧開")||(jpos_arr === "補助記号-括弧閉")||(jpos_arr === "補助記号-AA-一般")||(jpos_arr === "補助記号-AA-顔文字")){
      //数詞と感動詞と記号と補助句号
      rootE(ix1, iy1 + 250, count_o);
    }else{
      //当分は色なしの白い葉っぱ
      rootE(ix1, iy1 + 250, count_o);
    }
  } else if (y1 === x2 && x2 === root) {
    if ((jpos_arr === "名詞-普通名詞-一般")||(jpos_arr === "名詞-普通名詞-サ変可能")||(jpos_arr === "名詞-普通名詞-形状詞可能")||(jpos_arr === "名詞-普通名詞-サ変形状詞可能")||
    (jpos_arr === "名詞-普通名詞-副詞可能")||(jpos_arr === "名詞-普通名詞-助数詞可能")||(jpos_arr === "名詞-助動詞語幹")) {
      //名詞
      flowerA1(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamenA(ix1, iy1 , count_o);
    } else if ((jpos_arr === "名詞-固有名詞-一般")||(jpos_arr === "名詞-固有名詞-人名-一般")||(jpos_arr === "名詞-固有名詞-人名-姓")||
               (jpos_arr === "名詞-固有名詞-人名-名")||(jpos_arr === "名詞-固有名詞-地名-一般")||(jpos_arr === "名詞-固有名詞-地名-国")) {
      //固有名詞
      flowerA2(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamenA(ix1, iy1 , count_o);
    }else if (jpos_arr === "代名詞") {
      //代名詞
      flowerA3(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamenA(ix1, iy1, count_o);
    
    
    } else if ((jpos_arr === "動詞-一般")||(jpos_arr === "動詞-非自立可能")) {
      //動詞
      flowerB(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamenB(ix1, iy1, count_o,saturation);
      
    } else if ((jpos_arr === "形容詞-一般")||(jpos_arr === "形容詞-非自立可能")) {
      //形容詞
      flowerC1(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamenC1(ix1, iy1, count_o,saturation);
    }else if ((jpos_arr === "形状詞-一般")||(jpos_arr === "形状詞-タリ")||(jpos_arr === "形状詞-助動詞語幹")) {
      //形状詞
      flowerC2(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamenC1(ix1, iy1, count_o,saturation);

    }else if (jpos_arr === "連体詞"){
      //連体詞
      flowerC3(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamenC2(ix1, iy1, count_o,saturation);
    }else if (jpos_arr === "副詞"){
      //副詞
      flowerC4(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamenC2(ix1, iy1, count_o,saturation);
    }else if (jpos_arr === "助動詞"){
      //助動詞
      leafA(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if((jpos_arr === "接尾辞-名詞的-一般")||(jpos_arr === "接尾辞-名詞的-サ変可能")||(jpos_arr === "接尾辞-名詞的-形状詞可能")||
             (jpos_arr === "接尾辞-名詞的-サ変形状詞可能")||(jpos_arr === "接尾辞-名詞的-副詞可能")||(jpos_arr === "接尾辞-名詞的-助数詞")||
             (jpos_arr === "接尾辞-形状詞的")||(jpos_arr === "接尾辞-動詞的")||(jpos_arr === "接尾辞-形容詞的")){
      //接尾辞
      leafB(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if((jpos_arr === "接頭辞")){
      //接頭辞
      leafC(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if(jpos_arr === "接続詞"){
      //接続詞
      leafD(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr,word);
    }else if((jpos_arr === "助詞-格助詞")||(jpos_arr === "助詞-副助詞")||(jpos_arr === "助詞-係助詞")||
             (jpos_arr === "助詞-接続助詞")||(jpos_arr === "助詞-終助詞")||(jpos_arr === "助詞-準体助詞")){
      //助詞
      leafE(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if((jpos_arr === "名詞-数詞")||(jpos_arr === "記号-一般")||(jpos_arr === "記号-文字")||(jpos_arr === "補助記号-一般")||(jpos_arr === "感動詞-一般")||(jpos_arr === "感動詞-フィラー")||(jpos_arr === "補助記号-読点")||(jpos_arr === "補助記号-句点")||
    (jpos_arr === "補助記号-括弧開")||(jpos_arr === "補助記号-括弧閉")||(jpos_arr === "補助記号-AA-一般")||(jpos_arr === "補助記号-AA-顔文字")){
      //数詞と感動詞と記号と補助句号
      if ((word === "。" )||( word === ".")||(word === "、" )|| (word === ",")) {
        noStroke();
    noFill();}
      flowerA1(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr,word);
      calyx(ix1, iy1,count_o,saturation,word);
    }else{
      //当分は色なしの白い葉っぱ
      leafF(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }
  } else if (y1 === x2 && x2 !== root) {
    if ((jpos_arr === "名詞-普通名詞-一般")||(jpos_arr === "名詞-普通名詞-サ変可能")||(jpos_arr === "名詞-普通名詞-形状詞可能")||(jpos_arr === "名詞-普通名詞-サ変形状詞可能")||
    (jpos_arr === "名詞-普通名詞-副詞可能")||(jpos_arr === "名詞-普通名詞-助数詞可能")||(jpos_arr === "名詞-助動詞語幹")) {
      //名詞
      flowerA1(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamenA(ix1, iy1 , count_o);
    } else if ((jpos_arr === "名詞-固有名詞-一般")||(jpos_arr === "名詞-固有名詞-人名-一般")||(jpos_arr === "名詞-固有名詞-人名-姓")||
               (jpos_arr === "名詞-固有名詞-人名-名")||(jpos_arr === "名詞-固有名詞-地名-一般")||(jpos_arr === "名詞-固有名詞-地名-国")) {
      //固有名詞
      flowerA2(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamenA(ix1, iy1 , count_o);
    }else if (jpos_arr === "代名詞") {
      //代名詞
      flowerA3(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamenA(ix1, iy1, count_o);
    
    
    } else if ((jpos_arr === "動詞-一般")||(jpos_arr === "動詞-非自立可能")) {
      //動詞
      flowerB(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamenB(ix1, iy1, count_o,saturation);
      
    } else if ((jpos_arr === "形容詞-一般")||(jpos_arr === "形容詞-非自立可能")) {
      //形容詞
      flowerC1(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamenC1(ix1, iy1, count_o,saturation);
    }else if ((jpos_arr === "形状詞-一般")||(jpos_arr === "形状詞-タリ")||(jpos_arr === "形状詞-助動詞語幹")) {
      //形状詞
      flowerC2(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamenC1(ix1, iy1, count_o,saturation);

    }else if (jpos_arr === "連体詞"){
      //連体詞
      flowerC3(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamenC2(ix1, iy1, count_o,saturation);
    }else if (jpos_arr === "副詞"){
      //副詞
      flowerC4(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamenC2(ix1, iy1, count_o,saturation);
    }else if (jpos_arr === "助動詞"){
      //助動詞
      leafA(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if((jpos_arr === "接尾辞-名詞的-一般")||(jpos_arr === "接尾辞-名詞的-サ変可能")||(jpos_arr === "接尾辞-名詞的-形状詞可能")||
             (jpos_arr === "接尾辞-名詞的-サ変形状詞可能")||(jpos_arr === "接尾辞-名詞的-副詞可能")||(jpos_arr === "接尾辞-名詞的-助数詞")||
             (jpos_arr === "接尾辞-形状詞的")||(jpos_arr === "接尾辞-動詞的")||(jpos_arr === "接尾辞-形容詞的")){
      //接尾辞
      leafB(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if((jpos_arr === "接頭辞")){
      //接頭辞
      leafC(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if(jpos_arr === "接続詞"){
      //接続詞
      leafD(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr,word);
    }else if((jpos_arr === "助詞-格助詞")||(jpos_arr === "助詞-副助詞")||(jpos_arr === "助詞-係助詞")||
             (jpos_arr === "助詞-接続助詞")||(jpos_arr === "助詞-終助詞")||(jpos_arr === "助詞-準体助詞")){
      //助詞
      leafE(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if((jpos_arr === "名詞-数詞")||(jpos_arr === "記号-一般")||(jpos_arr === "記号-文字")||(jpos_arr === "補助記号-一般")||(jpos_arr === "感動詞-一般")||(jpos_arr === "感動詞-フィラー")||(jpos_arr === "補助記号-読点")||(jpos_arr === "補助記号-句点")||
    (jpos_arr === "補助記号-括弧開")||(jpos_arr === "補助記号-括弧閉")||(jpos_arr === "補助記号-AA-一般")||(jpos_arr === "補助記号-AA-顔文字")){
      //数詞と感動詞と記号と補助句号
      if ((word === "。" )||( word === ".")||(word === "、" )|| (word === ",")) {
        noStroke();
    noFill();}
      flowerA1(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr,word);
      calyx(ix1, iy1,count_o,saturation,word);
    }else{
      //当分は色なしの白い葉っぱ
      leafF(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }
  }
}




function flowerA1(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle,word) {
  console.log(type);
  push();
  //透明度push();
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  if(hue === 361){
    saturation=0;
  }
  strokeWeight(3);
  translate(ox, oy);
  push();
  rotate(135);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  petal(type, 0.7,0,360,lineStyle); 
  pop(); 
  
  pop();
}
function flowerA2(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();
  
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  translate(ox, oy);
  //rotate(random(360));
  petal(type, 0.7,0,360,lineStyle);  
  mizutama1(0,0); 
  pop();
}
function flowerA3(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  translate(ox, oy);
  //rotate(random(360));
  petal(type, 0.7,0,360,lineStyle); 
  tatezima(0,0); 
  pop();
}
function flowerB(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  translate(ox, oy);
  rotate(frameCount*3);
  petal(type, 0.5,24,360,lineStyle);   
  
  pop();
}
function flowerC1(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();
  
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  translate(ox, oy);
  //rotate(frameCount);

  rotate(frameCount*3);
  petal(type, 0.5,24,360,lineStyle); 
  tatezima(0,0);
  pop();
}
function flowerC2(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();
  
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  translate(ox, oy);
  //rotate(frameCount);
  rotate(frameCount*3);
  petal(type, 0.5,24,360,lineStyle); 
  mizutama2(0,0);
  
  pop();
}
function flowerC3(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();
  
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  translate(ox, oy);
  //rotate(random(360));
  petal(type, 0.8,0,360,lineStyle);   
  rotate(45);
  petal(type, 0.8,0,360,lineStyle); 
  tatezima(0,0); 
  
  pop();
}
function flowerC4(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();
  
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  translate(ox, oy);
  
  petal(type, 0.8,0,360,lineStyle);  
  
  rotate(45);
  petal(type, 0.8,0,360,lineStyle); 
  mizutama1(0,0);
  pop();
}
function petal(type,size,a,ang,pattern,lineStyle){
  if(lineStyle===1){
  push();
  var angle = ang/ type.length;
  for(var j = 0; j<type.length; j++){
    rotate(angle);
  
  if(type[j]===1){
  //漢字
  beginShape();
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  curveVertex(-35*size,-45*size-a);
  curveVertex(-20*size,-80*size-a);
  curveVertex(0,-65*size-a);
  curveVertex(20*size,-80*size-a);
  curveVertex(35*size,-45*size-a);
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  endShape();
  continue;
  
  }else if(type[j]===2){
  //ひらがな
  
  beginShape();
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  curveVertex(-35*size,-45*size-a);
  curveVertex(0,-85*size-a);
  curveVertex(35*size,-45*size-a);
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  endShape();

  if(pattern === 1){

  }
  continue;
  
  }else if(type[j]===3){
  //カタカナ
  beginShape();
  vertex(0,0-a);
  vertex(0,0-a);
  vertex(-35*size,-45*size-a);
  vertex(0,-85*size-a);
  vertex(35*size,-45*size-a);
  vertex(0,0-a);
  vertex(0,0-a);
  endShape();
  continue;
  
  }else if(type[j]===4){
  //数字と英語
  beginShape();
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  curveVertex(-24*size,-8*size-a);
  curveVertex(-40*size,-25*size-a);
  curveVertex(-45*size,-47*size-a);
  curveVertex(-32*size,-75*size-a);
  curveVertex(0,-87*size-a);
  curveVertex(32*size,-75*size-a);
  curveVertex(45*size,-47*size-a);
  curveVertex(40*size,-25*size-a);
  curveVertex(24*size,-8*size-a);
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  endShape();
  continue;
  
  }else if(type[j]===5){
  //記号
  beginShape();
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  curveVertex(-35*size,-45*size-a);
  curveVertex(-20*size,-60*size-a);
  curveVertex(0,-85*size-a);
  curveVertex(20*size,-60*size-a);
  curveVertex(35*size,-45*size-a);
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  endShape();
  break;   
  } 
  }
  pop();
}else{
  push();
  var angle = ang/ type.length;
  for(var j = 0; j<type.length; j++){
    rotate(angle);
  
  if(type[j]===1){
  //漢字
  beginShape();
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  curveVertex(-35*size,-45*size-a);
  curveVertex(-20*size,-90*size-a);
  curveVertex(0,-75*size-a);
  curveVertex(20*size,-90*size-a);
  curveVertex(35*size,-45*size-a);
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  endShape();
  continue;
  
  }else if(type[j]===2){
  //ひらがな
  
  beginShape();
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  curveVertex(-35*size,-45*size-a);
  curveVertex(0,-85*size-a);
  curveVertex(35*size,-45*size-a);
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  endShape();

  if(pattern === 1){

  }
  continue;
  
  }else if(type[j]===3){
  //カタカナ
  beginShape();
  vertex(0,0-a);
  vertex(0,0-a);
  vertex(-35*size,-45*size-a);
  vertex(0,-85*size-a);
  vertex(35*size,-45*size-a);
  vertex(0,0-a);
  vertex(0,0-a);
  endShape();
  continue;
  
  }else if(type[j]===4){
  //数字と英語
  beginShape();
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  curveVertex(-24*size,-8*size-a);
  curveVertex(-40*size,-25*size-a);
  curveVertex(-45*size,-47*size-a);
  curveVertex(-32*size,-75*size-a);
  curveVertex(0,-87*size-a);
  curveVertex(32*size,-75*size-a);
  curveVertex(45*size,-47*size-a);
  curveVertex(40*size,-25*size-a);
  curveVertex(24*size,-8*size-a);
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  endShape();
  continue;
  
  }else if(type[j]===5){
  //記号
  beginShape();
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  curveVertex(-35*size,-45*size-a);
  curveVertex(-20*size,-60*size-a);
  curveVertex(0,-85*size-a);
  curveVertex(20*size,-60*size-a);
  curveVertex(35*size,-45*size-a);
  curveVertex(0,0-a);
  curveVertex(0,0-a);
  endShape();
  break;   
  } 
  }
  pop();
}
}

function leafA(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  

  push();
  translate(ox, oy);
  strokeWeight(3);
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  rotate(frameCount*3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  petal(type,0.5,28,135,lineStyle);  
  pop();
}
function leafC(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  

  push();
  translate(ox, oy);
  strokeWeight(3);
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  stroke(hue, saturation, 100, alpha);
  
  fill(hue, saturation, 100, alpha);
  //rotate(random(-90,0));
  push();
  rotate(-90);
  petal(type,0.8,0,135,lineStyle); 
  stroke(hue, 0, 100, alpha);  
  fill(hue, 0, 100, alpha);
  petal(type,0.5,0,135,lineStyle); 
  pop();
  pop();
}
function leafB(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  

  push();
  translate(ox, oy);
  strokeWeight(3);
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  push();
  rotate(-90);
stroke(hue, 0, 100, alpha); 
fill(hue, 0, 100, alpha);
petal(type,0.8,0,135,lineStyle); 
stroke(hue, saturation, 100, alpha);
fill(hue, saturation, 100, alpha);
petal(type,0.5,0,135,lineStyle); 
pop();
pop();
}
function leafD(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle,word) {
  

  push();
  translate(ox, oy);
  strokeWeight(3);
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if ((word === "。" )||( word === ".")||(word === "、" )|| (word === ",")) {
    stroke(0,0,0,0);
    fill(0,0,0,0);}
    push();
    rotate(-90);
  petal(type,0.8,0,135,lineStyle); 
  yoko(0,0);
  pop();
  pop();
}
function leafE(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  

  push();
  translate(ox, oy);
  strokeWeight(3);
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  push();
  rotate(-90);
  petal(type,0.8,0,135,lineStyle); 
  pop();
  
  pop();
}
function leafF(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  

  push();
  translate(ox, oy);
  strokeWeight(3);
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = colorHue(read_arr);
  if(hue === 361){
    saturation=0;
  }
  stroke(hue, saturation, 100, alpha);
  noFill();
  push();
  rotate(-90);
  petal(type,1,0,135,lineStyle); 
  pop(); 
  pop();
}



//おしべ白
function stamenA(ox, oy, count_o) {
  push();
  translate(ox, oy);
  //rotate(random(360));
  strokeWeight(3);
  fill(10, 0, 100, 100);
  stroke(10, 0, 100, 100);
  for (var ang = 0; ang < 360; ang += 360 / count_o) {
    var x = 25 * cos(ang);
    var y = 25 * sin(ang);
    line(0, 0, x, y);
    ellipse(x, y, 10, 10);
  }
  fill(10, 0, 100, 100);
  stroke(10, 0, 100, 80);

  ellipse(0, 0, 20, 20);
  pop();
}

//おしべ黄緑
function stamenB(ox, oy, count_o,saturation) {
  push();
  translate(ox, oy);
 rotate(-frameCount*3);
  strokeWeight(3);
  fill(90, saturation, 100, 100);
  stroke(90, saturation, 100, 100);
  for (var ang = 0; ang < 360; ang += 360 / count_o) {
    var x = 25 * cos(ang);
    var y = 25 * sin(ang);
    line(0, 0, x, y);
    ellipse(x, y, 10, 10);
  }
  

  ellipse(0, 0, 20, 20);
  pop();
}

//おしべ黄色動き
function stamenC1(ox, oy, count_o,saturation) {
  push();
  translate(ox, oy);
  rotate(-frameCount);
  strokeWeight(3);
  fill(60, saturation, 100, 100);
  stroke(60, saturation, 100, 100);
  for (var ang = 0; ang < 360; ang += 360 / count_o) {
    var x = 25 * cos(ang);
    var y = 25 * sin(ang);
    line(0, 0, x, y);
    ellipse(x, y, 10, 10);
  }
  

  ellipse(0, 0, 20, 20);
  pop();
}
//おしべ赤
function stamenC2(ox, oy, count_o,saturation) {
  push();
  translate(ox, oy);
  //rotate(random(360));
  strokeWeight(3);
  fill(350, saturation, 100, 100);
  stroke(350, saturation, 100, 100);
  for (var ang = 0; ang < 360; ang += 360 / count_o) {
    var x = 25 * cos(ang);
    var y = 25 * sin(ang);
    line(0, 0, x, y);
    ellipse(x, y, 10, 10);
  }
  

  ellipse(0, 0, 20, 20);
  pop();
}

//ヘタ
function calyx(ox, oy, count_o,saturation,word) {
  push();
  translate(ox, oy);
  //rotate(random(360));
  let size = 0.3;
  let a = 0;
  noStroke();
  fill(100, saturation, 70, 100);
  if (word === "。" || word === "."||word === "、" || word === ",") {
    noStroke();
    noFill();}

  for (var ang = 0; ang < 360; ang += 360 / count_o) {
    angle = 360/count_o;
    rotate(angle);
    push();
    beginShape();
    curveVertex(0,0-a);
    curveVertex(0,0-a);
    curveVertex(-35*size,-45*size-a);
    curveVertex(0,-85*size-a);
    curveVertex(35*size,-45*size-a);
    curveVertex(0,0-a);
    curveVertex(0,0-a);
    endShape();
    pop();
  }
  ellipse(0, 0, 16, 16);
  pop();
}

//根っこ
function rootA(ox, oy, count_o){
  push();
  translate(ox, oy);
  rotate(55);
  strokeWeight(3);
  fill(10, 0, 100, 100);
  stroke(10, 0, 100, 80);
  strokeCap(ROUND);
  for (var ang = 0; ang < 135; ang += 135 / count_o) {
    var x = 100 * cos(ang);
    var y = 100 * sin(ang);
    line(0, 0, x, y);
    ellipse(x, y, 10, 10);
    strokeWeight(1.7);
    line(x, y, x*1.1, y*1.1);
  }
  pop();
}
function rootB(ox, oy, count_o,saturation){
  push();
  translate(ox, oy);
  rotate(55);
  strokeWeight(3);
  fill(90, saturation, 100, 100);
  stroke(90, saturation, 100, 100);
  strokeCap(ROUND);
  for (var ang = 0; ang < 135; ang += 135 / count_o) {
    var x = 200 * cos(ang);
    var y = 200 * sin(ang);
    drawingContext.setLineDash([5,20]);
    line(0, 0, x, y);
  }
  pop();
}
function rootC(ox, oy,count_o,saturation) {
  push();
  translate(ox, oy);
  rotate(55);
  strokeWeight(3);
  fill(60,saturation, 100, 100);
  stroke(60,saturation, 100, 100);
  strokeCap(ROUND);
  for (var ang = 0; ang < 135; ang += 135 / count_o) {
    var x = 200 * cos(ang);
    var y = 200 * sin(ang);
    line(0, 0, x, y);
  }
  pop();
}
function rootD(ox, oy,count_o,saturation) {
  push();
  translate(ox, oy);
  rotate(55);
  strokeWeight(3);
  fill(350,saturation, 100, 100);
  stroke(350,saturation, 100, 100);
  strokeCap(ROUND);
  for (var ang = 0; ang < 135; ang += 135 / count_o) {
    var x = 200 * cos(ang);
    var y = 200 * sin(ang);
    line(0, 0, x, y);
  }
  pop();
}
function rootE(ox, oy, count_o){
  push();
  translate(ox, oy);
  rotate(80);
  strokeWeight(3);
  fill(10, 0, 100, 100);
  stroke(10, 0, 100, 80);
  strokeCap(ROUND);
  for (var ang = 0; ang < 20; ang += 20 / count_o) {
    var x = 200 * cos(ang);
    var y = 200 * sin(ang);
    line(0, 0, x, y);
  }
  pop();
}


//揺らぎのある線
function waveLine(x1,y1,x2,y2){
  strokeCap(ROUND);
  let steps = 40;
let xStep = (x2 - x1) / steps;
let yStep = (y2 - y1) / steps;
beginShape();
vertex(x1, y1);
for (let i = 1; i < steps; i++) {
let noiseVal = noise(x1/50, y1/50);
let xOff = map(noiseVal, 0, 1, -20, 18);
let yOff = map(noiseVal, 0, 1, -5, 5);
vertex(x1 + xOff, y1 + yOff);
x1 += xStep;
y1 += yStep;
}
vertex(x2, y2);
endShape();
}
//くるくるの線
function spiralLine(x1, y1, x2, y2) {
  push();
  beginShape();
  angleMode(RADIANS);
  for(let theta = 0; theta < dist(x1,y1,x2,y2)/4; theta +=1) {
      let x = map(theta, 0, dist(x1,y1,x2,y2)/4, x1, x2) + 12*cos(0.8*theta);
      let y = map(theta, 0, dist(x1,y1,x2,y2)/4, y1, y2)+ 12*sin(0.8*theta);
      curveVertex(x, y);
  }
  endShape();
  pop();
}

//花の柄の関数

function mizutama1(ox,oy){
  push();
  translate(ox, oy);
  strokeWeight(1);
  blendMode(OVERLAY);
  fill(10, 0, 100, 80);
  stroke(10, 0, 100, 100);
  for (var ang = 0; ang < 360; ang += 360 / 8) {
    var x = 20 * cos(ang);
    var y = 20 * sin(ang);
    ellipse(x*1.5, y*1.5, 12, 12);
    ellipse(x*2.3, y*2.3, 8, 8);
  }
  
  pop();
} 
function mizutama2(ox,oy){
  push();
  translate(ox, oy);
  strokeWeight(1);
  blendMode(OVERLAY);
  fill(0, 0, 100, 100);
  stroke(0, 0, 100, 100);
  for (var ang = 0; ang < 360; ang += 360 / 14) {
    var x = 30 * cos(ang);
    var y = 30 * sin(ang);
    ellipse(x*1.4, y*1.4, 12, 12);
    ellipse(x*2, y*2, 8, 8);
  }
  
  pop();
} 

function tatezima(ox,oy){
  push();
  translate(ox, oy);
  blendMode(OVERLAY);
  strokeWeight(1.7);
  strokeCap(ROUND);
  fill(10, 0, 100, 50);
  stroke(10, 0, 100, 50);
  for (var ang = 0; ang < 360; ang += 360 / 30) {
    var x = 23 * cos(ang);
    var y = 23 * sin(ang);
    line(x, y, 3*x, 3*y);
    line(1.5*x, 1.5*y,3.2*x, 3.2*y);
    
  }
  
  pop();
} 

function yoko(ox,oy){
  push();
  blendMode(OVERLAY);
  translate(ox, oy);
  rotate(0);
  strokeWeight(3);
  fill(10, 0, 100, 80);
  stroke(10, 0, 100, 100);
  for (var ang = 0; ang < 180; ang +=2) {
    var x = 10 * cos(ang);
    var y = 10 * sin(ang);
    point(x,y);
    point(x*2,y*2);
    point(x*3,y*3);
    point(x*4,y*4);
    point(x*5,y*5);
   
    
  }
  
  pop();
} 

//画像保存
$('#save').on('click',function(){
  let text;
  for (let i = 0; i < word_arr.length; i++){
    text += word_arr[i];
  }
  saveCanvas(canvas, text, 'png');
  
 });
 textalpha = 0;
 //テキスト表示非表示
 $('#textView').on('click',function(){
  
  if(textalpha===0){
   textalpha+=100;
   console.log(textalpha);
     }else if(textalpha ===100){
       textalpha=textalpha-100;
       console.log(textalpha);
       
     }
  
 });
