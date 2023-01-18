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
const char_list = [];



//植物にするボタンを押した時の処理
$('button').on('click', function(){
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
            
            draw(jarr,word_arr,id_arr,head_arr,pos_arr,read_arr,jpos_arr);
            
  
            
            
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
  
  background(0);

  
  
  //ここから植物の描画処理
  

}

function draw(jarr,word_arr,id_arr,head_arr, pos_arr,read_arr,jpos_arr,stemWeight_arr) {
  scale(1);
  scale(windowWidth / (id_arr.length * windowWidth * 0.2));
  console.log(id_arr.length);
//ROOTの取り出し
    for (var a in jarr) {
      if (jarr[a].dep === "ROOT") {
        root = jarr[a].head;
        delete jarr[a].head;
        console.log(jarr);
      }
    }
    //植物の彩度
  let saturation;
  const tense = jarr.some((t) => (t.jpos === "助動詞" && t.word==="た" && t.head === root) ||(t.jpos === "助動詞" && t.word==="だ" && t.head === root));
  if(tense === true){
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
      
      console.log(wtype_arr);

      console.log(jpos_arr);
    
      for (var i = 0; i < id_arr.length; i++) {
        for (var j = 0; j < head_arr.length; j++) {
          if (id_arr[j] === head_arr[i]) {
            
    
stemWeight_arr = stemWeight(jpos_arr);

stem(id_arr[i], id_arr[j], head_arr[i], head_arr[j], word_arr[i],stemWeight_arr[i],jpos_arr[i],saturation,lineStyle);
         
          }
        }
      }
     
      for (var a = 0; a < id_arr.length; a++) {
        for (var b = 0; b < head_arr.length; b++) {
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

              
            );
            
          }
        }
      }
//noLoop();
//全体の色
let filterPink = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="ピンク" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ピンク色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ぴんく" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ぴんく色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="桃色"||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="もも色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="桃" ) ));
if(filterPink === true){
  push();
  noStroke();
  blendMode(DODGE);
  fill(323,100,100,100);
  rectMode(CORNER);
  rect(0,0,windowWidth,windowHeight);
  
  pop();
}
let filterMurasaki = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="紫" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="むらさき" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ムラサキ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="紫色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="むらさき色"||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ムラサキ色" )));
if(filterMurasaki === true){
  push();
  noStroke();
  blendMode(DODGE);
  fill(275,100,100,100);
  rectMode(CORNER);
  rect(0,0,windowWidth,windowHeight);
  
  pop();
}
let filterGreen = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="緑" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="翠" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ミドリ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="みどり" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="緑色"||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="翠色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ミドリ色" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="みどり色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="グリーン" )));
if(filterGreen === true){
  push();
  noStroke();
  blendMode(DODGE);
  fill(95,100,100,100);
  rectMode(CORNER);
  rect(0,0,windowWidth,windowHeight);
  
  pop();
}
let filterOrenge = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="オレンジ" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="橙" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="だいだい" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="オレンジ色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="橙色"||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="だいだい色" ) ));
if(filterOrenge === true){
  push();
  noStroke();
  blendMode(DODGE);
  fill(38,100,100,100);
  rectMode(CORNER);
  rect(0,0,windowWidth,windowHeight);
  
  pop();
}
let filterBlue = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="青" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="蒼" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="碧" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="あお" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="アオ"||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="青色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="蒼色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="碧色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="あお色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="アオ色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="ブルー" )||
(f.jpos === "形容詞-一般" && f.lemma==="青い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="蒼い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="碧い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="あおい" ) ||(f.jpos === "形容詞-一般" && f.lemma==="アオい" )));
if(filterBlue === true){
  push();
  noStroke();
  blendMode(DODGE);
  fill(232,100,100,100);
  rectMode(CORNER);
  rect(0,0,windowWidth,windowHeight);
  
  pop();
}
let filterYellow = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="黄" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="黄色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="きいろ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="キイロ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="イエロー" )||
(f.jpos === "形容詞-一般" && f.lemma==="黄色い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="きいろい" ) ||(f.jpos === "形容詞-一般" && f.lemma==="キイロイ" ));
if(filterYellow === true){
  push();
  noStroke();
  blendMode(DODGE);
  fill(59,100,100,100);
  rectMode(CORNER);
  rect(0,0,windowWidth,windowHeight);
  
  pop();
}
let filterRed = jarr.some((f) => (f.jpos === "名詞-普通名詞-一般" && f.lemma==="赤" ) ||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="紅" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="緋" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="朱" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="あか" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="アカ" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="あか" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="レッド" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="赤色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="紅色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="朱色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="緋色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="あか色" )||(f.jpos === "名詞-普通名詞-一般" && f.lemma==="アカ色" )||
(f.jpos === "形容詞-一般" && f.lemma==="赤い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="緋い" ) ||(f.jpos === "形容詞-一般" && f.lemma==="紅い" )||(f.jpos === "形容詞-一般" && f.lemma==="朱い" )||(f.jpos === "形容詞-一般" && f.lemma==="あかい" )||(f.jpos === "形容詞-一般" && f.lemma==="アカイ" ));
if(filterRed === true){
  push();
  noStroke();
  blendMode(DODGE);
  fill(0,100,100,100);
  rectMode(CORNER);
  rect(0,0,windowWidth,windowHeight);
  
  pop();
}

}
//母音
function vowelLeaf(words){
  let total = 0;
  const vowelA = "アァカサタナハマラヤャワガザダバパ";
  const vowelI = "イィキシチニヒミリギジヂビピ";
  const vowelU = "ウゥクスツヌフムルユュグズヅブプ";
  const vowelE = "エェケセテネヘメレゲゼデベペ";
  const vowelO = "オォコソトノホモヨョロヲゴゾドボポ";
  const vowelN = "ン";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // 単語の中に該当する母音があったら数値を足していく
    for (let j = 0; j < word.length; j++) {
      if (vowelI.indexOf(word[j]) !== -1) {
        total  += 60
      }else if (vowelA.indexOf(word[j]) !== -1) {
        total  += 105
      }else if(vowelE.indexOf(word[j]) !== -1) {
        total  += 150
      }else if(vowelU.indexOf(word[j]) !== -1) {
        total  += 195
      }else if(vowelN.indexOf(word[j]) !== -1) {
        total  += 210
      }else if(vowelO.indexOf(word[j]) !== -1) {
        total  += 240
      }
    }
    let result = total / word.length;
  console.log(result);
  return result;
  }
  
}
function vowelFlower(words){
  let total = 0;
  const vowelA = "アァカサタナハマヤラャワガザダバパ";
  const vowelI = "イィキシチニヒミリギジヂビピ";
  const vowelU = "ウゥクスツヌフムルユュグズヅブプ";
  const vowelE = "エェケセテネヘメレゲゼデベペ";
  const vowelO = "オォコソトノホモヨョロヲゴゾドボポ";
  const vowelN = "ン";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // 単語の中に該当する母音があったら数値を足していく
    for (let j = 0; j < word.length; j++) {
      if (vowelI.indexOf(word[j]) !== -1) {
        total  += 60
      }else if (vowelA.indexOf(word[j]) !== -1) {
        total  += 15
      }else if(vowelE.indexOf(word[j]) !== -1) {
        total  += 330
      }else if(vowelU.indexOf(word[j]) !== -1) {
        total  += 295
      }else if(vowelN.indexOf(word[j]) !== -1) {
        total  += 280
      }else if(vowelO.indexOf(word[j]) !== -1) {
        total  += 240
      }
    }
    let result = total / word.length;
  console.log(result);
  return result;
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
        
        return 90;
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

function stem(x1, y1, x2, y2, word,stemWeight,jpos_arr,saturation,lineStyle) {
  
  var ix1 = windowWidth / 7 + x1 * 50;
  var ix2 = windowWidth / 7 + x2 * 50;
  var iy1 = windowHeight / 7 + y1 * 50;
  var iy2 = windowHeight / 7 + y2 * 50;

  
  
  strokeWeight(stemWeight);
  stroke(100, saturation, 60, 100);
  noFill();
  if ((jpos_arr === "補助記号-読点")||(jpos_arr === "補助記号-句点")) {
    stroke(0,0,0,0);
    fill(0,0,0,0);
}
if(lineStyle===1){
  if (x1 === root) {
    push();
    stroke(255,100);
    strokeWeight(1);
    text(word, ix1-100, iy1-100);
    pop();
    //line(ix1, iy1, ix2, iy2);
  } else if (y1 === x2 && x2 === root) {
    push();
    stroke(255,100);
    strokeWeight(1);
    text(word, ix1, iy1 );
    pop();
    line(ix1, iy1, ix2, iy2 + 100);
  } else if (y1 === x2 && x2 !== root) {
    push();
    stroke(255,100);
    strokeWeight(1);
    text(word, ix1, iy1 );
    pop();
    line(ix1, iy1, ix2, iy2);
  }
}else if(lineStyle===2){
  if (x1 === root) {
    push();
    stroke(255,100);
    strokeWeight(1);
    text(word, ix1, iy1 );
    pop();
    waveLine(ix1, iy1, ix2, iy2);
  } else if (y1 === x2 && x2 === root) {
    push();
    stroke(255,100);
    strokeWeight(1);
    text(word, ix1+30, iy1 );
    pop();
    waveLine(ix1, iy1, ix2, iy2 + 100);
  } else if (y1 === x2 && x2 !== root) {
    push();
    stroke(255,100);
    strokeWeight(1);
    text(word, ix1, iy1+100 );
    pop();
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



function flower_position(x1, y1, x2, y2, count_p, count_o, part, wtype_arr, wcount_arr,jpos_arr,saturation,read_arr) {
  var ix1 = windowWidth / 7 + x1 * 50;
  var ix2 = windowWidth / 7 + x2 * 50;
  var iy1 = windowHeight / 7 + y1 * 50;
  var iy2 = windowHeight / 7 + y2 * 50;


  if (x1 === root) {
    console.log(root);

    if ((jpos_arr === "名詞-普通名詞-一般")||(jpos_arr === "名詞-普通名詞-サ変可能")||(jpos_arr === "名詞-普通名詞-形状詞可能")||(jpos_arr === "名詞-普通名詞-サ変形状詞可能")||
    (jpos_arr === "名詞-普通名詞-副詞可能")||(jpos_arr === "名詞-普通名詞-助数詞可能")||(jpos_arr === "名詞-助動詞語幹")) {
      //名詞
      rootA(ix1, iy1 + 100, count_o);
    } else if ((jpos_arr === "名詞-固有名詞-一般")||(jpos_arr === "名詞-固有名詞-人名-一般")||(jpos_arr === "名詞-固有名詞-人名-姓")||
               (jpos_arr === "名詞-固有名詞-人名-名")||(jpos_arr === "名詞-固有名詞-地名-一般")||(jpos_arr === "名詞-固有名詞-地名-国")) {
      //固有名詞
      rootA(ix1, iy1 + 100, count_o);
    }else if (jpos_arr === "代名詞") {
      //代名詞
      rootA(ix1, iy1 + 100, count_o);
    } else if ((jpos_arr === "動詞-一般")||(jpos_arr === "動詞-非自立可能")) {
      //動詞
      rootB(ix1, iy1 + 100, count_o);
    } else if ((jpos_arr === "形容詞-一般")||(jpos_arr === "形容詞-非自立可能")) {
      //形容詞
      rootC(ix1, iy1 + 100, count_o);
    }else if ((jpos_arr === "形状詞-一般")||(jpos_arr === "形状詞-タリ")||(jpos_arr === "形状詞-助動詞語幹")) {
      //形状詞
      rootC(ix1, iy1 + 100, count_o);
    }else if (jpos_arr === "連体詞"){
      //連体詞
      rootC(ix1, iy1 + 100, count_o);
    }else if (jpos_arr === "副詞"){
      //副詞
      rootC(ix1, iy1 + 100, count_o);
    }else if (jpos_arr === "助動詞"){
      //助動詞
      rootD(ix1, iy1 + 100, count_o);
    }else if((jpos_arr === "接尾辞-名詞的-一般")||(jpos_arr === "接尾辞-名詞的-サ変可能")||(jpos_arr === "接尾辞-名詞的-形状詞可能")||
             (jpos_arr === "接尾辞-名詞的-サ変形状詞可能")||(jpos_arr === "接尾辞-名詞的-副詞可能")||(jpos_arr === "接尾辞-名詞的-助数詞")||
             (jpos_arr === "接尾辞-形状詞的")||(jpos_arr === "接尾辞-動詞的")||(jpos_arr === "接尾辞-形容詞的")){
      //接尾辞
      rootD(ix1, iy1 + 100, count_o);
    }else if((jpos_arr === "接頭辞")){
      //接頭辞
      rootD(ix1, iy1 + 100, count_o);
    }else if(jpos_arr === "接続詞"){
      //接続詞
      rootD(ix1, iy1 + 100, count_o);
    }else if((jpos_arr === "助詞-格助詞")||(jpos_arr === "助詞-副助詞")||(jpos_arr === "助詞-係助詞")||
             (jpos_arr === "助詞-接続助詞")||(jpos_arr === "助詞-終助詞")||(jpos_arr === "助詞-準体助詞")){
      //助詞
      rootD(ix1, iy1 + 100, count_o);
    }else if((jpos_arr === "名詞-数詞")||(jpos_arr === "記号-一般")||(jpos_arr === "記号-文字")||(jpos_arr === "補助記号-一般")||
    (jpos_arr === "補助記号-括弧開")||(jpos_arr === "補助記号-括弧閉")||(jpos_arr === "補助記号-ＡＡ-一般")||(jpos_arr === "補助記号-ＡＡ-顔文字")){
      //数詞と感動詞と記号と補助句号
      rootD(ix1, iy1 + 100, count_o);
    }else{
      //当分は色なしの白い葉っぱ
      rootD(ix1, iy1 + 100, count_o);
    }
  } else if (y1 === x2 && x2 === root) {
    if ((jpos_arr === "名詞-普通名詞-一般")||(jpos_arr === "名詞-普通名詞-サ変可能")||(jpos_arr === "名詞-普通名詞-形状詞可能")||(jpos_arr === "名詞-普通名詞-サ変形状詞可能")||
    (jpos_arr === "名詞-普通名詞-副詞可能")||(jpos_arr === "名詞-普通名詞-助数詞可能")||(jpos_arr === "名詞-助動詞語幹")) {
      //名詞
      flowerA1(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1 , count_o);
    } else if ((jpos_arr === "名詞-固有名詞-一般")||(jpos_arr === "名詞-固有名詞-人名-一般")||(jpos_arr === "名詞-固有名詞-人名-姓")||
               (jpos_arr === "名詞-固有名詞-人名-名")||(jpos_arr === "名詞-固有名詞-地名-一般")||(jpos_arr === "名詞-固有名詞-地名-国")) {
      //固有名詞
      flowerA2(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1 , count_o);
    }else if (jpos_arr === "代名詞") {
      //代名詞
      flowerA3(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);
    
    
    } else if ((jpos_arr === "動詞-一般")||(jpos_arr === "動詞-非自立可能")) {
      //動詞
      flowerB(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);
      
    } else if ((jpos_arr === "形容詞-一般")||(jpos_arr === "形容詞-非自立可能")) {
      //形容詞
      flowerC1(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);
    }else if ((jpos_arr === "形状詞-一般")||(jpos_arr === "形状詞-タリ")||(jpos_arr === "形状詞-助動詞語幹")) {
      //形状詞
      flowerC2(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);

    }else if (jpos_arr === "連体詞"){
      //連体詞
      flowerC3(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);
    }else if (jpos_arr === "副詞"){
      //副詞
      flowerC4(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);
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
      leafD(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if((jpos_arr === "助詞-格助詞")||(jpos_arr === "助詞-副助詞")||(jpos_arr === "助詞-係助詞")||
             (jpos_arr === "助詞-接続助詞")||(jpos_arr === "助詞-終助詞")||(jpos_arr === "助詞-準体助詞")){
      //助詞
      leafE(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if((jpos_arr === "名詞-数詞")||(jpos_arr === "記号-一般")||(jpos_arr === "記号-文字")||(jpos_arr === "補助記号-一般")||
    (jpos_arr === "補助記号-括弧開")||(jpos_arr === "補助記号-括弧閉")||(jpos_arr === "補助記号-ＡＡ-一般")||(jpos_arr === "補助記号-ＡＡ-顔文字")){
      //数詞と感動詞と記号と補助句号
      flowerA1(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else{
      //当分は色なしの白い葉っぱ
      leafF(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }
  } else if (y1 === x2 && x2 !== root) {
    if ((jpos_arr === "名詞-普通名詞-一般")||(jpos_arr === "名詞-普通名詞-サ変可能")||(jpos_arr === "名詞-普通名詞-形状詞可能")||(jpos_arr === "名詞-普通名詞-サ変形状詞可能")||
    (jpos_arr === "名詞-普通名詞-副詞可能")||(jpos_arr === "名詞-普通名詞-助数詞可能")||(jpos_arr === "名詞-助動詞語幹")) {
      //名詞
      flowerA1(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1 , count_o);
    } else if ((jpos_arr === "名詞-固有名詞-一般")||(jpos_arr === "名詞-固有名詞-人名-一般")||(jpos_arr === "名詞-固有名詞-人名-姓")||
               (jpos_arr === "名詞-固有名詞-人名-名")||(jpos_arr === "名詞-固有名詞-地名-一般")||(jpos_arr === "名詞-固有名詞-地名-国")) {
      //固有名詞
      flowerA2(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1 , count_o);
    }else if (jpos_arr === "代名詞") {
      //代名詞
      flowerA3(ix1, iy1 , wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);
    
    
    } else if ((jpos_arr === "動詞-一般")||(jpos_arr === "動詞-非自立可能")) {
      //動詞
      flowerB(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);
      
    } else if ((jpos_arr === "形容詞-一般")||(jpos_arr === "形容詞-非自立可能")) {
      //形容詞
      flowerC1(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);
    }else if ((jpos_arr === "形状詞-一般")||(jpos_arr === "形状詞-タリ")||(jpos_arr === "形状詞-助動詞語幹")) {
      //形状詞
      flowerC2(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);

    }else if (jpos_arr === "連体詞"){
      //連体詞
      flowerC3(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);
    }else if (jpos_arr === "副詞"){
      //副詞
      flowerC4(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
      stamen(ix1, iy1, count_o);
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
      leafD(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if((jpos_arr === "助詞-格助詞")||(jpos_arr === "助詞-副助詞")||(jpos_arr === "助詞-係助詞")||
             (jpos_arr === "助詞-接続助詞")||(jpos_arr === "助詞-終助詞")||(jpos_arr === "助詞-準体助詞")){
      //助詞
      leafE(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else if((jpos_arr === "名詞-数詞")||(jpos_arr === "記号-一般")||(jpos_arr === "記号-文字")||(jpos_arr === "補助記号-一般")||
    (jpos_arr === "補助記号-括弧開")||(jpos_arr === "補助記号-括弧閉")||(jpos_arr === "補助記号-ＡＡ-一般")||(jpos_arr === "補助記号-ＡＡ-顔文字")){
      //数詞と感動詞と記号と補助句号
      flowerA1(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }else{
      //当分は色なしの白い葉っぱ
      leafF(ix1, iy1, wtype_arr,jpos_arr,saturation,read_arr);
    }
  }
}




function flowerA1(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();

  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelFlower(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if (jpos_arr === "補助記号-句点") {
    stroke(0,0,0,0);
    noFill();
}

  translate(ox, oy);
  petal(type, 0.4,0,360,lineStyle);  
  
  pop();
}
function flowerA2(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();

  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelFlower(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if (jpos_arr === "補助記号-句点") {
    stroke(0,0,0,0);
    noFill();
}

  translate(ox, oy);
  petal(type, 0.4,0,360,lineStyle);  
  tatezima(0,0);
  pop();
}
function flowerA3(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();

  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelFlower(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if (jpos_arr === "補助記号-句点") {
    stroke(0,0,0,0);
    noFill();
}

  translate(ox, oy);
  petal(type, 0.4,0,360,lineStyle);  
  mizutama1(0,0); 
  pop();
}
function flowerB(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();

  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelFlower(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if (jpos_arr === "補助記号-句点") {
    stroke(0,0,0,0);
    noFill();
}

  translate(ox, oy);
  petal(type, 0.4,17,360,lineStyle);   
  
  pop();
}
function flowerC1(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();

  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelFlower(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if (jpos_arr === "補助記号-句点") {
    stroke(0,0,0,0);
    noFill();
}
  translate(ox, oy);

  petal(type, 0.4,0,360,lineStyle);  
  rotate(30);
  petal(type, 0.4,0,360,lineStyle); 
  tatezima(0,0);
  pop();
}
function flowerC2(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();

  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelFlower(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if (jpos_arr === "補助記号-句点") {
    stroke(0,0,0,0);
    noFill();
}

  translate(ox, oy);
  petal(type, 0.4,0,360,lineStyle);  
  rotate(30);
  petal(type, 0.4,0,360,lineStyle);  
  
  pop();
}
function flowerC3(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();

  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelFlower(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if (jpos_arr === "補助記号-句点") {
    stroke(0,0,0,0);
    noFill();
}

  translate(ox, oy);
  petal(type, 0.4,0,360,lineStyle);   
  rotate(30);
  petal(type, 0.4,0,360,lineStyle); 
  mizutama1(0,0); 
  pop();
}
function flowerC4(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  console.log(type);
  push();

  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelFlower(read_arr);
  strokeWeight(3);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if (jpos_arr === "補助記号-句点") {
    stroke(0,0,0,0);
    noFill();
}

  translate(ox, oy);
  petal(type, 0.4,17,360,lineStyle);  
  
  rotate(30);
  petal(type, 0.4,17,360,lineStyle); 
  mizutama2(0,0);
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
  let hue = vowelLeaf(read_arr);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if ((jpos_arr === "補助記号-読点")||(jpos_arr === "補助記号-句点")) {
    stroke(0,0,0,0);
    noFill();
}
  
  petal(type,0.4,17,135,lineStyle);  
  pop();
}
function leafB(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  

  push();
  translate(ox, oy);
  strokeWeight(3);
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelLeaf(read_arr);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);

  if ((jpos_arr === "補助記号-読点")||(jpos_arr === "補助記号-句点")) {
    stroke(0,0,0,0);
    noFill();
}
  
  petal(type,0.4,0,135,lineStyle);  
  sankaku1(ox,oy);
  pop();
}
function leafC(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  

  push();
  translate(ox, oy);
  strokeWeight(3);
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelLeaf(read_arr);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if ((jpos_arr === "補助記号-読点")||(jpos_arr === "補助記号-句点")) {
    stroke(0,0,0,0);
    noFill();
}

petal(type,0.4,0,135,lineStyle);  
sankaku2(0,0);
pop();
}
function leafD(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  

  push();
  translate(ox, oy);
  strokeWeight(3);
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelLeaf(read_arr);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if ((jpos_arr === "補助記号-読点")||(jpos_arr === "補助記号-句点")) {
    stroke(0,0,0,0);
    noFill();
}
  
  
  petal(type,0.4,0,135,lineStyle); 
  yoko(0,0);
  pop();
}
function leafE(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  

  push();
  translate(ox, oy);
  strokeWeight(3);
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelLeaf(read_arr);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if ((jpos_arr === "補助記号-読点")||(jpos_arr === "補助記号-句点")) {
    stroke(0,0,0,0);
    noFill();
}
  
  petal(type,0.4,0,135,lineStyle);  
  pop();
}
function leafF(ox, oy, type,jpos_arr,saturation,read_arr,lineStyle) {
  

  push();
  translate(ox, oy);
  strokeWeight(3);
  //透明度
  let alpha = Dakuon(read_arr);
  let hue = vowelLeaf(read_arr);
  stroke(hue, saturation, 100, alpha);
  fill(hue, saturation, 100, alpha);
  if ((jpos_arr === "補助記号-読点")||(jpos_arr === "補助記号-句点")) {
    stroke(0,0,0,0);
    noFill();
}
  petal(type,0.4,0,135,lineStyle);  
  pop();
}



//おしべとめしべ
function stamen(ox, oy, count_o) {
  //おしべ
  push();
  translate(ox, oy);
  strokeWeight(1);
  fill(10, 0, 100, 100);
  stroke(10, 0, 100, 80);
  for (var ang = 0; ang < 360; ang += 360 / count_o) {
    var x = 15 * cos(ang);
    var y = 15 * sin(ang);
    line(0, 0, x, y);
    ellipse(x, y, 5, 5);
  }
  fill(10, 0, 100, 100);
  stroke(10, 0, 100, 80);

  ellipse(0, 0, 12, 12);
  pop();
}

//根っこ
function rootA(ox, oy, count_o){
  push();
  translate(ox, oy);
  rotate(45);
  strokeWeight(3);
  fill(10, 0, 100, 100);
  stroke(10, 0, 100, 80);
  strokeCap(ROUND);
  for (var ang = 0; ang < 135; ang += 135 / count_o) {
    var x = 65 * cos(ang);
    var y = 65 * sin(ang);
    line(0, 0, x, y);
    ellipse(x, y, 10, 10);
  }
  pop();
}
function rootB(ox, oy, count_o){
  push();
  translate(ox, oy);
  rotate(45);
  strokeWeight(3);
  fill(10, 0, 100, 100);
  stroke(10, 0, 100, 80);
  strokeCap(ROUND);
  for (var ang = 0; ang < 135; ang += 135 / count_o) {
    var x = 65 * cos(ang);
    var y = 65 * sin(ang);
    drawingContext.setLineDash([10,10]);
    line(0, 0, x, y);
  }
  pop();
}
function rootC(ox, oy,count_o) {
  push();
  translate(ox, oy);
  rotate(45);
  strokeWeight(3);
  fill(10, 0, 100, 100);
  stroke(10, 0, 100, 80);
  strokeCap(ROUND);
  for (var ang = 0; ang < 135; ang += 135 / count_o) {
    var x = 65 * cos(ang);
    var y = 65 * sin(ang);
    line(0, 0, x, y);
  }
}
function rootD(ox, oy, count_o){
  push();
  translate(ox, oy);
  rotate(45);
  strokeWeight(3);
  fill(10, 0, 100, 100);
  stroke(10, 0, 100, 80);
  strokeCap(ROUND);
  for (var ang = 0; ang < 135; ang += 135 / count_o) {
    var x = 65 * cos(ang);
    var y = 65 * sin(ang);
    line(0, 0, x, y);
  }
  pop();
}


//揺らぎのある線
function waveLine(x1,y1,x2,y2){
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

//花の柄の関数

function mizutama1(ox,oy){
  push();
  translate(ox, oy);
  strokeWeight(1);
  blendMode(OVERLAY);
  fill(10, 0, 100, 80);
  stroke(10, 0, 100, 100);
  for (var ang = 0; ang < 360; ang += 360 / 10) {
    var x = 20 * cos(ang);
    var y = 20 * sin(ang);
    ellipse(x, y, 7, 7);
    ellipse(x*1.6, y*1.6, 5, 5);
  }
  
  pop();
} 
function mizutama2(ox,oy){
  push();
  translate(ox, oy);
  strokeWeight(1);
  blendMode(OVERLAY);
  fill(10, 0, 100, 80);
  stroke(10, 0, 100, 100);
  for (var ang = 0; ang < 360; ang += 360 / 10) {
    var x = 30 * cos(ang);
    var y = 30 * sin(ang);
    ellipse(x, y, 10, 10);
    ellipse(x*1.6, y*1.6, 7, 7);
  }
  
  pop();
} 

function tatezima(ox,oy){
  push();
  translate(ox, oy);
  blendMode(OVERLAY);
  strokeWeight(1.5);
  strokeCap(ROUND);
  fill(10, 0, 100, 80);
  stroke(10, 0, 100, 100);
  for (var ang = 0; ang < 360; ang += 360 / 20) {
    var x = 23 * cos(ang);
    var y = 23 * sin(ang);
    line(x, y, 1.4*x, 1.4*y);
    
  }
  
  pop();
} 
function sankaku1(ox,oy){
  push();
  translate(ox, oy);
  rotate(-75);
  strokeWeight(1);
  blendMode(OVERLAY);
  fill(10, 0, 100, 80);
  stroke(10, 0, 100, 100);
  for (let i = 0; i < 100; i+=20) {
    
    push();
    let x = 20 * cos(i);
    let y = 20 * sin(i);
    rotate(i);
    beginShape();
    vertex(-4+x,0+y);
    vertex(0+x,8+y);
    vertex(4+x,0+y);
    endShape(CLOSE);
    pop();
  }
  
  pop();
} 
function sankaku2(ox,oy){
  push();
  translate(ox, oy);
  rotate(-75);
  strokeWeight(1);
  blendMode(OVERLAY);
  fill(10, 0, 0, 80);
  stroke(10, 0, 0, 100);
  for (let i = 0; i < 100; i+=20) {
    
    push();
    let x = 20 * cos(i);
    let y = 20 * sin(i);
    rotate(i);
    beginShape();
    vertex(-4+x,0+y);
    vertex(0+x,8+y);
    vertex(4+x,0+y);
    endShape(CLOSE);
    pop();
  }
  
  pop();
} 
function yoko(ox,oy){
  push();
  blendMode(OVERLAY);
  translate(ox, oy);
  rotate(-75);
  strokeWeight(1);
  fill(10, 0, 100, 80);
  stroke(10, 0, 100, 100);
  for (var ang = 0; ang < 180; ang +=2) {
    var x = 10 * cos(ang);
    var y = 10 * sin(ang);
    point(x,y);
    point(x*2,y*2);
    point(x*3,y*3);
   
    
  }
  
  pop();
} 
