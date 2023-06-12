function loadMain(typeUser){
  let x = typeUser;
  let center = $('#center').val();
  let area = $('#area').val();
  let dateF = $('#dateF').val();
  let dateE = $('#dateE').val();
  if(x == 1){
    $.post('./view/viewTotalCarCuc.php',{center:center, area:area, dateF:dateF, dateE:dateE
    }, function(data) {
      $("#show").html(data);
    });
  }else{
    $.post('./view/viewTotalCar.php',{center:center, area:area, dateF:dateF, dateE:dateE
    }, function(data) {
      $("#show").html(data);
    });
  }
}

function loadCarWar(){
  let center = $('#center').val();
  let area = $('#area').val();
  let overDay = $('#overDay').val();
  $.post('./view/viewCarWarning.php',{center:center, area:area, overDay:overDay
  }, function(data) {
    $("#show").html(data);
  });
}

function loadUser(){
  let center = $('#center').val();
  let area = $('#area').val();
  let status = $('#status').val();
  $.post('./view/viewUserSys.php',{center:center, area:area, status:status
  }, function(data) {
    $("#show").html(data);
  });
}

function toggleArr(array,item){
  var index = array.indexOf(item);
   if (index >= 0) {
        array.splice(index, 1);
    } else {
        array.unshift(item);
    }
}

function removeItemArray(e,arr){
  let index = arr.indexOf(e)
  if(index !== -1){
    arr.splice(index,1)
  }
  return arr
}

function logout(){
 window.open("./login.php","_self");
}
function changepass(){
 window.open("./changePass.php","_self");
}
