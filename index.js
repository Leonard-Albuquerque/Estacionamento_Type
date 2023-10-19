(function () {
    var _a;
    let nome = "";
    let placa = "";
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function adicionar(veiculo, salvo) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                <button class="delete" data-placa="${veiculo.placa}"> X </button>
                </td>
                `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salvo)
                salvar([...ler(), veiculo]);
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function remover(placa) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veiculo ${nome}permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            render();
        }
        function render() {
            $("#patio").innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => adicionar(veiculo));
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b, _c, _d;
        nome = (_b = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
        placa = (_d = (_c = $("#placa")) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : "";
        if (!nome || !placa) {
            alert("Campos nome e placa são obrigatórios.");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
