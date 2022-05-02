window.addEventListener('load', function () {
  // 手机号码正则表达式
  const regtel = /^1[3|4|5|7|8]\d{9}$/
  const regdx = /^[0-9]{6}$/
  const pass = /^[a-zA-Z0-9-_]{6,16}$/
  const inputs = document.querySelectorAll('form input[type]')
  const spans = document.querySelectorAll('form ul li span')
  console.log(inputs)
  document.querySelector('form').addEventListener('submit', (e) => {
    e.stopPropagation()
  })
  function fn(i, reg, tel) {
    inputs[i].addEventListener('blur', function () {
      if (reg.test(inputs[i].value)) {
        // inputs[0].nextElementSibling.className = 'success'
        inputs[i].nextElementSibling.innerHTML = `<i class="success"></i>${tel}格式正确`
      } else {
        // inputs[0].nextElementSibling.className = 'error'
        inputs[i].nextElementSibling.innerHTML = `<i class="error_icon"></i>${tel}格式不正确，请重新输入`
      }
    })
  }
  fn(0, regtel, '手机号码')
  fn(1, regdx, '验证码')
  fn(2, pass, '密码')
  //  确认密码模块 
  inputs[3].addEventListener('blur', function () {
    if (!pass.test(inputs[2].value)) {
      this.nextElementSibling.innerHTML = `<i class="error_icon"></i>密码设置错误，请重新输入`
    } else {
      if (!inputs[2].value || inputs[3].value !== inputs[2].value) {
        this.nextElementSibling.innerHTML = `<i class="error_icon"></i>密码不一致，请重新输入`
      } else {
        this.nextElementSibling.innerHTML = `<i class="success"></i>密码一致`
      }
    }

  })


})
