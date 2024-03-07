$(document).ready(() => {
  $("#cadastrarVenda").on("click", () => {
    $.get("cadastrarVenda.html", (data) => {
      $("#homeView").html(data);
    });
  });

  $("#homeLink").on("click", () => {
    location.reload(); //Implementar outra funcionalidade sem precisar recarregar a página
  });
});
