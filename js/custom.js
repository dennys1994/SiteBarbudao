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
addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
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

window.onload = function () {
    if (totalCarrinho === 0) {
        document.getElementById("caixa-flutuante").style.display = "none";
    }
};

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

// Objeto para armazenar os itens no carrinho
const carrinho = {
    itensCarrinho: []
  };

// Função para adicionar o item à lista do carrinho
function adicionarItemAoCarrinho(nomeProduto, precoProduto) {
    // Exiba a caixa flutuante se o total for maior que zero
    if (totalCarrinho > 0) {
        document.getElementById("caixa-flutuante").style.display = "block";
    }
    // Verifica se o produto já está no carrinho
    if (carrinho[nomeProduto]) {
        // Se sim, incrementa a quantidade
        carrinho[nomeProduto].quantidade++;
    } else {
        // Se não, cria um novo objeto para o produto
        carrinho[nomeProduto] = {
            preco: precoProduto,
            quantidade: 1
        };
    }

    // Atualiza a exibição do carrinho
    atualizarCarrinho();
}

// Função para remover o item do carrinho quando o botão "X" é clicado
function removerItemDoCarrinho(botaoRemover) {
    // Selecione o elemento pai do botão (o item de lista)
    var itemCarrinho = botaoRemover.parentElement;

    // Obtenha o nome do produto a ser removido
    var nomeProduto = itemCarrinho.querySelector("span:nth-child(2)").textContent;

    // Obtenha o preço do produto
    var precoProduto = carrinho[nomeProduto].preco;

    // Reduza a quantidade do produto no carrinho
    carrinho[nomeProduto].quantidade--;

    // Se a quantidade do produto for 0, remova-o do carrinho
    if (carrinho[nomeProduto].quantidade === 0) {
        delete carrinho[nomeProduto];
    }

    // Atualize a exibição do carrinho
    atualizarCarrinho();

    // Subtraia o preço do item do total do carrinho
    totalCarrinho -= parseFloat(precoProduto.replace("R$", "").replace(",", "."));

    // Atualize a exibição do total do carrinho
    atualizarTotalCarrinho();

    // Remova o item do DOM
    itemCarrinho.remove();

    // Oculte a caixa flutuante se o total for zero
    if (totalCarrinho === 0) {
        document.getElementById("caixa-flutuante").style.display = "none";
    }
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    // Selecione a lista do carrinho
    var listaCarrinho = document.getElementById("lista-carrinho");

    // Limpe o conteúdo atual do carrinho
    listaCarrinho.innerHTML = "";

    // Percorra cada item no carrinho
    for (const nomeProduto in carrinho) {
        if (carrinho.hasOwnProperty(nomeProduto) && nomeProduto !== 'itensCarrinho') {
            // Crie um novo item de lista apenas para produtos reais
            var listItem = document.createElement("li");
            listItem.className = "item-carrinho";

            // Obtenha o preço e a quantidade do produto
            var precoProduto = carrinho[nomeProduto].preco;
            var quantidadeProduto = carrinho[nomeProduto].quantidade;

            // Conteúdo do item de lista (nome do produto, quantidade, preço e botão de remover)
            listItem.innerHTML = `
                <span class="quantidade">${quantidadeProduto} und</span>
                <span>${nomeProduto}</span>
                <span class="preco">${precoProduto}</span>
                <span class="btn-remover btn-remover-x" onclick="removerItemDoCarrinho(this)">X</span>
            `;

            // Adicione o item de lista à lista do carrinho
            listaCarrinho.appendChild(listItem);
        }
    }
}



// Função para atualizar a exibição do total do carrinho
function atualizarTotalCarrinho() {
    // Selecione o elemento onde o total será exibido
    var totalElement = document.getElementById("total-carrinho");

    // Atualize o texto do elemento com o novo total formatado como moeda
    totalElement.textContent = "Total: R$" + totalCarrinho.toFixed(2).replace(".", ",");
}

// Selecione a aba de arrastar
var abaArrastar = document.getElementById("aba-arrastar");

// Adicione um evento de mouse para detectar o início do arrasto
abaArrastar.addEventListener("mousedown", iniciarArrasto);

// Função para iniciar o arrasto
function iniciarArrasto(e) {
    // Obtenha a posição inicial do mouse
    var offsetX = e.clientX;
    var offsetY = e.clientY;

    // Obtenha a posição inicial da caixa flutuante
    var initialX = document.getElementById("caixa-flutuante").offsetLeft;
    var initialY = document.getElementById("caixa-flutuante").offsetTop;

    // Adicione um evento de mouse para detectar o movimento do mouse
    document.addEventListener("mousemove", moverCaixaFlutuante);

    // Adicione um evento de mouse para detectar o término do arrasto
    document.addEventListener("mouseup", terminarArrasto);

    // Função para mover a caixa flutuante com o mouse
    function moverCaixaFlutuante(e) {
        // Calcule a posição da caixa flutuante com base no movimento do mouse
        var newX = initialX + e.clientX - offsetX;
        var newY = initialY + e.clientY - offsetY;

        // Defina a nova posição da caixa flutuante
        document.getElementById("caixa-flutuante").style.left = newX + "px";
        document.getElementById("caixa-flutuante").style.top = newY + "px";
    }

    // Função para finalizar o arrasto
    function terminarArrasto() {
        // Remova os eventos de mouse usados para o arrasto
        document.removeEventListener("mousemove", moverCaixaFlutuante);
        document.removeEventListener("mouseup", terminarArrasto);
    }
}

function finalizarCompra() {
    var pedido = {
        tipoEntrega: document.querySelector('input[name="opcaoEntrega"]:checked').value,
        endereco: {
            rua: document.getElementById("rua").value,
            numero: document.getElementById("numero").value,
            bairro: document.getElementById("bairro").value,
            complemento: document.getElementById("complemento").value
        },
        itensCarrinho: [],
        total: document.getElementById("total-carrinho").textContent,
        observacoes: document.getElementById("observacoes").value
    };

    var listaCarrinho = document.querySelectorAll("#lista-carrinho .item-carrinho");
    listaCarrinho.forEach(function (item) {
        var quantidade = item.querySelector("span:nth-child(1)").textContent;
        var nomeProduto = item.querySelector("span:nth-child(2)").textContent;
        var precoProduto = item.querySelector("span:nth-child(3)").textContent;
        pedido.itensCarrinho.push({ quantidade, nomeProduto, precoProduto });
    });

    // Enviar o pedido para o backend
    enviarPedidoParaBackend(pedido);

    limparCarrinho();

    esconderModal();

    mostrarModalPedidoSucesso();

}

// Função para limpar o carrinho
function limparCarrinho() {
    // Limpa o carrinho
    for (const nomeProduto in carrinho) {
        delete carrinho[nomeProduto];
    }

    // Atualiza a exibição do carrinho
    atualizarCarrinho();

    // Reseta o total do carrinho para zero
    totalCarrinho = 0;

    // Atualiza a exibição do total do carrinho
    atualizarTotalCarrinho();

    // Oculta a caixa flutuante
    document.getElementById("caixa-flutuante").style.display = "none";
}

function enviarPedidoParaBackend(pedido) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/enviar-pedido", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Pedido enviado com sucesso!");
        }
    };
    xhr.send(JSON.stringify(pedido));
}





// Função para obter o pedido completo
function obterPedidoCompleto() {
    var pedido = "";
    var listaCarrinho = document.querySelectorAll("#lista-carrinho .item-carrinho");
    listaCarrinho.forEach(function (item) {
        var quantidade = item.querySelector("span:nth-child(1)").textContent;
        var nomeProduto = item.querySelector("span:nth-child(2)").textContent;
        var precoProduto = item.querySelector("span:nth-child(3)").textContent;

        pedido += quantidade + " " + nomeProduto + " - " + precoProduto + "\n";
    });

    // Adiciona o total do carrinho ao pedido completo
    var totalCarrinho = document.getElementById("total-carrinho").textContent;
    pedido += "\n\n" + totalCarrinho + "\n";

    return pedido;
}

// Função para finalizar o pedido
function finalizarPedido() {
    var observacoes = document.getElementById("observacoes").value;
    // Adicione a lógica para enviar o pedido com as observações pelo WhatsApp ou outro meio desejado
}

// Adicione um evento de clique ao botão "Finalizar Compra"
document.querySelector("button").addEventListener("click", function () {
    mostrarCaixaFlutuante();
});

// Adicione um evento de input à caixa de texto de observações para ocultar o texto de orientações
document.getElementById("observacoes").addEventListener("input", function () {
    var textoOrientacoes = document.getElementById("texto-orientacoes");
    if (this.value.trim() !== "") {
        textoOrientacoes.style.display = "none";
    } else {
        textoOrientacoes.style.display = "block";
    }
});

// Função para mostrar o modal
function mostrarModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";

    // Atualiza o pedido completo no modal
    var pedidoCompleto = document.getElementById("pedido-completo");
    pedidoCompleto.textContent = obterPedidoCompleto();
} 
  // Função para esconder o modal
  function esconderModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  }

// Adicione um evento de clique nos radio buttons
document.getElementById("retirada").addEventListener("click", function () {
    // Oculta o campo de endereço
    document.getElementById("enderecoEntrega").style.display = "none";
});

document.getElementById("entrega").addEventListener("click", function () {
    // Exibe o campo de endereço
    document.getElementById("enderecoEntrega").style.display = "block";
});

// Função para mostrar o modal de pedido feito com sucesso
function mostrarModalPedidoSucesso() {
    var modalPedidoSucesso = document.getElementById("modalPedidoSucesso");
    modalPedidoSucesso.style.display = "block";
  }
  
  // Função para fechar o modal de pedido feito com sucesso
  function fecharModalPedidoSucesso() {
    var modalPedidoSucesso = document.getElementById("modalPedidoSucesso");
    modalPedidoSucesso.style.display = "none";
  }
  