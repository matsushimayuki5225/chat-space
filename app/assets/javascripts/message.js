$(function() {
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="chat-home-chat-main__message" "data-message-id="${message.id}" >
        <div class="chat-home-chat-main__message__title">
          <div class="chat-home-chat-main__message__title__name">
            message.user_name 
          </div> 
          <div class="chat-home-chat-main__message__title__day"> 
            message.created_at 
          </div>
        </div> 
        <div class="lower-message"> 
          <p class="lower-message__content">
            message.content 
          </p>
          <img src="${message.image} " class="lower-message__image"> 
        </div> 
      </div>`
    } else if (message.content) {
      var html = `<div class="chat-home-chat-main__message" data-message-id="${message.id}"> 
        <div class="chat-home-chat-main__message__title"> 
          <div class="chat-homr-chat-main__message__titie__name">
            message.user_name 
          </div> 
          <div class="chat-home-chat-main__message__title__day">
            message.created_at 
          </div> 
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            message.content 
          </p> 
        </div> 
      </div>`
    } else if (message.image) {
      var html = `<div class="chat-home-chat-main__message" data-message-id="${message.id}"> 
        <div class="chat-home-chat-main__message__title"> 
          <div class="chat-home-chat-main__message__title__name">
            message.user_name 
          </div> 
          <div class="chat-home-chat-main__message__title__day">
            message.created_at 
          </div> 
        </div>
        <div class="lower-message">
          <img src="${message.image} " class="lower-message__image" >
        </div>
      </div>`
    };
    return html;
  };

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
  }); 

    var reloadMessages = function() {
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message){
        insertHTML += buildHTML(message)
        });
        $('.chat-home-chat-main').append(insertHTML);
        $('.chat-home-chat-main').animate({ scrollTop: $('.chat-home-chat-main')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
      })
      .fail(function() {
        alert('エラーが発生しました');
      });
    };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  };
});