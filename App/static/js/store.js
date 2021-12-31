function hide(tag) {
  $(tag).css("opacity", "0");
  setTimeout(function () {
    $(tag).css("display", "none");
  }, 200);
}
function show(tag) {
  $(tag).css("opacity", "1");
  setTimeout(function () {
    $(tag).css("display", "block");
  }, 200);
}

function showUsername() {
  if (COIN >= 1000) {
    $('#username').prop("onclick", null).off("click");
    $('.usernameInput').css("display", "flex");
  }
}
function changeUsername() {
  $.ajax({
    type: 'POST',
    url: '/store/',
    data: {
      'code': 'username',
      'newUsername': $('#newUsername').val(),
      'csrfmiddlewaretoken': CSRF_TOKEN,
    },
    success: function () {
      console.log("success");
    },
    error: function () {
      console.log("error");
    }
  })
};
function checkDarkmode() {
  if (COIN >= 500) {
    $.ajax({
      type: 'POST',
      url: '/store/',
      data: {
        'code': 'darkMode',
        'csrfmiddlewaretoken': CSRF_TOKEN,
      },
      success: function () {
        console.log("success");
      },
      error: function () {
        console.log("error");
      }
    })
  }
};

function changeAvatar(value = 0, key = true) {
  tag = '.avatar'
  if (!key) {
    if (COIN >= 200) {
      show(tag);
    }
    else {
      alert("You don't have enough coins!")
    }
  }
  else {
    $.ajax({
      type: 'POST',
      url: '/store/',
      data: {
        'avatarCode': value,
        'code': 'avatar',
        'csrfmiddlewaretoken': CSRF_TOKEN,
      },
      success: function () {
        console.log("success");
      },
      error: function () {
        console.log("error");
      }
    });
    hide(tag);
  }
};

function doubleCoin(price) {
  if (COIN >= price) {
    $.ajax({
      type: 'POST',
      url: '/store/',
      data: {
        'code': 'doubleCoin',
        'mode': price,
        'csrfmiddlewaretoken': CSRF_TOKEN,
      },
      success: function () {
        console.log("success");
      },
      error: function () {
        console.log("error");
      }
    })
  }
}