//取得所需DOM元素
var inputHeight = document.querySelector('.height');
var inputWeight = document.querySelector('.weight');
var calcuBtn = document.querySelector('.calculate');
var clrBtn = document.querySelector('.clearall');
var list = document.querySelector('.list');
var showAvg = document.querySelector('.showavg');
//先宣告空陣列，等計算後新增到此陣列
var personalBmiData = [];

//定義BMI計算結果區間
var BmiInterval = {
    "overThin":{
        class:"blue",
        nameStatus:"體重過輕"
      },
      "normal":{
        class:"green",
        nameStatus: "正常"
      },
      "warning":{
        class:"orange",
        nameStatus: "過重"
      },
      "danger":{
        class:"red",
        nameStatus: "危險"
      }
}

//計算BMI值並新增相關資料到陣列，畫面更新
function calculateBMI(){
    let height = inputHeight.value;
    let weight = inputWeight.value;
    //取小數點後2位，其餘無條件捨去
    let bmi = Math.floor(weight / (Math.pow(height/100, 2))*100)/100;
    
    if(height == '' || weight ==''){
        alert('請輸入數字資料'); //防止輸入空白欄位
    }else if(height > 300 || weight > 800){
        alert('請勿輸入不合邏輯的數字'); //防止輸入不合邏輯破表的數字
    }else if(height <= 0 || weight <= 0){
        alert('請勿輸入小於或等於 0 的數字'); //防止輸入負數
    }else{
        //存放結果的物件
        let bmiResult = {
            Height: Number(height),
            Weight: Number(weight),
            Bmi: bmi,
            Status: ''
        }
        //判斷BMI計算結果區間並賦予Status值存到物件
        if(bmi < 18.5){
            bmiResult.Status = 'overThin';
        }else if(bmi < 24 && bmi >= 18.5){
            bmiResult.Status = 'normal';
        }else if(bmi < 35 && bmi >= 24){
            bmiResult.Status = 'warning';
        }else{
            bmiResult.Status = 'danger';
        }

        //將物件存放到personalBmiData陣列
        personalBmiData.push(bmiResult);
        //console.log(personalBmiData); //查看陣列內儲存幾筆物件
        //呼叫render涵式 渲染網頁
        render();
        //清空欄位
        inputHeight.value = '';
        inputWeight.value = '';
    }
}

//渲染網頁更新
function render(){
    let str = '';
    let total = 0;
    let average = 0;

    if(personalBmiData.length == 0){
        //不跑personalBmiData陣列
    }else{
        //將陣列資料反轉，目的是要將最後加入的資料顯示在上面
        personalBmiData.reverse();
        personalBmiData.forEach(function(item){
            str += `<li class="list-card">
                        <h3 class= "${BmiInterval[item.Status].class}">${BmiInterval[item.Status].nameStatus}</h3>
                            <p>
                                BMI ${item.Bmi}<br>
                                height ${item.Height}<br>
                                weight ${item.Weight}
                            </p>
                    </li>`;
            
            //BMI Total計算
            total += item.Bmi;
        })
        //BMI平均值 = BMI Total/陣列長度(幾筆資料)
        average = (total/personalBmiData.length).toFixed(2);
        //陣列處理完後將陣列轉回原本排序
        personalBmiData.reverse();
    }

    list.innerHTML = str;
    showAvg.textContent = '目前總共 ' + personalBmiData.length + ' 筆記錄，BMI平均值為 ' + average;
}

//清除網頁畫面BMI資料
function clrBMI(){
    if(personalBmiData.length == 0){
        //如果空的什麼都不做
    }else{
        personalBmiData.splice(0,personalBmiData.length);
        //呼叫render涵式 更新網頁
        render();
    }
}

//按鈕監聽
calcuBtn.addEventListener('click',calculateBMI,false);
clrBtn.addEventListener('click',clrBMI,false);