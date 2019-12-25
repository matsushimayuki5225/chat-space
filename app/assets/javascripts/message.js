$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chat-home-chat-main__message" data-message-id=${message.id}>  
          <div class="chat-home-chat-main__message__title">
            <div class="chat-home-chat-main__message__title__name">
              ${message.user_name}
            </div>
            <div class="chat-home-chat-main__message__title__day">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="chat-home-chat-main__message" data-message-id=${message.id}>  
          <div class="chat-home-chat-main__message__title">
            <div class="chat-home-chat-main__message__title__name">
              ${message.user_name}
            </div>
            <div class="chat-home-chat-main__message__title__day">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
$('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
       console.log(data);
       var html = buildHTML(data);
       $('.chat-home-chat-main').append(html);
       $('form')[0].reset();
       $('.chat-home-chat-main').animate({ scrollTop: $('.chat-home-chat-main')[0].scrollHeight});
       $(".chat-home-chat-bottom__box__bottom").prop("disabled", false); 
      })
    .fail(function() {
        alert('メッセージを送信できません');
      })
    .always(function() {
      $(".chat-home-chat-bottom__box__bottom").prop("disabled", false); 
    });
  })
});