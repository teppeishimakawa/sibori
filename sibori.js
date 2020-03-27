




for(i=0;i<document.querySelectorAll(".search-box").length;i++)
{
document.querySelectorAll(".search-box")[i].onchange=function(){search_filter();}
};


/**
 * リストの絞り込みを行う
 */
function search_filter()
{
   // 非表示状態を解除
   for(i=0;i<document.querySelectorAll(".list_item").length;i++)
   {
   document.querySelectorAll(".list_item")[i].classList.remove("is_hide");
   }

/*
    for (var i = 0; i < $(searchBox).length; i++) {
        var name = $(searchBox).eq(i).find('input').attr('name');
*/

        // 選択されている項目を取得
        var searchData1 = get_selected_input_items1();
        console.log(searchData1);

        var searchData2 = get_selected_input_items2();
        console.log(searchData2);

        var searchData3 = get_selected_input_items3();
        console.log(searchData3);


        // 選択されている項目がない、またはALL選択の場合はcate1のチェック行わず
        if(searchData1.length == 0 || searchData1[0] === '') {searchData1.length=0;}


        // listを配列化
        for (var j = 0; j < document.getElementsByClassName("list_item").length; j++)
        {
            var itemData = document.getElementsByClassName("list_item")[j].dataset;
            //data属性取得
            // 絞り込み対象かどうかを調べる


         if(searchData1.length >0)
          {
          //重要！itemData変数を他の変数内で使うため引数に
          catechk(itemData,searchData1,j);
          }

          if(searchData2.length > 0)
          {
          //重要！itemData変数を他の変数内で使うため引数に
          tagchk(itemData,searchData2,j);
          }


        }
}


//重要！上記関数のitemData,searchData1,j変数を下位の変数内で使うため引数に
function catechk(itemData,searchData1,j)
{　
     var listMeta_cate;
     listMeta_cate=(itemData.category).split(",");
     console.log(listMeta_cate);

     var check=array_match_check(listMeta_cate, searchData1);
     if(!check)
     {
     document.querySelectorAll(".list_item")[j].classList.add("is_hide");
     }
     listMeta_cate=[];
}

function tagchk(itemData,searchData2,j)
{
     var listMeta_tag;
     listMeta_tag=(itemData.tag).split(",");
     console.log(listMeta_tag);
     var check=array_match_check(listMeta_tag, searchData2);
     if(!check)
     {
     document.querySelectorAll(".list_item")[j].classList.add("is_hide");
     }
     listMeta_tag=[];
}

/*
function andorchk()
{
     var listMeta_andor=[];
     listMeta_andor.push((itemData.andor).split(","));
     array_match_check(listMeta_andor, searchData);
     listMeta_andor=[];
}
*/

/**
 * inputで選択されている値の一覧を取得する
 * @param  {String} name 対象にするinputのname属性の値
 * @return {Array}       選択されているinputのvalue属性の値
 */



function get_selected_input_items1()
{
    var searchData = [];

for(i=0;i<document.form1.category.length;i++)
    {if (document.form1.category[i].checked){searchData.push(document.form1.category[i].value);}}　　
    return searchData;
}


function get_selected_input_items2()
{
    var searchData = [];

for(i=0;i<document.form1.tag.length;i++)
    {if (document.form1.tag[i].checked){searchData.push(document.form1.tag[i].value);}}　
    return searchData;
}

function get_selected_input_items3()
{
    var searchData = [];

for(i=0;i<document.form1.andor.length;i++)
    {if (document.form1.andor[i].checked){searchData.push(document.form1.andor[i].value);}}　
    return searchData;
}
/**
 * リスト内のアイテムに設定している値の一覧を取得する
 * @param  {Object} target 対象にするアイテムのjQueryオブジェクト
 * @param  {String} data   対象にするアイテムのdata属性の名前
 * @return {Array}         対象にするアイテムのdata属性の値
 */



/*
function get_setting_values_in_item(target, data) {
    var itemData = target.data(data);
    if(!Array.isArray(itemData)) {
        itemData = [itemData];
    }
    return itemData;
}

*/

/**
 * 2つの配列内で一致する文字列があるかどうかを調べる
 * @param  {Array} arr1 調べる配列1
 * @param  {Array} arr2 調べる配列2
 * @return {Boolean}    一致する値があるかどうか
 */

//arr1:各list内のキーワード配列,arr2:ラジオボタン押したキーワード
function array_match_check(arr1, arr2)
{
    // 絞り込み対象かどうかを調べる。trueはヒット。つまりディスプレイする
    var arrCheck = false;
    for (var i = 0; i < arr1.length; i++)
    {
      if(arr2.indexOf(arr1[i]) >= 0)
      {
            arrCheck = true;
            break;
      }
    }
    return arrCheck;
}
