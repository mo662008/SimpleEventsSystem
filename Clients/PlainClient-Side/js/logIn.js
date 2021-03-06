(function ($) {
  "use strict";


  /*==================================================================
  [ Focus Contact2 ]*/
  $('.input100').each(function () {
    $(this).on('blur', function () {
      if ($(this).val().trim() != "") {
        $(this).addClass('has-val');
      }
      else {
        $(this).removeClass('has-val');
      }
    })
  })


  /*==================================================================
  [ Validate ]*/
  var input = $('.validate-input .input100');

  $('.validate-form').on('submit', function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }
    return check;
  });
  $('.validate-form .input100').each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });
  function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
      if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        return false;
      }
    }
    else {
      if ($(input).val().trim() == '') {
        return false;
      }
    }
  }
  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
  }
  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
  }
})(jQuery);

async function logIn() {
  let reqResult;
  let mail = document.getElementById('mailFld').value;
  let psw = document.getElementById('pswFld').value;
  let data = {
    email: mail,
    password: psw
  }
  let url = '/login';
  reqResult = await httpPOST(data, url);
  if (!reqResult.ok) {
    reqResult.json()
      .then(res => alert(res.message));
  }
  reqResult = await reqResult.json();
  saveJWTToLocalStorage(reqResult.token);
  if (reqResult.role == 'admin') {
    location.replace('../Pages/Dashboard.html');
  } else {
    location.replace('../Pages/Index.html');
  }
}

function redirectToSignUpPage() {
  location.replace('../Pages/SignUp.html');
}