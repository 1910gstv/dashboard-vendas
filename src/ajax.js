$(document).ready(() => {
    $("#cadastrarVenda").on("click", () => {
  
  
      $.get("cadastrarVenda.html", (data) => {
          $("#homeView").html(data)
      })
    })
  });