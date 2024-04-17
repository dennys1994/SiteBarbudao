// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// isotope js
$(window).on('load', function () {
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
            columnWidth: ".all"
        }
    })
});

// nice select
$(document).ready(function () {
    $('select').niceSelect();
});

/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }

});

// Adicione um evento de clique aos ícones SVG com a classe "add-to-cart"
var addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link (redirecionamento)

        // Obtenha os detalhes do produto correspondente ao ícone SVG clicado
        var productName = button.getAttribute("data-product");
        var productPrice = button.closest(".box").querySelector("h6").textContent.trim(); // Obtenha o preço do produto corretamente

        // Adicione os detalhes do produto ao carrinho (exemplo: apenas alerta)
        adicionarProdutoAoCarrinho(productName, productPrice);
    });
});

// Variável para armazenar o total
var totalCarrinho = 0;

// Função para adicionar o produto ao carrinho
function adicionarProdutoAoCarrinho(nomeProduto, precoProduto) {
    // Adicione o preço do produto ao total
    totalCarrinho += parseFloat(precoProduto.replace("R$", "").replace(",", ".")); // Converta o preço para um número e adicione ao total

    // Atualize a exibição do total do carrinho
    atualizarTotalCarrinho();

    // Exiba a caixa flutuante se o total for maior que zero
    if (totalCarrinho > 0) {
        document.getElementById("caixa-flutuante").style.display = "block";
    }

    // Adicione o item à lista do carrinho
    adicionarItemAoCarrinho(nomeProduto, precoProduto);

    // Exiba uma mensagem no console para confirmar que o produto foi adicionado ao carrinho
    console.log("Produto adicionado ao carrinho:\nNome: " + nomeProduto + "\nPreço: " + precoProduto);
}

// Função para adicionar o item à lista do carrinho
function adicionarItemAoCarrinho(nomeProduto, precoProduto) {
    // Selecione a lista do carrinho
    var listaCarrinho = document.getElementById("lista-carrinho");

    // Crie um novo item de lista
    var listItem = document.createElement("li");
    listItem.className = "item-carrinho";

    // Conteúdo do item de lista (nome do produto, preço e botão de remover)
    listItem.innerHTML = `
        <span>${nomeProduto}</span>
        <span>${precoProduto}</span>
        <span class="btn-remover" onclick="removerItemDoCarrinho(this)">X</span>
    `;

    // Adicione o item de lista à lista do carrinho
    listaCarrinho.appendChild(listItem);
}

// Função para remover o item do carrinho quando o botão "X" é clicado
function removerItemDoCarrinho(botaoRemover) {
    // Selecione o elemento pai do botão (o item de lista)
    var itemCarrinho = botaoRemover.parentElement;

    // Obtenha o preço do item a ser removido
    var precoItem = itemCarrinho.querySelector("span:nth-child(2)").textContent;

    // Remova o item do DOM
    itemCarrinho.remove();

    // Subtraia o preço do item do total do carrinho
    totalCarrinho -= parseFloat(precoItem.replace("R$", "").replace(",", "."));

    // Atualize a exibição do total do carrinho
    atualizarTotalCarrinho();

    // Oculte a caixa flutuante se o total for zero
    if (totalCarrinho === 0) {
        document.getElementById("caixa-flutuante").style.display = "none";
    }
}

// Função para atualizar a exibição do total do carrinho
function atualizarTotalCarrinho() {
    // Selecione o elemento onde o total será exibido
    var totalElement = document.getElementById("total-carrinho");

    // Atualize o texto do elemento com o novo total formatado como moeda
    totalElement.textContent = "Total: R$" + totalCarrinho.toFixed(2).replace(".", ",");
}

