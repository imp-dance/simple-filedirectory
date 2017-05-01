$.ajax($(".newlink").attr("href"), {
  statusCode: {
    404: function() {
      $(".newlink").hide();
    },
    200: function() {
      console.log("New version available at -new");
    }
  }
});
function previewHTML(){
  document.getElementById('mamamama').innerHTML = document.getElementById('dastext').value;
}