let btn = document.getElementById('btn_more')

btn.title='Добавили тайтл'

console.log(btn.title)

function checkForm(el) {
  var name= document.getElementById('name').value;
  let comment=document.getElementById('comment').value;
  let phone = document.getElementById('phone').value
  console.log(name)
  console.log(phone)
  console.log(comment)
}
